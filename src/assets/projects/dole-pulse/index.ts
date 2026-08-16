import type { Project } from "@/types/custom";

import screenshot1 from "./1.png";
import screenshot2 from "./2.png";
import screenshot3 from "./3.png";

const descriptionMd = `## DOLE Pulse

An **admin dashboard** built for the Department of Labor and Employment, powered by a FastAPI backend and React Admin frontend.

### 🚀 Highlights

- FastAPI + SQLModel backend with Alembic migrations
- React Admin interface with role-based access
- Dockerized deployment with Caddy TLS
- Environment-specific configuration

### 🏗️ Tech Stack

- **Backend:** FastAPI, SQLModel, MySQL
- **Frontend:** React Admin, MUI
- **Infra:** Docker, Caddy`;

export const project: Project = {
  title: "DOLE Pulse",
  shortDesription:
    "Admin dashboard for the Department of Labor and Employment",
  descriptionMd,
  tags: ["Python", "FastAPI", "React", "Docker", "MySQL"],
  images: [screenshot1, screenshot2, screenshot3],
  links: [],
  category: "Web",
};

export default project;
