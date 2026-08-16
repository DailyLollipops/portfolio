import type { Project } from "@/types/custom";

import screenshot1 from "./1.png";
import screenshot2 from "./2.png";
import screenshot3 from "./3.png";
import screenshot4 from "./4.png";
import screenshot5 from "./5.png";
import screenshot6 from "./6.png";

const descriptionMd = `## Petromaxx Admin

A **gas-station management admin** handling fuel products, pump attendants, and station operations.

### 🚀 Highlights

- FastAPI + SQLModel backend
- React Admin frontend for station management
- Role-based dashboards (admin, owner, sales admin, inventory admin, pump attendant)
- Fuel product and pump-attendant workflows
- Dockerized with Caddy reverse proxy

### 🏗️ Tech Stack

- **Backend:** FastAPI, SQLModel, MySQL
- **Frontend:** React Admin, MUI
- **Infra:** Docker, Caddy`;

export const project: Project = {
  title: "Petromaxx Admin",
  shortDesription:
    "Gas-station management admin for fuel products and pump attendants",
  descriptionMd,
  tags: ["Python", "FastAPI", "React", "Docker", "MySQL"],
  images: [screenshot1, screenshot2, screenshot3, screenshot4, screenshot5, screenshot6],
  links: [],
  category: "Web",
};

export default project;
