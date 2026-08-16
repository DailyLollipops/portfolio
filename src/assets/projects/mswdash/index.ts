import type { Project } from "@/types/custom";

import screenshot1 from "./1.png";
import screenshot2 from "./2.png";
import screenshot3 from "./3.png";
import screenshot4 from "./4.png";
import screenshot5 from "./5.png";
import screenshot6 from "./6.png";

const descriptionMd = `## MSWDash

A web-based application for enhancing **MSWDO initiatives in disaster relief and poverty alleviation** in Torrijos, Marinduque.

### 🚀 Highlights

- Dashboard for disaster-relief and poverty-alleviation programs
- Role-based access (admin, officer, staff, user, barangay)
- Application, beneficiary, and balance management
- Dockerized deployment with Caddy reverse proxy
- FastAPI backend with SQLModel

### 🏗️ Tech Stack

- **Backend:** FastAPI, SQLModel
- **Frontend:** React, JavaScript
- **Infra:** Docker, Caddy`;

export const project: Project = {
  title: "MSWDash",
  shortDesription:
    "Disaster relief & poverty alleviation dashboard for MSWDO Torrijos",
  descriptionMd,
  tags: ["Javascript", "React", "Docker", "MySQL"],
  images: [screenshot1, screenshot2, screenshot3, screenshot4, screenshot5, screenshot6],
  links: [],
  category: "Web",
};

export default project;
