import type { Project } from "@/types/custom";

import screenshot1 from "./1.png";
import screenshot2 from "./2.png";
import screenshot3 from "./3.png";
import screenshot4 from "./4.png";

const descriptionMd = `## Timekeeper

An **attendance-taking app** with QR-code registration and login, SMS notifications, and report generation.

### 🚀 Highlights

- Login via QR code (emailed on registration)
- SMS notification to guardians on login
- Automated QR-code generation
- Admin dashboard for users, attendance, and settings
- Report generation delivered via email

### 🏗️ Tech Stack

- **App:** Flutter
- **Storage:** SQLite
- **Notifications:** SMS (Telephony)`;

export const project: Project = {
  title: "Timekeeper",
  shortDesription:
    "QR-code attendance app with SMS guardian alerts and report generation",
  descriptionMd,
  tags: ["Flutter", "SQLite"],
  images: [screenshot1, screenshot2, screenshot3, screenshot4],
  links: [],
  category: "Mobile",
};

export default project;
