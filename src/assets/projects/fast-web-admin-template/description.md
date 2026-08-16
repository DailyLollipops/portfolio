## FastWeb Admin Template

**FastWeb Admin Template** is a production-ready **full-stack web application template** bundling a **FastAPI** backend with a **React Admin** frontend. It's the foundation that several later dashboards (DOLE Pulse, Petromaxx Admin, Wifi Link server) were built on, and it's public so it can be reused for any new admin project.

### Context

Building admin dashboards over and over means re-solving the same problems: auth, migrations, emails, workers, deployment, HTTPS. FastWeb packages those solved problems into a bootstrap-able template - one command generates a complete, runnable project, so a new dashboard starts at "feature building" instead of "wiring."

### Architectural overview

A Docker Compose-based monorepo with a FastAPI backend and a React Admin SPA, plus deployment and tooling layers:

- **Backend** - FastAPI with a layered structure: SQLModel entities (user, role access control, notification, template, application setting), Alembic migrations, routes grouped by resource, auth strategies (native, Google, TFA), email templates for verification/reset/TFA, a background worker (cron + queue) for email and notification tasks, superuser seeding, and a tracing middleware.
- **Frontend** - React Admin + MUI SPA with an auth provider, data provider, role-based access, and theming.
- **Infra** - Docker Compose dev/prod/shared/testing profiles, a Caddy reverse proxy with automatic HTTPS, Ansible provisioning, a GCP Docker install script, and Jaeger tracing.
- **Tooling** - a code-generation CLI that scaffolds model routes, factories, and CRUD endpoints with per-operation auth flags, and a bootstrap flow that generates an env, compose file, and project skeleton for a new app name.

The frontend talks to the backend over REST via a single data provider; the backend enforces role-based access on every route and uses a worker queue for email flows, while the codegen CLI keeps new resources consistent with the hand-written core. Infra files weave it all together for dev, prod, shared hosting, and testing environments.

### Feature tour

- **Bootstrap-able project** - one command generates an env, compose file, and project skeleton for a new app name
- **Full auth suite** - login (native), Google OAuth, email verification, password reset, and **TFA** flows, with email templates included
- **Role-based access control** - permissions and role access control routes drive UI/API authorization
- **CRUD codegen** - generate model → routes → factories with login-required flags per operation
- **Background workers** - queued/cron email and notification tasks (email verification, reset, TFA delivery)
- **Database migrations** - Alembic autogenerate with superuser seeding
- **Observability** - Jaeger distributed tracing middleware configured out of the box
- **Deployment-ready** - Ansible playbook, Caddy automatic HTTPS, Docker compose profiles for dev/prod/shared/testing

### Engineering & challenges

- The template had to be _bootstrappable_, which meant keeping path/container names dynamic and generating compose + env files at setup time rather than hardcoding them
- Jinja2 templating drives codegen so generated output stays consistent with the hand-written core
- Multiple environments (dev/prod/shared/testing) each need distinct networking, certs, and ports - captured in compose profiles and Caddy configuration

### Tech stack

- **Backend:** Python, FastAPI, SQLModel, MySQL, Alembic, uvicorn, worker (cron/queue)
- **Frontend:** React, React Admin, MUI, Vite
- **Infra:** Docker Compose, Caddy, Ansible, Jaeger, uv

### Links

- **Source:** [github.com/DailyLollipops/fast-web-admin-template](https://github.com/DailyLollipops/fast-web-admin-template)