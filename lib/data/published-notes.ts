import { classLevels, resourceTypes, subjects, type ResourceType, type Subject } from "@/lib/config/content";
import type { NoteResource } from "@/lib/data/public-content";
import { createClient } from "@/lib/supabase/server";

type PublishedResourceRow = {
  id: string;
  class_level: "9" | "10";
  subject: Subject;
  chapter: string;
  title: string;
  resource_type: ResourceType;
  file_path: string;
  created_at: string;
};

export type PublishedResourcesOptions = {
  limit?: number;
  signFileUrls?: boolean;
};

export type PublishedResourcesResult = {
  resources: NoteResource[];
  hasLoadError: boolean;
};

export async function getPublishedResources({ limit, signFileUrls = true }: PublishedResourcesOptions = {}): Promise<PublishedResourcesResult> {
  let failureStage = "client creation";

  try {
    const supabase = await createClient();
    failureStage = "published resource query";
    const query = supabase
      .from("resources")
      .select("id, class_level, subject, chapter, title, resource_type, file_path, created_at")
      .eq("status", "published")
      .order("created_at", { ascending: false });
    const { data, error } = await (limit === undefined ? query : query.limit(limit));

    if (error) {
      console.error("Unable to load published resources for Notes Corner.", failureStage, error.code ?? "unknown");
      return { resources: [], hasLoadError: true };
    }

    const rows = (data ?? []) as unknown as PublishedResourceRow[];
    failureStage = "resource mapping or signed URL generation";

    const mappedResources = await Promise.all(rows.map(async (row) => {
      const classLevel = classLevels.find((level) => level === `Class ${row.class_level}`);
      const subject = subjects.find((option) => option === row.subject);
      const resourceType = resourceTypes.find((option) => option === row.resource_type);

      if (!classLevel || !subject || !resourceType) return null;

      let fileUrl: string | null = null;
      if (signFileUrls) {
        try {
          const { data: signedUrlData, error: signedUrlError } = await supabase.storage
            .from("resources")
            .createSignedUrl(row.file_path, 60 * 60);

          if (signedUrlError) {
            console.warn("Unable to create a signed URL for a published resource.");
          } else {
            fileUrl = signedUrlData.signedUrl;
          }
        } catch {
          console.warn("Unable to create a signed URL for a published resource.");
        }
      }

      return {
        id: row.id,
        classLevel,
        subject,
        chapter: row.chapter,
        title: row.title,
        resourceType,
        uploadedAt: new Intl.DateTimeFormat("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }).format(new Date(row.created_at)),
        fileUrl,
      };
    }));

    return {
      resources: mappedResources.filter((resource): resource is NoteResource => resource !== null),
      hasLoadError: false,
    };
  } catch (error) {
    const errorType = error instanceof Error ? error.name : "UnknownError";
    console.error("Unable to load published resources for Notes Corner.", failureStage, errorType);
    return { resources: [], hasLoadError: true };
  }
}