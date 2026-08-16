import { portfolio } from "@/assets/data";
import type { Project } from "@/types/custom";

export const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const findBySlug = (slug: string): Project | undefined =>
  portfolio.projects.find((p) => slugify(p.title) === slug);

export const projectSlug = (project: Project) => slugify(project.title);