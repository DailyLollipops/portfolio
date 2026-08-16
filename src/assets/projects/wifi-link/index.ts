import type { Project } from "@/types/custom";

import web from "./1.png";
import machines from "./2.png";
import events from "./3.png";
import users from "./4.png";
import cli from "./5.png";
import descriptionMd from "./description.md?raw";

export const project: Project = {
  title: "Wifi Link",
  shortDesription:
    "IoT client & server for WiFi vending machines (sales/event sync, custom Raspi image)",
  descriptionMd,
  tags: ["FastAPI", "TypeScript", "Python", "RaspberryPi", "SQLite", "Docker"],
  images: [web, machines, events, users, cli],
  links: [],
  category: "IoT",
};

export default project;
