import type { Project } from "@/types/custom";

import screenshot1 from "./1.png";
import screenshot2 from "./2.png";
import screenshot3 from "./3.png";
import screenshot4 from "./4.png";
import screenshot5 from "./5.png";
import screenshot6 from "./6.png";
import descriptionMd from "./description.md?raw";

export const project: Project = {
  title: "Petromaxx Admin",
  shortDesription:
    "Gas-station management admin for fuel products and pump attendants",
  descriptionMd,
  tags: ["FastAPI", "ReactAdmin", "React", "MySQL", "SQLModel", "Alembic", "Docker"],
  images: [screenshot1, screenshot2, screenshot3, screenshot4, screenshot5, screenshot6],
  links: [],
  category: "Web",
};

export default project;
