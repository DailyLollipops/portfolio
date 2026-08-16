import type { Project } from "@/types/custom";

import dashboard from "./1.png";
import login from "./2.png";
import server from "./3.png";
import edge from "./4.png";
import controller from "./5.png";

const descriptionMd = `## VCLane

A distributed **adaptive traffic monitoring and management platform** spanning five components — AI edge devices, an ESP-32 traffic controller, a FastAPI backend, and a Flutter operator app.

### 🚀 Highlights

- **Edge devices** (Raspberry Pi) run YOLO detection, publish RTSP/WebRTC streams, and bridge MQTT telemetry
- **ESP-32 traffic controller** firmware with MQTT-over-TLS, LoRa phase broadcasts, and offline fallback via RTC + cached schedules
- **Backend** wired through Caddy TLS → FastAPI → Firebase (Auth/Firestore/RTDB) + MediaMTX + Mosquitto
- **Mobile app** (Riverpod + go_router) with live video streaming, telemetry charts, and device management
- Full technical documentation across the vclane-docs repo

### 🏗️ Tech Stack

- **Backend:** FastAPI, Firebase, MediaMTX, Mosquitto
- **Edge:** Python, YOLO, MQTT, LoRa
- **Firmware:** C++ (ESP-32)
- **Mobile:** Flutter, Riverpod, go_router, media_kit`;

export const project: Project = {
  title: "VCLane",
  shortDesription:
    "Adaptive traffic monitoring platform — AI edge devices, ESP-32 controllers, backend, and mobile app",
  descriptionMd,
  tags: ["Python", "FastAPI", "Flutter", "C++", "ESP32", "MQTT", "LoRa", "YOLO", "Riverpod"],
  images: [dashboard, login, server, edge, controller],
  links: ["https://github.com/vclane/vclane-docs"],
  category: "IoT",
};

export default project;
