import type { ClassLevel, ResourceType, Subject } from "@/lib/config/content";

export type SubjectResource = {
  id: string;
  name: string;
  classLevel: ClassLevel;
};

export type NoteResource = {
  id: string;
  classLevel: ClassLevel;
  subject: Subject;
  resourceType: ResourceType;
  chapter: string;
  title: string;
  uploadedAt: string;
  fileUrl: string | null;
};

export type LessonResource = {
  id: string;
  classLevel?: ClassLevel;
  subject?: Subject;
  topic?: string;
  title: string;
  youtubeUrl: string | null;
};

export const subjectPlaceholders: SubjectResource[] = [];

export const noteResources: NoteResource[] = [];

export const lessonResources: LessonResource[] = [
  { id: "youtube-lesson-1", title: "Watch Lesson on YouTube", youtubeUrl: "https://youtu.be/QV6dbnW-CEI" },
  { id: "youtube-lesson-2", title: "Watch Lesson on YouTube", youtubeUrl: "https://youtu.be/892gHzMkDzA" },
];

export const instagramReels = [
  { id: "instagram-reel-1", url: "https://www.instagram.com/reel/DcdREFJkUmO/" },
  { id: "instagram-reel-2", url: "https://www.instagram.com/reel/Dbsgg43Bg9X/" },
];

export const successPlaceholders: { id: string; title: string; description: string; label: string }[] = [];

export const feedbackPlaceholders: { id: string; audience: string; description: string; label: string }[] = [];

export const galleryCategories = ["All", "Classes", "Events", "Activities", "Achievements"] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryItem = { id: string; category: Exclude<GalleryCategory, "All">; title: string; imageUrl: string; alt: string };
export const galleryPlaceholders: GalleryItem[] = [];