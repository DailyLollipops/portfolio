## VCLane

**VCLane (Adaptive Traffic Monitoring System)** is a distributed, intelligent traffic monitoring and management platform providing real-time traffic observation, live video streaming, AI-based traffic analysis, device monitoring, and coordinated traffic signal control across multiple intersections.

The system follows an **edge computing architecture**, where every traffic intersection operates as an independent AI-enabled Raspberry Pi edge device for local camera processing and traffic light actuation. Intersections are organized into **groups**, and each group is coordinated locally by an **ESP-32 Traffic Controller** via **LoRa** wireless broadcasts, ensuring fault-tolerant signaling even during internet outages. Remote management and signal schedules are handled by the backend over **MQTT over TLS**.

### Why it exists

Traditional traffic management relies on central servers and always-on connectivity, which breaks down during outages and creates high-latency command loops. VCLane inverts this: intelligence and actuation live at the edge, so intersections keep operating in a coordinated way even when the cloud is unreachable.

### Architecture

The platform spans five components, each a dedicated repository:

- **vclane-server** - FastAPI backend fronted by Caddy (TLS), orchestrating devices, groups, schedules, and overrides. Uses Firebase Auth/Firestore for identity and persistence, Realtime Database for live telemetry, and integrates MediaMTX (RTSP/WebRTC relay) and a Mosquitto MQTT broker. Ships with pytest test suites, Docker Compose dev/prod profiles, and seed/reset CLI scripts.
- **vclane-edge** - Python (uv-packaged) software running on the Raspberry Pi at each intersection. Captures video, runs YOLO object detection locally, publishes RTSP streams, reports telemetry over MQTT, listens for LoRa phase broadcasts from the group ESP-32, and drives the physical relay board (green/yellow/red lamps). Includes a command-line interface for running, registering, and deregistering devices, a Docker multi-stage build, and a mock-telemetry mode for development.
- **vclane-controller** - ESP-32 firmware (C++/PlatformIO) acting as the group's local master coordinator. Receives schedules and overrides from the backend over MQTT-over-TLS, computes the active traffic-light phase set, and broadcasts it to edge devices over LoRa. Falls back to offline scheduling using a battery-backed RTC and schedules cached in NVS.
- **vclane-client** - Flutter operator app with live video streaming (media_kit), telemetry charts (fl_chart), device/group management, and signal override controls. Structured with Riverpod state management and go_router.
- **vclane-docs** - full documentation site (public) covering overview, architecture, edge device, traffic controller, backend API, MQTT communication, media server, and features, including Mermaid diagrams and API endpoint tables.

### How it works

**Normal (online) flow:** The backend publishes schedules and manual overrides to the MQTT broker. The ESP-32 controller subscribes, runs the coordination loop, and broadcasts target phase states (e.g. green for 90 seconds per turn) over LoRa to the group's edge devices, which actuate the physical relays. Edge devices process video locally with OpenCV + YOLO, publish telemetry (vehicle counts, lane occupancy, congestion level) and heartbeats back over MQTT, and stream RTSP to MediaMTX for live viewing.

**Offline (outage) flow:** if the group loses internet, the ESP-32 transitions to offline mode and keeps executing cached schedules using its RTC, broadcasting phases over LoRa so lights stay synchronized. If an individual edge device goes offline while the controller is online, the controller publishes fallback telemetry of the active signal states so the backend maintains visibility. If a LoRa signal is lost, edge devices drop to a safety routine (flashing yellow caution) to avoid unsafe states.

**MQTT topic structure** isolates per-device telemetry/heartbeat/commands and per-group commands/schedules, with LWT topics for online/offline tracking, and requests-on-connect schedule sync so controllers retrieve the latest schedule without polling.

### Feature tour

- **AI-powered traffic intelligence** - real-time vehicle/pedestrian detection, congestion detection, and traffic-pattern monitoring at the edge
- **Live video streaming** - RTSP ingestion at the edge, relayed through MediaMTX, with WebRTC playback in the operator app
- **Grouped intersection control** - a group of intersections is coordinated by a single ESP-32 via LoRa with group-ID token isolation and packet sequence deduplication
- **Manual signal overrides** - operators can push a signal override (with phases + duration) or cancel an override on any group, executed locally by the controller
- **Fault tolerance** - offline RTC/NVS scheduling, fallback telemetry, LWT-based health monitoring, and per-turn phase broadcasts every second plus a 3-packet burst on phase change
- **Device lifecycle** - registration/provisioning flow (device ID + secret), device CRUD, group CRUD, and assignment of devices to intersections
- **Full documentation** - architecture diagrams, hardware wiring (LoRa SPI pins, relay GPIO, camera), MQTT topic spec, and schedule model documented in vclane-docs

### Tech stack

- **Backend:** Python, FastAPI, Paho MQTT, Firebase Admin SDK (Firestore/RTDB), JWT, Caddy, Docker + Compose
- **Edge:** Python, OpenCV, Ultralytics YOLO (PyTorch), Eclipse Paho, LoRa SX1276/SX1278, gpio-controlled relays, FFmpeg/GStreamer
- **Firmware:** C++ (ESP-IDF/Arduino Core, PlatformIO), MQTT-over-TLS, LoRa RadioLib, DS3231 RTC, NVS storage
- **Mobile:** Flutter, Riverpod, go_router, media_kit, fl_chart
- **Messaging:** Mosquitto (MQTT) with TLS + auth, MediaMTX (RTSP/WebRTC)

### Challenges

- Coordinating multiple devices under connectivity loss required designing a layered fallback chain: cloud → MQTT → LoRa → local safety routine
- LoRa packet deduplication across reboots is handled by persisting the packet sequence number to NVS on each phase change
- Building a schedule model (repeating turn loop with per-device phases) that a constrained ESP-32 can execute offline while remaining validateable on the backend
