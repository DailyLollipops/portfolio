import type { Project } from "@/types/custom";

import screenshot1 from "./1.png";
import screenshot2 from "./2.png";
import screenshot3 from "./3.png";
import screenshot4 from "./4.png";
import descriptionMd from "./description.md?raw";

export const project: Project = {
  title: "Timekeeper",
  shortDesription:
    "QR-code attendance app with SMS guardian alerts and report generation",
  descriptionMd,
  tags: ["Flutter", "SQLite"],
  images: [screenshot1, screenshot2, screenshot3, screenshot4],
  links: [],
  category: "Mobile",
};

export default project;
