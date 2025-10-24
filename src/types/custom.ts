import { tags } from "../components/Tags";

export type Tag = keyof typeof tags;

export interface Project {
  title: string;
  shortDesription?: string;
  description?: string;
  descriptionMd?: string;
  images: string[];
  tags: Tag[];
  links?: string[];
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
  profilePic: string;
  heroTagline: string;
  projectTagline: string;
  tags: Tag[];
  githubLink: string;
  linkedInLink: string;
  projects: Project[];
  experiences: Experience[];
}
