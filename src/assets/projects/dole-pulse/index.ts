import type { Project } from "@/types/custom";

import screenshot1 from "./1.png";
import screenshot2 from "./2.png";
import screenshot3 from "./3.png";
import descriptionMd from "./description.md?raw";

export const project: Project = {
  title: "DOLE Pulse",
  shortDesription:
    "Admin dashboard for the Department of Labor and Employment",
  descriptionMd,
  tags: ["FastAPI", "ReactAdmin", "React", "MySQL", "SQLModel", "Alembic", "Docker"],
  images: [screenshot1, screenshot2, screenshot3],
  links: [],
  category: "Web",
};

export default project;
