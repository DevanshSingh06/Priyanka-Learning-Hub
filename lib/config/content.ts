export const classLevels = ["Class 9", "Class 10"] as const;
export type ClassLevel = (typeof classLevels)[number];

export const subjects = ["Mathematics", "Social Science"] as const;
export type Subject = (typeof subjects)[number];

export const resourceTypes = ["Notes", "Important Questions", "Revision Material", "Other"] as const;
export type ResourceType = (typeof resourceTypes)[number];