import type { Project } from "@/types/custom";

import dashboard from "./1.png";
import login from "./2.png";
import server from "./3.png";
import edge from "./4.png";
import controller from "./5.png";
import descriptionMd from "./description.md?raw";

export const project: Project = {
  title: "VCLane",
  shortDesription:
    "Adaptive traffic monitoring platform - AI edge devices, ESP-32 controllers, backend, and mobile app",
  descriptionMd,
  tags: ["FastAPI", "Python", "Flutter", "C++", "ESP32", "MQTT", "LoRa", "YOLO", "MediaMTX"],
  images: [dashboard, login, server, edge, controller],
  links: ["https://github.com/vclane/vclane-docs"],
  category: "IoT",
};

export default project;
