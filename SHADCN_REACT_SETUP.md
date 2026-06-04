# shadcn React Setup Notes

This repository is currently a static HTML/CSS/JavaScript app. The requested
`components/ui/sign-in-flo.tsx` component has been added in the default shadcn
component path, but it will not compile until the project is converted to a
React + TypeScript + Tailwind setup.

## Current Status

- Components path: `components/ui`
- Styles path: currently `styles.css`; shadcn/Tailwind projects commonly use
  `app/globals.css` for Next.js or `src/index.css` for Vite.
- Missing React project files: `package.json`, `tsconfig.json`, `tailwind.config.*`,
  `postcss.config.*`, and `components.json`.

The `components/ui` folder matters because shadcn and most generated component
imports assume `@/components/ui/...`. Keeping that path avoids alias and import
drift as more UI components are added.

## Create a New shadcn Project

For Next.js:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir
npx shadcn@latest init
npm install lucide-react
```

For Vite:

```bash
npm create vite@latest . -- --template react-ts
npm install
npm install -D tailwindcss @tailwindcss/vite
npm install lucide-react
npx shadcn@latest init
```

After setup, render the demo from `demo.tsx` or import the component directly:

```tsx
import { Component } from "@/components/ui/sign-in-flo";

export default function Page() {
  return <Component />;
}
```
