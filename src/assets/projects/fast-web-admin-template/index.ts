import type { Project } from "@/types/custom";

import screenshot1 from "./1.png";
import screenshot2 from "./2.png";
import descriptionMd from "./description.md?raw";

export const project: Project = {
  title: "FastWeb Admin Template",
  shortDesription:
    "Production-ready FastAPI + React Admin template with Docker, Alembic, and Jaeger tracing",
  descriptionMd,
  tags: ["FastAPI", "ReactAdmin", "React", "TypeScript", "MySQL", "SQLModel", "Alembic", "Docker", "Jaeger"],
  images: [screenshot1, screenshot2],
  links: ["https://github.com/DailyLollipops/fast-web-admin-template"],
  category: "Web",
};

export default project;
