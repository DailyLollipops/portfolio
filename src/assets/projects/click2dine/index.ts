import type { Project } from "@/types/custom";

import screenshot1 from "./1.png";
import screenshot2 from "./2.png";
import screenshot3 from "./3.png";
import screenshot4 from "./4.png";
import screenshot5 from "./5.png";
import descriptionMd from "./description.md?raw";

export const project: Project = {
  title: "Click2Dine",
  shortDesription:
    "Food delivery app connecting customers to local restaurants (Flutter + Firebase)",
  descriptionMd,
  tags: ["Flutter", "Firebase", "Python"],
  images: [screenshot1, screenshot2, screenshot3, screenshot4, screenshot5],
  links: [],
  category: "Mobile",
};

export default project;
