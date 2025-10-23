# Portfolio

A personal portfolio site built with React, TypeScript and MUI. The project uses Vite for development and bundling, and loads project descriptions from local Markdown files.

## Requirements

- Node.js 18+ (recommended)
- npm

## Setup (local)

1. Install dependencies:

```sh
npm install
```

2. Create your environment file

Copy the sample env file and fill in the values (EmailJS keys are required for the contact form):

Unix / macOS / WSL:

```sh
cp .env.sample .env
```

Windows (PowerShell):

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

## Available scripts

- npm run dev — start Vite dev server (hot reload)
- npm run build — produce a production build (runs TypeScript build then vite build)
- npm run preview — preview the production build locally
- npm run lint — run ESLint

See [package.json](package.json) for details.

## Notes

- Markdown project descriptions are imported as raw strings (e.g. `description.md?raw`) and the project declares `*.md` in [src/types/global.d.ts](src/types/global.d.ts) so TypeScript accepts those imports.
- Vite is configured to include markdown assets in [vite.config.ts](vite.config.ts).
- Theme configuration is in [src/theme/theme.ts](src/theme/theme.ts) and the app is bootstrapped in [src/main.tsx](src/main.tsx).

## Building for production

```sh
npm run build
npm run preview
```

## Troubleshooting

- If TypeScript / Vite complains about importing `.md` files, confirm [src/types/global.d.ts](src/types/global.d.ts) exists and is included by the tsconfig (project already includes `src` in tsconfig.app.json).
- If contact emails fail to send, double-check the EmailJS keys in `.env`.

## License

Personal project — modify as needed.
