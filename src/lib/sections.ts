export type SectionTabId =
  | "overview"
  | "projects"
  | "experience"
  | "education"
  | "contact";

export const sectionTabs: { id: SectionTabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
