"use client";

import { useEffect, useState, type FormEvent } from "react";
import { FilePlus2, Pencil, RefreshCw, Save, Trash2 } from "lucide-react";
import { classLevels, resourceTypes, subjects } from "@/lib/config/content";
import { createClient } from "@/lib/supabase/client";
import styles from "./resource-manager.module.css";

type ResourceStatus = "draft" | "published";

type TeacherResource = {
  id: string;
  class_level: "9" | "10";
  subject: string;
  chapter: string;
  title: string;
  resource_type: string;
  file_path: string;
  file_name: string;
  status: ResourceStatus;
  created_at: string;
  updated_at: string;
};

type Feedback = { kind: "success" | "error"; message: string };
type EditableResourceFields = Pick<TeacherResource, "class_level" | "subject" | "chapter" | "title" | "resource_type" | "status">;

const maximumFileSize = 50 * 1024 * 1024;

async function removeUploadedFile(supabase: ReturnType<typeof createClient>, filePath: string) {
  try {
    const { error } = await supabase.storage.from("resources").remove([filePath]);
    return !error;
  } catch {
    return false;
  }
}

function formatCreatedAt(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function getEditableResourceFields(formData: FormData): EditableResourceFields | null {
  const classOption = String(formData.get("classLevel") ?? "");
  const subject = subjects.find((option) => option === String(formData.get("subject") ?? ""));
  const chapter = String(formData.get("chapter") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const resourceType = resourceTypes.find((option) => option === String(formData.get("resourceType") ?? ""));
  const status = String(formData.get("status") ?? "");
  const classLevel = classLevels.find((level) => level.replace("Class ", "") === classOption);

  if (!classLevel || !subject || !chapter || chapter.length > 200 || !title || title.length > 200 || !resourceType || (status !== "draft" && status !== "published")) {
    return null;
  }

  return {
    class_level: classLevel.replace("Class ", "") as TeacherResource["class_level"],
    subject,
    chapter,
    title,
    resource_type: resourceType,
    status,
  };
}

export default function ResourceManager() {
  const [resources, setResources] = useState<TeacherResource[]>([]);
  const [isLoadingResources, setIsLoadingResources] = useState(true);
  const [resourceLoadError, setResourceLoadError] = useState("");
  const [resourceRefreshKey, setResourceRefreshKey] = useState(0);
  const [editingResource, setEditingResource] = useState<TeacherResource | null>(null);
  const [isCreatingResource, setIsCreatingResource] = useState(false);
  const [isUpdatingResource, setIsUpdatingResource] = useState(false);
  const [isDeletingResource, setIsDeletingResource] = useState(false);
  const [formFeedback, setFormFeedback] = useState<Feedback | null>(null);
  const [listFeedback, setListFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    let isActive = true;

    async function loadResources() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("resources")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (isActive) setResources((data ?? []) as TeacherResource[]);
      } catch {
        if (isActive) {
          setResourceLoadError("Resources could not be loaded. Your teacher session may have expired; try again or sign in again.");
        }
      } finally {
        if (isActive) setIsLoadingResources(false);
      }
    }

    void loadResources();
    return () => {
      isActive = false;
    };
  }, [resourceRefreshKey]);

  function refreshResources() {
    setIsLoadingResources(true);
    setResourceLoadError("");
    setResourceRefreshKey((currentKey) => currentKey + 1);
  }

  async function handleResourceSubmit(event: FormEvent<HTMLFormElement>) {
    if (editingResource) {
      await handleUpdateResource(event, editingResource);
      return;
    }

    await handleCreateResource(event);
  }

  async function handleCreateResource(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const metadata = getEditableResourceFields(formData);
    const file = formData.get("file");

    setFormFeedback(null);

    if (!metadata) {
      setFormFeedback({ kind: "error", message: "Complete all resource details before saving." });
      return;
    }

    if (!(file instanceof File) || file.size === 0) {
      setFormFeedback({ kind: "error", message: "Choose a PDF file to upload." });
      return;
    }

    if (file.size > maximumFileSize) {
      setFormFeedback({ kind: "error", message: "The PDF must be no larger than 50 MB." });
      return;
    }

    if (
      !file.name.toLowerCase().endsWith(".pdf") ||
      (file.type !== "" && file.type !== "application/pdf")
    ) {
      setFormFeedback({ kind: "error", message: "Choose a PDF file only." });
      return;
    }

    let hasPdfSignature = false;
    try {
      hasPdfSignature = (await file.slice(0, 5).text()) === "%PDF-";
    } catch {
      setFormFeedback({ kind: "error", message: "The selected PDF could not be read." });
      return;
    }

    if (!hasPdfSignature) {
      setFormFeedback({ kind: "error", message: "The selected file is not a valid PDF." });
      return;
    }

    setIsCreatingResource(true);
    let uploadedFilePath: string | null = null;

    try {
      const supabase = createClient();
      const filePath = `${crypto.randomUUID()}.pdf`;
      const { error: uploadError } = await supabase.storage
        .from("resources")
        .upload(filePath, file, { contentType: "application/pdf", upsert: false });

      if (uploadError) {
        setFormFeedback({ kind: "error", message: "The PDF could not be uploaded. Check your session and try again." });
        return;
      }

      uploadedFilePath = filePath;
      const { error: insertError } = await supabase.from("resources").insert({
        ...metadata,
        file_path: filePath,
        file_name: file.name,
      });

      if (insertError) {
        const cleanupSucceeded = await removeUploadedFile(supabase, filePath);
        if (cleanupSucceeded) uploadedFilePath = null;
        setFormFeedback({
          kind: "error",
          message: cleanupSucceeded
            ? "Resource details could not be saved. The uploaded PDF was removed."
            : "Resource details could not be saved, and the uploaded PDF could not be removed. Contact support before retrying.",
        });
        return;
      }

      uploadedFilePath = null;
      form.reset();
      setFormFeedback({ kind: "success", message: "Resource saved successfully." });
      refreshResources();
    } catch {
      let cleanupSucceeded = true;
      if (uploadedFilePath) {
        cleanupSucceeded = await removeUploadedFile(createClient(), uploadedFilePath);
      }
      setFormFeedback({
        kind: "error",
        message: cleanupSucceeded
          ? "The resource could not be saved. Check your session and try again."
          : "The resource could not be saved, and its uploaded PDF could not be removed. Contact support before retrying.",
      });
    } finally {
      setIsCreatingResource(false);
    }
  }

  async function handleUpdateResource(event: FormEvent<HTMLFormElement>, resource: TeacherResource) {
    event.preventDefault();
    const metadata = getEditableResourceFields(new FormData(event.currentTarget));
    setFormFeedback(null);

    if (!metadata) {
      setFormFeedback({ kind: "error", message: "Complete all resource details before saving." });
      return;
    }

    setIsUpdatingResource(true);
    const updatedAt = new Date().toISOString();

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("resources")
        .update({ ...metadata, updated_at: updatedAt })
        .eq("id", resource.id)
        .select("id");

      if (error || !data?.length) {
        setFormFeedback({ kind: "error", message: "Resource changes could not be saved. Check your session and try again." });
        return;
      }

      setResources((currentResources) => currentResources.map((currentResource) => (
        currentResource.id === resource.id
          ? { ...currentResource, ...metadata, updated_at: updatedAt }
          : currentResource
      )));
      setEditingResource(null);
      setFormFeedback({ kind: "success", message: "Resource updated successfully." });
    } catch {
      setFormFeedback({ kind: "error", message: "Resource changes could not be saved. Check your session and try again." });
    } finally {
      setIsUpdatingResource(false);
    }
  }

  async function handleDeleteResource(resource: TeacherResource) {
    const confirmed = window.confirm(`Delete "${resource.title}" and its PDF? This cannot be undone.`);
    if (!confirmed) return;

    setIsDeletingResource(true);
    setListFeedback(null);

    try {
      const supabase = createClient();
      const { error: storageError } = await supabase.storage
        .from("resources")
        .remove([resource.file_path]);

      if (storageError) {
        setListFeedback({ kind: "error", message: "The PDF could not be deleted. The resource record was kept." });
        return;
      }

      const { data, error: deleteError } = await supabase
        .from("resources")
        .delete()
        .eq("id", resource.id)
        .select("id");

      if (deleteError || !data?.length) {
        setListFeedback({ kind: "error", message: "The PDF was deleted, but the resource record could not be deleted." });
        return;
      }

      setListFeedback({ kind: "success", message: "Resource deleted successfully." });
      refreshResources();
    } catch {
      setListFeedback({ kind: "error", message: "The resource could not be deleted. Check your session and try again." });
    } finally {
      setIsDeletingResource(false);
    }
  }

  return (
    <div className={styles.manager}>
      <section aria-labelledby="add-resource-title">
        <div className={styles.sectionHeading}>
          <div>
            <span className="section-kicker">Resource management</span>
            <h2 id="add-resource-title">{editingResource ? "Edit resource" : "Add a resource"}</h2>
          </div>
        </div>

        <form className={styles.formGrid} key={editingResource?.id ?? "create"} onSubmit={handleResourceSubmit}>
          <label className={`field ${styles.formField}`}>
            <span>Class</span>
            <select name="classLevel" defaultValue={editingResource?.class_level ?? ""} required>
              <option value="" disabled>Select class</option>
              {classLevels.map((level) => (
                <option key={level} value={level.replace("Class ", "")}>{level}</option>
              ))}
            </select>
          </label>
          <label className={`field ${styles.formField}`}>
            <span>Subject</span>
            <select name="subject" defaultValue={editingResource?.subject ?? ""} required>
              <option value="" disabled>Select subject</option>
              {subjects.map((subjectOption) => <option key={subjectOption}>{subjectOption}</option>)}
            </select>
          </label>
          <label className={`field ${styles.formField}`}>
            <span>Chapter</span>
            <input name="chapter" type="text" defaultValue={editingResource?.chapter ?? ""} required maxLength={200} />
          </label>
          <label className={`field ${styles.formField}`}>
            <span>Title</span>
            <input name="title" type="text" defaultValue={editingResource?.title ?? ""} required maxLength={200} />
          </label>
          <label className={`field ${styles.formField}`}>
            <span>Resource type</span>
            <select name="resourceType" defaultValue={editingResource?.resource_type ?? ""} required>
              <option value="" disabled>Select resource type</option>
              {resourceTypes.map((resourceTypeOption) => <option key={resourceTypeOption}>{resourceTypeOption}</option>)}
            </select>
          </label>
          <label className={`field ${styles.formField}`}>
            <span>Status</span>
            <select name="status" defaultValue={editingResource?.status ?? "draft"} required>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
          {!editingResource && <label className={`field ${styles.formField} ${styles.fileField}`}>
            <span>PDF (maximum 50 MB)</span>
            <input name="file" type="file" accept="application/pdf,.pdf" required />
          </label>}
          <div className={styles.submitField}>
            <button className="button" type="submit" disabled={isCreatingResource || isUpdatingResource}>
              {editingResource ? <Save size={16} /> : <FilePlus2 size={16} />}
              {isCreatingResource || isUpdatingResource ? "Saving..." : editingResource ? "Save changes" : "Save resource"}
            </button>
            {editingResource && <button className="button button-light" type="button" onClick={() => { setEditingResource(null); setFormFeedback(null); }} disabled={isUpdatingResource}>Cancel</button>}
          </div>
          {formFeedback && (
            <p className={formFeedback.kind === "error" ? "form-error" : styles.successMessage} role={formFeedback.kind === "error" ? "alert" : "status"}>
              {formFeedback.message}
            </p>
          )}
        </form>
      </section>

      <section className={styles.listSection} aria-labelledby="resource-list-title">
        <div className={styles.listHeading}>
          <div>
            <span className="section-kicker">Library</span>
            <h2 id="resource-list-title">Resources</h2>
          </div>
          <button className="button button-light" type="button" onClick={refreshResources} disabled={isLoadingResources}>
            <RefreshCw size={15} />
            {isLoadingResources ? "Loading..." : "Refresh"}
          </button>
        </div>

        {listFeedback && (
          <p className={listFeedback.kind === "error" ? "form-error" : styles.successMessage} role={listFeedback.kind === "error" ? "alert" : "status"}>
            {listFeedback.message}
          </p>
        )}

        {isLoadingResources ? (
          <p className={styles.stateMessage} role="status">Loading resources...</p>
        ) : resourceLoadError ? (
          <div className={styles.stateBlock}>
            <p className="form-error" role="alert">{resourceLoadError}</p>
            <button className="button button-light" type="button" onClick={refreshResources}>Try again</button>
          </div>
        ) : resources.length === 0 ? (
          <p className={styles.stateMessage}>No resources have been added yet.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <caption className="visually-hidden">Teacher resources, newest first</caption>
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Class</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Chapter</th>
                  <th scope="col">Type</th>
                  <th scope="col">Status</th>
                  <th scope="col">File name</th>
                  <th scope="col">Created</th>
                  <th scope="col"><span className="visually-hidden">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {resources.map((resource) => (
                  <tr key={resource.id}>
                    <th scope="row">{resource.title}</th>
                    <td>Class {resource.class_level}</td>
                    <td>{resource.subject}</td>
                    <td>{resource.chapter}</td>
                    <td>{resource.resource_type}</td>
                    <td><span className={`${styles.statusBadge} ${resource.status === "published" ? styles.published : styles.draft}`}>{resource.status}</span></td>
                    <td className={styles.fileName}>{resource.file_name}</td>
                    <td>{formatCreatedAt(resource.created_at)}</td>
                    <td>
                      <div className={styles.rowActions}>
                      <button
                        className={styles.editButton}
                        type="button"
                        onClick={() => { setEditingResource(resource); setFormFeedback(null); }}
                        disabled={isCreatingResource || isUpdatingResource || isDeletingResource || editingResource !== null}
                        aria-label={`Edit ${resource.title}`}
                        title="Edit resource"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className={styles.deleteButton}
                        type="button"
                        onClick={() => void handleDeleteResource(resource)}
                        disabled={isDeletingResource || isUpdatingResource || editingResource !== null}
                        aria-label={`Delete ${resource.title}`}
                        title="Delete resource"
                      >
                        <Trash2 size={16} />
                      </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}