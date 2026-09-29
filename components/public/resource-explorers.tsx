"use client";

import { useState } from "react";
import { Download, ExternalLink, FileText, Play, Search } from "lucide-react";
import { EmptyState } from "@/components/layout/public-page";
import { classLevels, resourceTypes } from "@/lib/config/content";
import { lessonResources, type NoteResource } from "@/lib/data/public-content";

const classOptions = ["All classes", ...classLevels];

export function NotesExplorer({ resources, hasLoadError = false }: { resources: NoteResource[]; hasLoadError?: boolean }) {
  const [classFilter, setClassFilter] = useState("All classes");
  const [subjectFilter, setSubjectFilter] = useState("All subjects");
  const [resourceTypeFilter, setResourceTypeFilter] = useState("All resource types");
  const [query, setQuery] = useState("");
  const subjects = Array.from(new Set(resources.map((note) => note.subject)));
  const visibleNotes = resources.filter((note) => {
    const matchesClass = classFilter === "All classes" || note.classLevel === classFilter;
    const matchesSubject = subjectFilter === "All subjects" || note.subject === subjectFilter;
    const matchesResourceType = resourceTypeFilter === "All resource types" || note.resourceType === resourceTypeFilter;
    const matchesQuery = `${note.title} ${note.chapter} ${note.subject}`.toLowerCase().includes(query.toLowerCase());
    return matchesClass && matchesSubject && matchesResourceType && matchesQuery;
  });

  if (hasLoadError) {
    return <div role="alert"><EmptyState title="Study resources are temporarily unavailable" message="We could not load resources right now. Please try again shortly." /></div>;
  }

  if (resources.length === 0) {
    return <EmptyState title="Study resources are being prepared" message="Check back soon for notes, revision material and important questions." />;
  }

  return <div className="resource-explorer">
    <div className="filter-bar notes-filter-bar" aria-label="Filter notes">
      <label className="search-field"><Search size={17} /><span className="visually-hidden">Search notes</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search notes or chapters" /></label>
      <label className="filter-field"><span>Class</span><select value={classFilter} onChange={(event) => setClassFilter(event.target.value)}>{classOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
      <label className="filter-field"><span>Subject</span><select value={subjectFilter} onChange={(event) => setSubjectFilter(event.target.value)}><option>All subjects</option>{subjects.map((subject) => <option key={subject}>{subject}</option>)}</select></label>
      <label className="filter-field"><span>Resource type</span><select value={resourceTypeFilter} onChange={(event) => setResourceTypeFilter(event.target.value)}><option>All resource types</option>{resourceTypes.map((resourceType) => <option key={resourceType}>{resourceType}</option>)}</select></label>
    </div>
    <p className="resource-count" aria-live="polite">{visibleNotes.length} {visibleNotes.length === 1 ? "resource" : "resources"}</p>
    {visibleNotes.length ? <div className="resource-grid">{visibleNotes.map((note) => <article className="resource-card" key={note.id}>
      <div className="resource-card-top"><span className="resource-icon"><FileText size={20} /></span><span className="resource-kind">{note.resourceType}</span></div>
      <p className="resource-eyebrow">{note.classLevel} <span>/</span> {note.subject}</p>
      <h2>{note.title}</h2>
      <p className="resource-description">{note.chapter}</p>
      <p className="resource-date">{note.uploadedAt}</p>
      {note.fileUrl ? <div className="resource-actions"><a className="button button-light" href={note.fileUrl} target="_blank" rel="noreferrer">View PDF <ExternalLink size={15} /></a><a className="icon-action" href={note.fileUrl} download aria-label={`Download ${note.title}`}><Download size={17} /></a></div> : <span className="resource-kind">File temporarily unavailable</span>}
    </article>)}</div> : <EmptyState title="No matching resources" message="Try another class, subject, or search term." />}
  </div>;
}

export function LearningExplorer() {
  const [classFilter, setClassFilter] = useState("All classes");
  const [subjectFilter, setSubjectFilter] = useState("All subjects");
  const [query, setQuery] = useState("");
  const availableClasses = Array.from(new Set(lessonResources.flatMap((lesson) => lesson.classLevel ? [lesson.classLevel] : [])));
  const subjects = Array.from(new Set(lessonResources.flatMap((lesson) => lesson.subject ? [lesson.subject] : [])));
  const visibleLessons = lessonResources.filter((lesson) => {
    const matchesClass = !lesson.classLevel || classFilter === "All classes" || lesson.classLevel === classFilter;
    const matchesSubject = !lesson.subject || subjectFilter === "All subjects" || lesson.subject === subjectFilter;
    const searchText = [lesson.title, lesson.topic, lesson.subject, lesson.classLevel].filter(Boolean).join(" ");
    const matchesQuery = searchText.toLowerCase().includes(query.toLowerCase());
    return matchesClass && matchesSubject && matchesQuery;
  });

  if (lessonResources.length === 0) {
    return <EmptyState title="No lessons are available yet" message="Please check back for free learning videos." />;
  }

  return <div className="resource-explorer">
    {(availableClasses.length > 0 || subjects.length > 0) && <div className="filter-bar" aria-label="Filter video lessons">
      <label className="search-field"><Search size={17} /><span className="visually-hidden">Search lessons</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search lessons or topics" /></label>
      {availableClasses.length > 0 && <label className="filter-field"><span>Class</span><select value={classFilter} onChange={(event) => setClassFilter(event.target.value)}>{classOptions.map((option) => <option key={option}>{option}</option>)}</select></label>}
      {subjects.length > 0 && <label className="filter-field"><span>Subject</span><select value={subjectFilter} onChange={(event) => setSubjectFilter(event.target.value)}><option>All subjects</option>{subjects.map((subject) => <option key={subject}>{subject}</option>)}</select></label>}
    </div>}
    <p className="resource-count" aria-live="polite">{visibleLessons.length} {visibleLessons.length === 1 ? "lesson" : "lessons"}</p>
    {visibleLessons.length ? <div className="resource-grid video-resource-grid">{visibleLessons.map((lesson) => <article className="resource-card video-resource-card" key={lesson.id}>
      <div className="lesson-thumbnail"><span className="play-button"><Play size={17} fill="currentColor" /></span></div>
      {(lesson.classLevel || lesson.subject) && <p className="resource-eyebrow">{[lesson.classLevel, lesson.subject].filter(Boolean).join(" / ")}</p>}
      <h2>{lesson.title}</h2>
      {lesson.topic && <p className="resource-description">{lesson.topic}</p>}
      {lesson.youtubeUrl && <div className="resource-actions"><a className="button button-light" href={lesson.youtubeUrl} target="_blank" rel="noreferrer">Watch Lesson on YouTube <ExternalLink size={15} /></a></div>}
    </article>)}</div> : <EmptyState title="No matching lessons" message="Try another class, subject, or search term." />}
  </div>;
}