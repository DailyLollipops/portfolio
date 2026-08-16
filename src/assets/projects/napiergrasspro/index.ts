import type { Project } from "@/types/custom";

import screenshot1 from "./1.png";
import screenshot2 from "./2.png";
import screenshot3 from "./3.png";
import screenshot4 from "./4.png";
import screenshot5 from "./5.png";
import screenshot6 from "./6.png";
import screenshot7 from "./7.png";

const descriptionMd = `## NapierGrassPro

A Flutter app for **scanning potential Napier grass diseases** using an on-device AI model, built for farmers, technicians, and administrators.

### 🚀 Highlights

- Detect diseases from the camera or uploaded media with an AI model
- Offline detection with cloud sync when back online
- Treatment recommendations and disease knowledge base with progress tracking
- Role-based flows: Farmer, Technician, and Admin
- Chat with experts, mapping/monitoring, and diagnosis history

### 🏗️ Tech Stack

- **App:** Flutter
- **Backend:** FastAPI (Firebase + Firestore)
- **ML:** TensorFlow Lite model serving`;

export const project: Project = {
  title: "NapierGrassPro",
  shortDesription:
    "AI-powered Napier grass disease detection app for farmers, technicians, and admins",
  descriptionMd,
  tags: ["Flutter", "Firebase", "FastAPI", "TensorFlow"],
  images: [
    screenshot1,
    screenshot2,
    screenshot3,
    screenshot4,
    screenshot5,
    screenshot6,
    screenshot7,
  ],
  links: [],
  category: "Mobile",
};

export default project;
