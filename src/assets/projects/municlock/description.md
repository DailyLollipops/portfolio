## Municlock

**Duration:** July 2023 – August 2023

**Municlock** is a Windows desktop application developed for the **Local Government Unit of Boac, Marinduque, Philippines** - produced during the first role as a Programmer right after graduation.

The project was created to replace the municipality's existing DTR (Daily Time Record) system, addressing recurring problems such as frequent import errors and unreliable report generation. It introduces an intuitive, themable user interface and adds capabilities the legacy system lacked, including the ability to import records directly from existing biometric devices.

### Architectural overview

A Python desktop application with a **Tkinter GUI** and a **MySQL backend**, shipped via **PyInstaller**.

Key components:

- **Biometric Integration** - Imports attendance data from biometric devices.
- **Database Layer** - Manages MySQL database connections, queries, and persistence.
- **DTR Processing** - Handles attendance computation, work schedules, time calculations, and report generation.
- **Theming System** - Provides a consistent and customizable user interface appearance.
- **Report Generation** - Produces attendance and DTR reports in PDF and XLSX formats, with configurable templates, fonts, and formatting.
- **Remote Import Service** - Supports importing attendance data remotely from biometric devices through a configurable server component.

The application is designed to integrate biometric attendance data, process it according to configurable schedules and rules, persist the resulting records in MySQL, and generate formatted DTR reports for administrative use.

### Feature tour

- **Authenticated and guest sessions** - users can log in or continue as a guest
- **Role-based permissions** - access to features is controlled per role
- **Employee record management** - maintain the employee roster
- **Dynamic schedule handling** - employee schedules can change over time without breaking reports
- **Automatic late-minute calculation** - minutes late are computed across a selected date range
- **Direct biometric import** - DTR records pulled straight from biometric devices, plus text-file exports from common biometric systems
- **Dynamic DTR report generation** - filter by date range, office, and signatory; output to PDF or Excel
- **Job order & regularization** - templates for job-order and regular employee reporting are included

### Engineering & challenges

- Replacing a legacy system means carrying real, years-old data with inconsistent formats - the biometric import path had to tolerate many device export variations
- Report correctness matters to municipal HR/accounting, so late-minute math and timezone-less time handling had to be rigorously verified against a date-range model
- Packaging for non-technical office staff required a clean PyInstaller build with embedded templates and assets

### Tech stack

- **Desktop application:** Python, Tkinter
- **Database:** MySQL
- **Deployment:** PyInstaller (Windows executable)
