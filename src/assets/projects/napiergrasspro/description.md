## NapierGrassPro

**NapierGrassPro** is a Flutter application for **scanning potential Napier grass diseases** using an on-device AI model, built for farmers, agricultural technicians, and administrators. A companion FastAPI backend (napiergrasspro-api) handles users, scans, predictions, content, and analytics.

Napier grass is a key forage crop, but its early disease symptoms are easy to miss. The app puts a detection tool directly in the farmer's hands - in the field, where connectivity is often unreliable - while connecting them with technicians who can help and learn from the data.

### Roles & impact

The app has three role-based experiences:

- **Farmer** - detect diseases from the camera or uploaded media, work offline with cloud sync when back online, get treatment recommendations, chat with technicians and experts, explore a known-disease and treatment knowledge base with progress tracking, access learning materials, and view diagnosis history with mapping/monitoring.
- **Technician** - connect with farmers within their municipality jurisdiction, view farmer information and diagnosis/scan history, explore the disease/treatment knowledge base, view analytics for their jurisdiction, and access learning materials.
- **Admin** - full CRUD management of users, diseases, treatments, and learning materials, plus overall analytics dashboards.

### Architecture

- **Mobile app (Flutter)** - separated feature areas per role, with on-device AI inference, offline-first scan handling, and a queued sync flow. Cross-platform targets include Android, iOS, Web, Windows, macOS, and Linux.
- **Backend (FastAPI)** - organized by feature area (auth, diseases, treatments, materials, predictions, scans, users, posts, notifications, email, model management, and a WebSocket channel). Persists via Firestore with an internal AI-model wrapper and a model downloader. Includes Caddy + Docker Compose config for local/prod/shared deployment, a MeiliSearch integration for searchable collections, and Promtail/Loki/Grafana log and metrics config.
- **AI pipeline** - a Python model serving module behind the app's scan feature, with the disease-classification model and runtime download tooling.

### Feature tour

- **AI disease detection** - from camera or uploaded media, with quality-guard dialogs (blurry image, no-napiergrass, high-risk, label/location prompts) guiding the user to a valid scan
- **Offline-first scanning** - scans can be performed without connectivity and synced to the cloud later
- **Treatment recommendations** - based on the detected potential disease, with a searchable knowledge base and progress tracker
- **Expert chat & support forum** - farmers question technicians directly; a post feed and notifications keep the community engaged
- **Jurisdiction analytics** - technicians see analytics scoped to their municipality; admins see platform-wide stats
- **Mapping & monitoring** - location-aware scan records feed regional awareness
- **Admin content management** - CRUD for users, diseases, treatments, and learning materials (text and video cards)
- **Over-the-air model updates** - model management and reoccuring job for search indexing

### Tech stack

- **App:** Flutter, Dart (Riverpod/Provider-based state, offline queues)
- **Backend:** Python, FastAPI, Firestore (Firebase Admin), JWT auth, Docker + Caddy
- **Search:** MeiliSearch
- **ML:** TensorFlow Lite / served Python model for on-device inference
- **Observability:** Promtail + Loki + Grafana

### Context

Built for the agriculture sector (grassxpert) as a full production system: the API includes production deployment (Caddy + Docker), shared-host compose profiles, log collection, search indexing, and email/notification tooling - evidence of a production-minded full-stack build from app to infrastructure.
