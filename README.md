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

Portfolio content (profile, projects, experience, education, skills, resume) is managed in `src/assets/data.ts` (typed by `src/types/custom.ts`).

- Profile fields: `name`, `login`, `heroTagline`, `projectTagline`, `location`, `email`, `phone`, `blog`, `githubLink`, `linkedInLink`, `resumeLink`, `tags` (sidebar skills).
- Lists: `projects`, `experiences`, `education`, `certifications`.
- Section tabs: `src/lib/sections.ts` (`sectionTabs` + `SectionTabId`), rendered by `src/components/SectionTabs.tsx` in both `src/pages/HomePage.tsx` and `src/pages/ProjectPage.tsx`.

You can easily add or update projects using Markdown and TypeScript objects.

### ➕ Adding new project

1. **Create a folder for your project.**

   ```text
   src/
   └── assets/
       └── projects/
           └── project-slug/
               ├── 1.png
               ├── 2.png
               ├── description.md
               └── index.ts
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
   // src/assets/projects/project-slug/index.ts
   import type { Project } from "@/types/custom";
   import screenshot from "./1.png";
   import descriptionMd from "./description.md?raw";

   export const project: Project = {
     title: "Project Slug",
     shortDesription: "Sample short description",
     descriptionMd,
     tags: ["Python", "React", "MySQL"],
     images: [screenshot],
     links: ["https://github.com/your-name/repository"],
     category: "Web", // "Web" | "Mobile" | "IoT" | "Desktop" | "Tools"
   };

   export default project;
   ```

   Notes:

   - `descriptionMd` uses the `?raw` import (Markdown is inlined as text via `assetsInclude: ["**/*.md"]` in `vite.config.ts`).
   - `tags` must be valid keys from `src/components/Tags.tsx` (`Tag = keyof typeof tags`).
   - `category` is required.

4. **Register the project**

   ```ts
   // src/assets/data.ts
   import { project as projectSlug } from "@/assets/projects/project-slug";

   // ... other imports
   export const portfolio: PortfolioData = {
     name: "Your Name",
     login: "your-username",
     profilePic: profilePic,
     heroTagline: "Your hero tag line",
     projectTagline: "Your project tag line",
     location: "Your City, Country",
     email: "you@example.com",
     phone: "09123456789",
     blog: "https://github.com/your-username",
     tags: ["Python", "React", "TypeScript"],
     githubLink: "https://github.com/your-username",
     linkedInLink: "https://linkedin.com/in/your-username",
     resumeLink: `${import.meta.env.BASE_URL}resume.pdf`,
     projects: [projectSlug], // Add project here
     experiences: experiences,
     education: education,
     certifications: certifications,
   };
   ```

Notes:

- Keep images referenced relative to the Markdown file or move them to the public/static folder and reference absolute paths.
- Use concise headings and bullet lists so the UI renders predictably.

### 🧰 Adding work experience, education & skills

Work experience, education, and certifications live in `src/assets/data.ts` and render in `src/sections/WorkExperience.tsx` and `src/sections/Education.tsx`.

```ts
import type { Experience, Education } from "@/types/custom";

export const experiences: Experience[] = [
  {
    role: "Mid Python Developer",
    company: "Example Inc. - City",
    period: "Sep 2023 - Present",
    description: "What you built and the impact.",
    tags: ["Python", "Docker", "AWS"], // valid Tag keys only
  },
];

export const education = [
  {
    school: "Example College",
    degree: "BS Computer Engineering",
    period: "2023",
  },
];

export const certifications = ["Google Data Analytics - Coursera (2023)"];
```

- `Experience = { role, company, period, description, tags: Tag[] }` (`src/types/custom.ts`).
- `Education = { school, degree, period }`.
- Sidebar skills come from `portfolio.tags` - use valid `Tag` keys from `src/components/Tags.tsx`.

### 📄 Replacing the resume

1. Replace `public/resume.pdf` with the new file (keep the same filename).
2. No code change needed - `resumeLink` is `${import.meta.env.BASE_URL}resume.pdf`, so it works locally and under the `/portfolio/` base path.
3. It is linked from the sidebar (`View Resume` in `src/components/ProfileSidebar.tsx`) and the Experience header (`Resume` button in `src/sections/WorkExperience.tsx`).
4. Rebuild to verify: `npm run build` copies `public/resume.pdf` to `dist/resume.pdf`.

### 🧭 Sections & tabs

Top-level sections are `overview`, `projects`, `experience`, `education`, `contact`:

- IDs live in `src/sections/*` (`id="overview"`, `id="projects"`, `id="experience"`, `id="education"`, `id="contact"`).
- Tab definitions live in `src/lib/sections.ts` (`sectionTabs`, `SectionTabId`).
- Both pages render the shared `src/components/SectionTabs.tsx`. To add a section, add its ID to `sectionTabs`, add the section component with a matching `id`, and render it in `src/pages/HomePage.tsx`.

---

## 🏗️ Building for production

```sh
npm run build
npm run preview
```

Note: `vite.config.ts` sets `base: "/portfolio/"` for GitHub Pages, so built asset URLs are served under `/portfolio/`.

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
