import type { Project } from "@/types/custom";

import screenshot1 from "./1.png";
import descriptionMd from "./description.md?raw";

export const project: Project = {
  title: "RaspiDevKit",
  shortDesription:
    "A python library for interfacing micro-controller devices to Raspberry PI and Arduino.",
  descriptionMd: descriptionMd,
  tags: ["Python", "Arduino", "RaspberryPi"],
  images: [screenshot1],
  links: ["https://github.com/raspidevkit/raspidevkit"],
};

export default project;
