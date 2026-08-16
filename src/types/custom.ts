import { tags } from "../components/Tags";

export type Tag = keyof typeof tags;

export type ProjectCategory = "Web" | "Mobile" | "IoT" | "Desktop" | "Tools";

export interface ProjectStats {
  stars?: number;
  forks?: number;
}

export interface Project {
  title: string;
  shortDesription?: string;
  description?: string;
  descriptionMd?: string;
  images: string[];
  tags: Tag[];
  links?: string[];
  category: ProjectCategory;
  stats?: ProjectStats;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  tags: Tag[];
}

export interface PortfolioData {
  name: string;
  login: string;
  profilePic: string;
  heroTagline: string;
  projectTagline: string;
  location: string;
  email: string;
  blog: string;
  tags: Tag[];
  githubLink: string;
  linkedInLink: string;
  projects: Project[];
  experiences: Experience[];
}
