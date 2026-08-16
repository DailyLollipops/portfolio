## Wifi Link

**Wifi Link** is an **IoT client and server system for WiFi vending machines** - syncing sales, machine events, and user data from coin-op WiFi machines to a central server for monitoring and management.

The problem it solves: coin-op WiFi vending machines ("WiFi drops") run in the field with no reliable central visibility. Each machine needs a dependable way to push sales and events to a central operator dashboard - and to keep a local queue when connectivity drops.

### Architectural overview

Two complementary repositories spanning a central management backend and the software that runs on each field machine.

Key components:

- **wifi-link (server)** - a central FastAPI + SQLModel backend with a React Admin dashboard, modeling machines, sales, events, customers, vouchers, timer rates, speed limits, users, notifications, and application settings under Alembic migrations. It exposes a WebSocket dashboard route for live updates and ships background workers for email and notifications, deployed via Docker Compose with Caddy reverse proxy and shared-host profiles.
- **wifi-link-client** - the IoT client that runs on the machines, packaged as a Python CLI with a full local SQLite database mirroring the server's entities. It reconciles local data with the remote API through an idempotent sync routine, offers both a machine-side sync agent and a local development dashboard, supports environment-configurable settings, and integrates with systemd so it stays running unattended. A scripted installer plus a QEMU-based image build workflow produce a custom Raspberry Pi OS for repeatable field deployment.

The client agents on field machines queue sales and events locally over SQLite, then push them to the server's sync API the moment connectivity returns - so a machine that goes offline still records and reports every event once it reconnects, and the operator dashboard reflects live machine activity over WebSocket.

### Feature tour

- **Reliable sync** - the client queues sales/events locally and syncs them to the server, resilient to connectivity loss
- **Sales, events, users, vouchers, rates** - full domain coverage of machine operations, including timed rate and speed-limit products for WiFi sessions
- **Dual entrypoints** - the client exposes both a machine-side sync agent and a standalone local web dashboard for development
- **Central operator dashboard** - React Admin view of machines, customers, sales trends, today's sales, top customers, data usage, and live connectivity
- **Custom Raspberry Pi image** - scripted install and a systemd service make field deployment repeatable; a QEMU-based build workflow was used to produce the image
- **WebSocket live updates** - dashboard clients receive machine events without polling
- **Environment-specific configuration** - dev/prod/shared profiles and a local WiFi machine API simulator

### Engineering & challenges

- Distributed sync correctness: the local client database mirrors server entities with the same model structure, using an idempotent sync API so duplicates never reach the server
- Field reliability: single-instance enforcement, reset flows, and a systemd service keep the agent running unattended on Raspberry Pi hardware
- Building a custom OS image for field deployment required a scripted install + QEMU verification workflow instead of manual SD-card setup

### Tech stack

- **Server:** FastAPI, SQLModel, MySQL, Alembic, Redis, React Admin, Docker, Caddy
- **Client:** Python (uv-packaged CLI), SQLite, Pydantic settings, systemd
- **Hardware:** Raspberry Pi (custom OS image), WiFi vending/coin-op machines
- **Deployment tooling:** Vagrant + QEMU image workflow, GitHub Actions installer sync