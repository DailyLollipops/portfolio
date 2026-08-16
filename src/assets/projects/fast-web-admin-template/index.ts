import type { Project } from "@/types/custom";

import screenshot1 from "./1.png";
import screenshot2 from "./2.png";

const descriptionMd = `## FastWeb Admin Template

A production-ready **full-stack web application template** bundling a FastAPI backend with a React Admin frontend.

### 🚀 Highlights

- FastAPI + MySQL + SQLModel + Alembic migrations
- React Admin (react-admin) interface with auth and 2FA flows
- Caddy automatic HTTPS + reverse proxy
- Docker Compose profiles (dev / prod / shared / testing)
- Jaeger distributed tracing included
- Code-generation CLI for models, routes, and factories

### 🏗️ Tech Stack

- **Backend:** FastAPI, SQLModel, MySQL, Alembic
- **Frontend:** React, React Admin, MUI
- **Infra:** Docker, Caddy, Jaeger`;

export const project: Project = {
  title: "FastWeb Admin Template",
  shortDesription:
    "Production-ready FastAPI + React Admin template with Docker, Alembic, and Jaeger tracing",
  descriptionMd,
  tags: ["Python", "FastAPI", "React", "ReactAdmin", "Docker", "MySQL", "Caddy", "Jaeger"],
  images: [screenshot1, screenshot2],
  links: ["https://github.com/DailyLollipops/fast-web-admin-template"],
  category: "Web",
};

export default project;
