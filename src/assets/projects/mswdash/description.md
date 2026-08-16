## MSWDash

**MSWDash** is a web-based application that enhances **MSWDO (Municipal Social Welfare and Development Office) initiatives in disaster relief and poverty alleviation** in Torrijos, Marinduque.

### Context

A municipal social-welfare office runs multiple programs (disaster relief, poverty alleviation) with limited staff and paperwork-heavy processes: applications, beneficiary validation, barangay referrals, budgets, and releases. MSWDash digitizes that workflow end-to-end - application intake through interview, approval, budget/balance tracking, document handling, and fund release - so officers spend time on people instead of re-filing documents.

### Architectural overview

Two-part monorepo pairing an API backend with a rich web dashboard:

- **API** - FastAPI + SQLModel with Alembic migrations. Domain entities cover applications, beneficiaries, barangay-linked applications and documents, documents, balances with immutable history, per-category budgets, notifications, settings, and users (with barangay role toggles). Routes are grouped by resource; background processors handle notification dispatch and PDF generation, and application forms render via a Jinja2 PDF template with a signature field.
- **Web** - React + MUI dashboard (TypeScript). A rich component library: application cards with multi-step wizards, approval/rejection/interview/release modals, schedule calendar with time pickers, balance/budget cards, PDF viewer, notifications, and signature management, plus auth context, protected/unprotected routes, theme and toast contexts, and a data-fetching layer.

Applications enter through the multi-step wizard, move through interview scheduling and approval/rejection with remarks, and can be released with fund tracking - each transition persisted by the API. Balances update only via recorded transactions (never direct overwrite), and official PDFs with signatures are generated server-side and viewed in-app.

### Feature tour

- **Application lifecycle** - step-by-step application intake (multiple steps), interview scheduling, approval/rejection with remarks, and fund release with release-date tracking
- **Barangay workflow** - barangay-level applications, approvals, document uploads, and per-barangay role toggles
- **Budget & balance tracking** - per-category budgets, balances with history, and balance sources for transparent fund management
- **PDF documents** - application forms generated as PDFs (Jinja2 template with signature), document management, and PDF viewing in-app
- **Scheduling** - interview and schedule calendar with time pickers
- **Notifications** - in-app notifications with seen tracking
- **Role-based access** - admin, officer, staff, user, and barangay roles
- **Dockerized deployment** - FastAPI + React behind a Caddy reverse proxy, dev/prod profiles

### Engineering & challenges

- Welfare workflows have many state transitions (apply → interview → approve → release); a modal/router structure plus per-step wizards keeps the flow guided without sprawling pages
- Fund integrity demanded immutable balance history - balances update only via recorded transactions, never by direct overwrite
- Generating official PDFs (with signature and barangay titles) required a Jinja2 layout that matches the office's paper forms

### Tech stack

- **Backend:** Python, FastAPI, SQLModel, MySQL, Alembic, Jinja2 (PDF), background processors, Docker, Caddy
- **Frontend:** TypeScript, React, MUI, Vite