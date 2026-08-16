import type { Project } from "@/types/custom";

import screenshot1 from "./1.png";
import screenshot2 from "./2.png";
import screenshot3 from "./3.png";
import screenshot4 from "./4.png";
import screenshot5 from "./5.png";
import screenshot6 from "./6.png";

const descriptionMd = `## Click2Dine

A Flutter-based **food delivery app** connecting customers with local restaurants, backed by Firebase.

### 🚀 Highlights

- Firebase Auth user authentication
- Restaurant & product data in Cloud Firestore
- Restaurant browsing, search, cart, and order tracking
- Push notifications via Firebase Cloud Messaging
- Owner and customer navigation flows
- Python seed scripts for restaurant/menu setup

### 🏗️ Tech Stack

- **App:** Flutter, Dart
- **Backend:** Firebase Auth, Firestore, Cloud Messaging, Functions
- **Tooling:** Python seed scripts`;

export const project: Project = {
  title: "Click2Dine",
  shortDesription:
    "Food delivery app connecting customers to local restaurants (Flutter + Firebase)",
  descriptionMd,
  tags: ["Flutter", "Firebase", "Python"],
  images: [screenshot1, screenshot2, screenshot3, screenshot4, screenshot5, screenshot6],
  links: [],
  category: "Mobile",
};

export default project;
