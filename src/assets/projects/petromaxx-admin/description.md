## Petromaxx Admin

**Petromaxx Admin** is a **gas-station management platform** handling branches, fuel products, pump machines, underground storage manholes, price changes, sales, and audits - with distinct dashboards per role.

### Context

Running a retail fuel network means tracking more than just gross sales: product prices change frequently, tanks (manholes) get refilled, pumps are serviced, and every inventory movement needs an audit trail. Petromaxx Admin models that domain explicitly and gives each role (admin, owner, sales admin, inventory admin, pump attendant) a purpose-built dashboard.

### Architectural overview

A FastAPI backend with a React Admin frontend around an explicit fuel-retail data model:

- **Backend** - FastAPI + SQLModel + Alembic. Rich domain entities: branch, machine (pump), manhole (storage tank), the machine-manhole link that ties each pump to a tank, product, price log, audit, user, plus notifications and application settings. Routes per resource plus reports; price logging and audit trails (with proof uploads) capture who did what, when. Dockerized with Caddy.
- **Frontend** - React Admin + MUI SPA. Resource pages (branches, machines, manholes, products, audits, users) with custom cards and dialogs, plus five per-role dashboards: admin, owner, sales admin, inventory admin, and pump attendant (with a sales-entry dialog, product carousel, branch info, and temp-expenses entry). Includes a report-generation dialog for branch sales/refills, individual sales, and manhole status, plus internationalization and PHP-style geodata inputs (province/municipality/barangay).

Data flows from the pump/refill activity recorded in the backend into per-role dashboards: a pump attendant records sales against a machine, the machine-manhole link lets inventory math (reserves, refills, wastage) derive per branch, and every price change or audit event is captured as history the admin and owner screens surfaces.

### Feature tour

- **Branch management** - branches with machines and manholes attached (card-driven UI with add/edit dialogs)
- **Fuel product management** - products with uploads of product imagery and price logging on change
- **Pump machines** - machine inventory with product assignment and per-machine controls
- **Manholes & refills** - storage tanks tracked per branch, with refill dialog and reserves reporting
- **Role-based dashboards** - admin, owner, sales admin, inventory admin, and pump-attendant views, each scoped to what that role needs
- **Audit & proof** - audits with verified status and uploaded proof files build an inspection trail
- **Sales & wastage analytics** - total sales, total dispensed, total expenses, total wastage, reserves, year-over-year charts, top sellers, sales by branch/product
- **Report generation** - dialogs for branch refills, branch/individual sales, and manhole status reports

### Engineering & challenges

- A machine-manhole link lets a pump draw from a specific tank, making inventory math (reserves, refills, wastage) derivable per machine-branch
- Price logs as a mutable-history table rather than overwriting product price keeps every change auditable
- Five distinct role dashboards share card components (sales, reserves, users-by-role) but compose them differently per role to keep each screen scoped

### Tech stack

- **Backend:** Python, FastAPI, SQLModel, MySQL, Alembic, Docker, Caddy
- **Frontend:** React, React Admin, MUI, Vite, i18n