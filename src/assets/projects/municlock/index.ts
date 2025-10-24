import type { Project } from "@/types/custom";

import screenshot1 from "./1.png";
import screenshot2 from "./2.png";
import screenshot3 from "./3.png";
import screenshot4 from "./4.png";
import screenshot5 from "./5.png";
import screenshot6 from "./6.png";
import descriptionMd from "./description.md?raw";

export const project: Project = {
  title: "Municlock",
  shortDesription:
    "A DTR Management System developed for the LGU of Boac Marinduque",
  descriptionMd: descriptionMd,
  tags: ["Python", "Tkinter", "MySQL"],
  images: [
    screenshot1,
    screenshot2,
    screenshot3,
    screenshot4,
    screenshot5,
    screenshot6,
  ],
};

export default project;
