## RaspiDevKit

**RaspiDevKit** is a Python library designed to simplify interfacing with sensors and devices on **Raspberry Pi** and **Arduino** platforms.

It provides an easy-to-use programming interface, making hardware projects more accessible and reducing development time. Instead of wrangling GPIO pins, serial protocols, and per-sensor quirks, developers interact with hardware through simple Python commands - and can even **auto-generate and upload Arduino code** from Python.

### Context & target users

Built to lower the barrier into physical computing. It's aimed at:

- Hobbyists and makers working with Raspberry Pi or Arduino
- Educators teaching electronics and programming
- Developers prototyping IoT and embedded projects

It is published on PyPI and documented on ReadTheDocs, making it usable as a normal `pip install` dependency.

### Feature tour

- **Easy integration** with Raspberry Pi and Arduino hardware through one consistent Python API
- **Support for multiple sensors and devices** behind simple, high-level commands
- **Automatic Arduino code generation** - declare a device and get the Arduino firmware produced for you
- **Direct Arduino uploads** using `arduino-cli`, so flashing is a single command
- **Streamlined control of connected devices** for prototyping and lab use
- **Published distribution** - available via PyPI (`pip install raspidevkit`) with full docs on ReadTheDocs

### Engineering notes

- Clean separation between the Python-facing API and the Arduino code-generation path keeps user code simple while the library handles the protocol/compilation details
- Following build reproducibility, the project ships both `setuptools` and `pyproject.toml` (pip-tools/pip-compile) build paths

### Tech stack

- **Language:** Python
- **Hardware:** Raspberry Pi, Arduino
- **Tooling:** arduino-cli, setuptools / pyproject
- **Distribution:** PyPI, ReadTheDocs

### Links

- **PyPI:** [raspidevkit](https://pypi.org/project/raspidevkit/)
- **Documentation:** [raspidevkit.readthedocs.io](https://raspidevkit.readthedocs.io/en/latest/)
- **Source:** [github.com/raspidevkit/raspidevkit](https://github.com/raspidevkit/raspidevkit)
