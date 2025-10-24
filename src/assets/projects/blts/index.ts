import type { Project } from "@/types/custom";

import screenshot1 from "./1.png";
import screenshot2 from "./2.png";
import screenshot3 from "./3.png";
import screenshot4 from "./4.png";
import screenshot5 from "./5.png";
import screenshot6 from "./6.png";
import descriptionMd from "./description.md?raw";

export const project: Project = {
  title: "BLTS",
  shortDesription:
    "A platform for barangay secretaries to digitally track legislative-related documents. Developed for the Province of Marinduque, Philippines.",
  descriptionMd: descriptionMd,
  tags: ["Laravel", "Tailwind", "MySQL", "Laragon"],
  images: [
    screenshot1,
    screenshot2,
    screenshot3,
    screenshot4,
    screenshot5,
    screenshot6,
  ],
  links: [
    "https://github.com/DailyLollipops/BLTS",
    "https://github.com/DailyLollipops/BLTS-Installer",
  ],
};

export default project;
