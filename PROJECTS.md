## Adding new project

Project descriptions are stored as local Markdown files and imported as raw strings (e.g. `description.md?raw`).

To add a new project:

1. Create a folder for the project (example path):

   - src/projects/project-slug/

2. Place images and description markdown content inside the folder.

   ```markdown
   src/
   ├── projects/
   │ ├── project-slug/
   │ │ ├── description.md
   │ │ ├── 1.png
   │ │ └── 2.png
   ```

3. Use this template for the Markdown content:

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

4. Import the description where you build the projects list:

   ```ts
   // src/sections/Projects.tsx
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

5. Ensure TypeScript accepts `.md` imports (project includes src/types/global.d.ts). If you keep a central projects array (e.g. `src/data/projects.ts`), add the new project's metadata there and reference the imported description.

Notes:

- Keep images referenced relative to the Markdown file or move them to the public/static folder and reference absolute paths.
- Use concise headings and bullet lists so the UI renders predictably.
