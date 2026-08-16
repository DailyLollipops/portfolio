import type { Project } from "@/types/custom";

import screenshot1 from "./1.png";
import screenshot2 from "./2.png";
import screenshot3 from "./3.png";

const descriptionMd = `## Smartbin

An IoT system that **automatically identifies and segregates trash** with a web-based dashboard.

### 🚀 Highlights

- Machine vision trash classification
- Hardware GUI for the sorting machine
- MQTT messaging between device and server
- Web dashboard for monitoring and analytics
- Dockerized FastAPI backend with Caddy

### 🏗️ Tech Stack

- **Backend:** Python, FastAPI, SQLModel
- **Frontend:** React
- **Hardware:** Raspberry Pi + MQTT`;

export const project: Project = {
  title: "Smartbin",
  shortDesription:
    "AI trash identification & segregation with a web dashboard and MQTT",
  descriptionMd,
  tags: ["Python", "TypeScript", "React", "MQTT", "RaspberryPi"],
  images: [screenshot1, screenshot2, screenshot3],
  links: [],
  category: "IoT",
};

export default project;
