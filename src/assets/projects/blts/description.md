## Barangay Legislative Tracking System (BLTS)

**Duration:** April 2023 – June 2023

**BLTS** is an offline web platform developed for the **Provincial Office of the Department of the Interior and Local Government (DILG) in Marinduque, Philippines** as part of an internship project.

The goal of the project is to give barangay officials a system to manage legislative documents efficiently, making it easy to retrieve files when needed - for example during assessments, official reviews, and compliance checks.

### Architectural overview

A Laravel MVC app (PHP) backed by MySQL, organized around document lifecycle management:

- **Database migrations** define users, documents, authors, and terms, with soft-delete/restore flows
- A companion repo, **BLTS-Installer**, bundles a PyInstaller-based installer + migration tool so the system can be deployed to barangay machines without manual configuration, complete with branding assets and a packaged BLTS zip

### Feature tour

- **Multi-role authentication** - barangay official and barangay secretary accounts
- **Document management** - upload, edit metadata, browse, search, delete (with restore) and renew records
- **PDF handling** - upload and manage PDF files for legislative records
- **Report generation** - generate reports needed for official assessments and reviews
- **Offline-first design** - built for poor-internet areas; deployed locally with Laragon
- **One-click installation** - the separate installer handles setup and migration for non-technical users

### Engineering & challenges

- Designed for the realities of barangay offices: low internet connectivity dictated an offline-first, locally-deployed architecture
- Building a non-technical-friendly deployment path required producing a separate Windows installer that configures Laravel and migrates the database automatically
- PDF-heavy record keeping (legislative documents) drove the upload/download/renew/restore lifecycle design

### Tech stack

- **Frontend:** Laravel, Tailwind CSS, JavaScript
- **Backend:** Laravel (PHP), MySQL
- **Deployment:** Laragon (web), PyInstaller (installer)

### Related

- [BLTS](https://github.com/DailyLollipops/BLTS) - the web platform
- [BLTS-Installer](https://github.com/DailyLollipops/BLTS-Installer) - installer & migration tool
