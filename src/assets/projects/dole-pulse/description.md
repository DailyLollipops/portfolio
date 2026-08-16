## DOLE Pulse

**DOLE Pulse** is a **Client Satisfaction Measurement (CSM) platform** for the Department of Labor and Employment, powered by a FastAPI backend and a React Admin frontend. It replaces paper feedback forms with a structured digital survey, analysis, and reporting workflow.

### Context

Government service offices are required to measure client satisfaction. Historically that meant physical forms, manual tallying, and slow reports. DOLE Pulse digitizes the whole loop: admins generate survey codes, clients answer smiley-scale questions per service, and dashboards + DOCX reports are produced automatically from the responses.

### Architectural overview

A FastAPI backend, a React Admin frontend, and an automated reporting path:

- **Backend** - FastAPI + SQLModel with Alembic migrations. Models cover users, services, dynamic questions, CSM responses, survey codes, and notifications, with routes grouped by resource plus a reports endpoint. An analysis module computes satisfaction statistics from responses; email verification and notification utilities round out the service layer. Dockerized with Caddy.
- **Frontend** - React Admin + MUI SPA. Pages include a survey form (smiley questions), dashboard with charts (age distribution, gender statistics, satisfaction rate, service-quality dimensions, total respondents, client sentiments, service category feedback), analytics page, CSM response lists, survey-code generation, and a report-generation dialog. Login, verify-email, and maintenance pages included.
- **Reports** - report generation produces a DOCX from a Jinja2 template, with analyzer-computed stats.

Admins generate survey codes that clients use to fill a smiley-scale form per service; responses persist through the API, the analysis module turns them into satisfaction metrics, and both the live dashboards and the generated DOCX reports draw from the same computed statistics so the numbers always agree.

### Feature tour

- **Dynamic survey builder** - services and questions are configurable per deployment; the survey form adapts to them
- **Survey codes** - admins generate unique codes, tying each response to a specific survey campaign
- **Smiley-scale CSM** - smiley questions capture satisfaction consistently
- **Analytics dashboards** - satisfaction rate, service-quality dimensions, age/gender distribution, total respondents, client sentiments, responses by service, and service-category feedback
- **Report generation** - one-click DOCX reports with analyzer-computed statistics
- **Email verification** - verified accounts required for full access (with maintenance/verify pages)
- **Role-based access** - React Admin auth + permissions gate admin vs. staff workflows

### Engineering & challenges

- Keeping questions _dynamic_ (rather than hardcoded) meant modeling them as data and building a survey UI that renders any question set - a small schema-driven form engine
- CSM analytics span many dimensions (age, gender, service, sentiment, category); an analysis module centralizes those computations so dashboards and reports stay consistent
- Generating a properly-formatted DOCX report from Jinja2 required a template that survives mail merge without breaking formatting

### Tech stack

- **Backend:** Python, FastAPI, SQLModel, MySQL, Alembic, Jinja2 (DOCX reports), Docker, Caddy
- **Frontend:** React, React Admin, MUI, Recharts, Vite