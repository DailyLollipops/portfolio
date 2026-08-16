# Portfolio

A personal portfolio site built with React, TypeScript and MUI. The project uses Vite for development and bundling, and loads project descriptions from local Markdown files.

---

## 🧩 Requirements

- **Node.js** 18+ (recommended)
- **npm**

---

## ⚙️ Local Setup

1. **Install dependencies**

   ```sh
   npm install
   ```

2. **Create your environment file**

   Copy the sample env file and fill in the values (EmailJS keys are required for the contact form):

   **Unix / macOS / WSL:**

   ```sh
   cp .env.sample .env
   ```

   **Windows (PowerShell):**

   ```ps
   Copy-Item .env.sample .env
   ```

   Edit `.env` and set:

   - VITE_EMAILJS_SERVICE_ID
   - VITE_EMAILJS_TEMPLATE_ID
   - VITE_EMAILJS_PUBLIC_KEY

   See [.env.sample](.env.sample).

   Note: Vite exposes env vars prefixed with `VITE_` to the client. The contact form uses those values in [src/sections/Contact.tsx](src/sections/Contact.tsx).

3. Run the dev server:

   ```sh
   npm run dev
   ```

   Open the URL from the terminal (usually http://localhost:5173).

---

## 🧠 Updating portfolio contents

Portfolio content (projects, experiences, etc.) is managed in `src/assets/data.ts`.

You can easily add or update projects using Markdown and TypeScript objects.

### ➕ Adding new project

1. **Create a folder for your project.**

   ```markdown
   src/
   ├── projects/
   │ ├── project-slug/
   │ │ ├── 1.png
   │ │ ├── 2.png
   │ │ ├── description.md
   │ │ └── index.ts
   ```

2. **Write the Markdown description**

   ```markdown
   ## Project Title

   Short summary (1-2 sentences).

   ### 🔗 Links

   - **Live:** https://example.com
   - **Documentation:** https://github.com/yourname/repo

   ### 🚀 Features

   - Feature A
   - Feature B
   - Feature C

   ### 🏗️ Tech Stack

   - React
   - TypeScript
   - MUI
   - Vite
   ```

3. **Create a TypeScript entry file**

   ```ts
   // src/projects/project-slug/index.ts
   import image from "../assets/projects/project-slug/image.png";
   import description from "../assets/projects/project-slug/description.md?raw";

   const projects: Project[] = [
     {
       title: "Project Slug",
       shortDesription: "Sample short description",
       descriptionMd: description,
       tags: ["Python", "RaspberryPi", "Arduino", "Laravel", "MySQL"],
       images: [image],
       links: ["https://github.com/your-name/respository"],
     },
   ];
   ```

4. **Register the project**

   ```ts
   // src/assets/data.ts
   import { project as projectSlug } from "@/assets/projects/project-slug";

   // ... other codes
   export const portfolio: PortfolioData = {
     name: "Your Name",
     profilePic: profilePic,
     heroTagline: "Your hero tag line",
     projectTagline: "Your project tag line",
     mainTags: ["React", "TypeScript", "MUI"],
     githubLink: "https://github.com/your-username",
     linkedInLink: "https://linkedin.com/in/your-username",
     projects: [projectSlug], // Add project here
     experiences: experiences,
   };
   ```

Notes:

- Keep images referenced relative to the Markdown file or move them to the public/static folder and reference absolute paths.
- Use concise headings and bullet lists so the UI renders predictably.

### 🧰 Adding new work experience

Work experience entries are also defined in `src/assets/data.ts` (or wherever your experience data resides).
Follow the same structure and typing conventions used by existing entries.

---

## 🏗️ Building for production

```sh
npm run build
npm run preview
```

## License

Personal project - modify as needed.

---

## 📊 GitHub stats (auto-refresh)

The profile stats, contribution calendar and top languages live in `src/assets/github-stats.ts`. This file is generated from the GitHub API, not edited by hand.

### How it works

- A GitHub Actions workflow (`.github/workflows/update-github-stats.yml`) runs **daily at 00:00 UTC** (and on every push / manual `workflow_dispatch`).
- It runs `scripts/update-github-stats.mjs`, which:
  - fetches your profile + contribution calendar via the GraphQL API (this already includes contributions made in organizations),
  - paginates all repos you own **and** repos in organizations you belong to, aggregating their language bytes (so org work shows up in the top-languages chart and repo/stars counts),
  - regenerates `src/assets/github-stats.ts`.
- If the file changed it is committed and pushed, which triggers the Pages deploy so the site stays fresh.

### One-time setup: PAT secret

The workflow needs a GitHub token to read **private** repos and private contributions. The built-in `GITHUB_TOKEN` is scoped to this repository only, so create a **classic Personal Access Token**:

1. Go to https://github.com/settings/tokens and click **Generate new token (classic)**.
2. Give it the `repo` scope (it can be repo-scoped; no admin scopes needed).
3. Copy the token and add it as a repository secret named `GH_PAT`
   (repo **Settings → Secrets and variables → Actions → New repository secret**).

Without `GH_PAT`, the workflow still runs but only shows public data.

### Refreshing locally

```sh
npm run update:stats
```

The script uses `GH_PAT`/`GITHUB_TOKEN` if set, otherwise falls back to your `gh` CLI login. Run `gh auth login` first if you haven't. A GitHub token is required because the contribution calendar (including private contributions) is not available to anonymous requests.
