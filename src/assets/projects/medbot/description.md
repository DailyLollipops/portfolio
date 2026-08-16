## Medbot

**Duration:** July 2022 – December 2022

**Medbot** is an integrated health-monitoring device and web application designed to provide users and doctors with an efficient and accessible way to track vital health metrics. It was developed as part of a college thesis study.

The system combines a **Raspberry Pi-driven medical device** with an **Arduino companion module** and a **Laravel web dashboard**, forming an end-to-end health monitoring product aimed at making vital-sign tracking usable for everyone - including visually impaired users.

### Architectural overview

The project is split into two repositories:

- **medbot-pro** - the device software (Python) running on a Raspberry Pi 4B, paired with an Arduino companion module that handles sensor/I2C interaction. Modules are separated by concern (i.e. blood-pressure sensor, MAX30102 pulse oximetry, MySQL persistence, user/authentication logic, GUI, and config). The device connects to a MySQL database shared with the web app.
- **medbot** - the Laravel web application (controllers, models, and migrations for readings) serving users and doctors a dashboard for viewing stored readings, reporting, and account management.

### Feature tour

- **Simultaneous monitoring of vital signs** - pulse rate and blood pressure tracked together (MAX30102 pulse/BP module), with readings persisted to a shared MySQL database
- **Automatic sanitization & receipt generation** - the device sanitizes between uses and prints a receipt (python-printer-ECSPOS) with the day's readings
- **Touchscreen GUI with voice prompts** - a Tkinter-based interface with text-to-speech (espeak) guidance
- **Voice command control** - SpeechRecognition + PyAudio for hands-free operation
- **Accessibility for visually impaired users** - voice prompts, large touch targets, and multilingual UI option
- **QR-code authentication** - device login via the pyzbar scanner against user records
- **Web dashboard for users and doctors** - Laravel app with user management and reading history retrieval
- **Wi-Fi/Bluetooth connectivity** - bleak (Bluetooth LE) support plus network database sync

### Engineering & challenges

- I2C and legacy camera configuration on Raspberry Pi OS required explicit enablement
- Bridging real biosignals into a reliable read loop means handling sensor quirks (MAX30102) while keeping the GUI responsive, so sensor/database/GUI concerns are isolated into separate modules
- Coupling two runtimes (Pi + Arduino) and two stacks (Python + Laravel) around one MySQL database required a shared user/reading schema

### Tech stack

- **Hardware:** Raspberry Pi 4B, Arduino, MAX30102 pulse/BP module, Bluetooth (bleak)
- **Device software:** Python (Tkinter GUI, SpeechRecognition, espeak, QR/pyzbar, pycryptodome, python-printer-ECSPOS, mysql-connector)
- **Web application:** Laravel (PHP), Blade views
- **Database:** MySQL (shared between device and web app)

### Related

The [Medbot](https://github.com/DailyLollipops/medbot) web application lives alongside the [medbot-pro](https://github.com/DailyLollipops/medbot-pro) device code as a two-part system.
