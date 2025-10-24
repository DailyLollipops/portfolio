import type { Project } from "@/types/custom";

import screenshot1 from "./1.png";
import screenshot2 from "./2.png";
import screenshot3 from "./3.png";
import screenshot4 from "./4.png";
import screenshot5 from "./5.png";
import screenshot6 from "./6.png";
import screenshot7 from "./7.png";
import screenshot8 from "./8.png";
import descriptionMd from "./description.md?raw";

export const project: Project = {
  title: "Medbot",
  shortDesription:
    "An integrated health-monitoring device and web application designed for users to track vital health metrics",
  descriptionMd: descriptionMd,
  tags: ["Python", "RaspberryPi", "Arduino", "Laravel", "MySQL"],
  images: [
    screenshot1,
    screenshot2,
    screenshot3,
    screenshot4,
    screenshot5,
    screenshot6,
    screenshot7,
    screenshot8,
  ],
  links: [
    "https://github.com/DailyLollipops/medbot",
    "https://github.com/DailyLollipops/medbot-pro",
  ],
};

export default project;
