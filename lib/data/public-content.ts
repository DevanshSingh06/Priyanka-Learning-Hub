import galleryImage01 from "../../images/gallery/gallery-01.jpeg";
import galleryImage02 from "../../images/gallery/gallery-02.jpeg";
import galleryImage03 from "../../images/gallery/gallery-03.jpeg";
import galleryImage04 from "../../images/gallery/gallery-04.jpeg";
import galleryImage05 from "../../images/gallery/gallery-05.jpeg";
import galleryImage06 from "../../images/gallery/gallery-06.jpeg";
import galleryImage07 from "../../images/gallery/gallery-07.jpeg";
import galleryImage08 from "../../images/gallery/gallery-08.jpeg";
import resultsPhoto01 from "../../images/results/results-01.png";
import resultsPhoto02 from "../../images/results/results-02.jpg";
import resultsPhoto03 from "../../images/results/results-03.png";
import resultsPhoto04 from "../../images/results/results-04.png";
import type { StaticImageData } from "next/image";
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
  { id: "youtube-lesson-2", title: "Watch Lesson on YouTube", youtubeUrl: "https://youtu.be/iv5yFmB7bbs?si=mZwF5PxebsRRMMcp" },
  { id: "youtube-lesson-3", title: "Forest and Wildlife Resources | Class 10 Geography Chapter 2 | Complete Chapter | CBSE 2026-27", youtubeUrl: "https://youtu.be/-NjdkC3qEtk?si=nPVnc8rvkf_10X7x" },
];

export const instagramReels = [
  { id: "instagram-reel-1", url: "https://www.instagram.com/reel/DcdREFJkUmO/" },
  { id: "instagram-reel-2", url: "https://www.instagram.com/reel/Dbsgg43Bg9X/" },
];

export const successPlaceholders: { id: string; title: string; description: string; label: string }[] = [];

export const feedbackPlaceholders: { id: string; audience: string; description: string; label: string }[] = [];

export type BoardResult = {
  id: string;
  photo: StaticImageData;
  studentName: string;
  className: string;
  board: string;
  resultType: string;
  maths: number;
  sst: number;
  alt: string;
};

export const results: BoardResult[] = [
  { id: "result-01", photo: resultsPhoto01, studentName: "Muskaan Sharma", className: "10th", board: "CBSE", resultType: "Board Result", maths: 96, sst: 100, alt: "Muskaan Sharma, Class 10 CBSE student" },
  { id: "result-02", photo: resultsPhoto02, studentName: "Reeva", className: "10th", board: "CBSE", resultType: "Board Result", maths: 95, sst: 90, alt: "Reeva, Class 10 CBSE student" },
  { id: "result-03", photo: resultsPhoto03, studentName: "Shaurya Singla", className: "10th", board: "CBSE", resultType: "Board Result", maths: 85, sst: 80, alt: "Shaurya Singla, Class 10 CBSE student" },
  { id: "result-04", photo: resultsPhoto04, studentName: "Ekam", className: "10th", board: "CBSE", resultType: "Board Result", maths: 98, sst: 97, alt: "Ekam, Class 10 CBSE student" },
];

export const galleryCategories = ["All", "Classes", "Events", "Activities", "Achievements"] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryItem = { id: string; category: Exclude<GalleryCategory, "All">; title?: string; imageUrl: StaticImageData; alt: string };
export const galleryPlaceholders: GalleryItem[] = [
  { id: "gallery-01", category: "Events", imageUrl: galleryImage01, alt: "Students gathered around a cake during a celebration" },
  { id: "gallery-02", category: "Activities", imageUrl: galleryImage02, alt: "Students participating in a group activity" },
  { id: "gallery-03", category: "Events", imageUrl: galleryImage03, alt: "Students and teacher together at an event" },
  { id: "gallery-04", category: "Events", imageUrl: galleryImage04, alt: "Teacher with students during a gathering" },
  { id: "gallery-05", category: "Activities", imageUrl: galleryImage05, alt: "Students taking part in a classroom activity" },
  { id: "gallery-06", category: "Events", imageUrl: galleryImage06, alt: "Students celebrating together" },
  { id: "gallery-07", category: "Classes", imageUrl: galleryImage07, alt: "Students working together during a class" },
  { id: "gallery-08", category: "Classes", imageUrl: galleryImage08, alt: "Teacher and students in a classroom" },
];