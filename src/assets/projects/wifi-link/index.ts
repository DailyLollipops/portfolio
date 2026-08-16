import type { Project } from "@/types/custom";

import web from "./1.png";
import machines from "./2.png";
import events from "./3.png";
import users from "./4.png";
import cli from "./5.png";

const descriptionMd = `## Wifi Link

An **IoT client and server for WiFi vending machines** — syncing sales, machine events, and user data from coin-op machines to a central server.

### 🚀 Highlights

- Python CLI client with environment-configurable settings
- Single-instance enforcement, reset, and server-sync commands
- systemd service + custom Raspberry Pi OS image with QEMU workflow
- Central FastAPI server dashboard
- WiFi machine API simulator for local development

### 🏗️ Tech Stack

- **Client:** Python (uv-packaged CLI)
- **Server:** FastAPI, TypeScript
- **Hardware:** Raspberry Pi (custom image)`;

export const project: Project = {
  title: "Wifi Link",
  shortDesription:
    "IoT client & server for WiFi vending machines (sales/event sync, custom Raspi image)",
  descriptionMd,
  tags: ["TypeScript", "FastAPI", "Python", "RaspberryPi"],
  images: [web, machines, events, users, cli],
  links: [],
  category: "IoT",
};

export default project;
