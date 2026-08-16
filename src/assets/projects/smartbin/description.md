## Smartbin

**Smartbin** is an IoT system that **automatically identifies and segregates trash** at the point of disposal, with real-time web dashboarding for monitoring and analytics.

The insight behind the project: sorting recyclables manually is error-prone and low-volume. By placing machine-vision classification directly on the bin, the system improves segregation rates automatically and gives operators a live view of what is being collected, where, and when.

### Architectural overview

A three-part system combining a hardware-side sorting machine, a FastAPI API layer, and a React dashboard.

Key components:

- **Smartbin Machine** - a Raspberry Pi controller that drives the camera, PIR and ultrasonic sensors, and hatch/rotator servos, and presents a full-screen status GUI (checking, device-ready, error, bin levels, and tips) with animated feedback.
- **Smartbin API** - a FastAPI + SQLModel service with database migrations, JWT authentication, and REST routes for trash/trashbin records, notifications, profiles, and dashboard data.
- **Smartbin Web** - a React + MUI dashboard with per-category charts, trashbin management screens, notifications, and login/signup flows.

When an item is detected, the machine captures and classifies it, streams the result over MQTT to the API, which persists it and exposes it to the live dashboard. The servos physically route the item into the correct compartment while ultrasonic sensors monitor fill levels.

### Feature tour

- **Machine vision trash classification** - automatic identification from camera captures
- **Hardware GUI** - full-screen Python UI with checking/ready/error panels, animated indicators, and tips
- **MQTT messaging** - device to API event streaming over a local Mosquitto broker
- **Web dashboard** - trash identified per category, total trash per category, trashbin cards, and charting
- **Trashbin management** - add, edit, delete, and monitor multiple bins
- **Dockerized FastAPI backend with Caddy** - dev and prod compose profiles plus reverse proxy
- **Test-driven hardware** - per-sensor test scripts for camera, PIR, servos, ultrasonic, and color handling

### Engineering & challenges

- Coordinating real hardware (sensors + servos) with classification timing required decoupled processes for capture, publish, and GUI so a slow classification never freezes the operator screen
- Getting reliable captures in varied lighting meant including a self-test data path and testing camera/color handling rigourously per component
- Database migrations had to work around SQLModel/SQLAlchemy model-materialization quirks, resolved by importing the ORM library inside generated migration files

### Tech stack

- **Backend:** Python, FastAPI, SQLModel (SQLAlchemy), MySQL, Alembic, Redis, JWT
- **Frontend:** TypeScript, React, MUI, Redux Toolkit
- **Hardware:** Raspberry Pi, camera, PIR, ultrasonic, servos, MQTT (Mosquitto)
- **Infra:** Docker, Caddy, supervisord