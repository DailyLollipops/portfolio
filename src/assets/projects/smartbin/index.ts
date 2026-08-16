import type { Project } from "@/types/custom";

import screenshot1 from "./1.png";
import screenshot2 from "./2.png";
import screenshot3 from "./3.png";
import descriptionMd from "./description.md?raw";

export const project: Project = {
  title: "Smartbin",
  shortDesription:
    "AI trash identification & segregation with a web dashboard and MQTT",
  descriptionMd,
  tags: ["FastAPI", "Python", "TypeScript", "React", "Redux", "MQTT", "RaspberryPi", "Docker"],
  images: [screenshot1, screenshot2, screenshot3],
  links: [],
  category: "IoT",
};

export default project;
