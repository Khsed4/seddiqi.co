<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-agent-rules -->

# Project Coding Rules For AI Agents

## Core Workflow

- Before changing code, inspect the relevant files and understand the existing structure.
- This project uses Next.js 16, React 19, TypeScript, Tailwind CSS 4, and the App Router under `src/app`.
- Read the relevant local Next.js guide in `node_modules/next/dist/docs/` before using or changing framework APIs, routing conventions, metadata, layouts, server/client components, images, fonts, or config.
- Preserve the generated Next.js agent-rules block above. Do not remove or rewrite it.
- Keep changes focused on the requested task. Do not perform unrelated refactors, dependency upgrades, formatting churn, or design rewrites.

## Next.js And React Rules

- Use App Router conventions. Place routes, layouts, metadata, loading, and error UI under `src/app` using current Next.js file conventions.
- Prefer Server Components by default.
- Add `"use client"` only when a component needs React state, effects, event handlers, refs, browser-only APIs, or client hooks.
- Do not make Client Components async.
- Keep server-only logic out of Client Components.
- For route props, params, search params, layout props, metadata, and navigation behavior, follow the local Next.js 16 docs instead of older assumptions.
- Use `next/image`, `next/font`, `next/link`, and metadata APIs according to the current docs when they fit the task.
- Do not introduce Pages Router patterns unless explicitly requested.

## TypeScript Rules

- Keep TypeScript strict and avoid `any`.
- Prefer explicit, narrow types for component props and shared data.
- Use the existing `@/*` path alias for imports from `src`.
- Do not silence TypeScript or ESLint errors unless there is a documented, task-specific reason.
- Keep data structures simple and readable. Add abstractions only when they reduce real duplication or clarify boundaries.

## Styling And UI Rules

- Use Tailwind CSS utilities and the theme variables in `src/app/globals.css`.
- Keep responsive behavior intentional for mobile, tablet, and desktop.
- Build accessible UI: semantic HTML, useful alt text, keyboard-friendly controls, visible focus states, and sufficient contrast.
- Avoid text overlap, layout shift, and viewport-width font scaling.
- For portfolio work, prioritize clarity, performance, and polished presentation over decorative complexity.
- Do not add large UI libraries unless the task clearly requires them.

## Performance And Maintainability

- Keep components small and purpose-driven.
- Avoid unnecessary client-side JavaScript.
- Avoid unnecessary dependencies, global state, runtime fetching, and heavyweight animations.
- Prefer static content and Server Components for portfolio sections when possible.
- Keep images optimized and sized deliberately.
- Do not duplicate large blocks of markup or data; extract small local components or arrays when it improves readability.

## Safety And Collaboration

- Assume the working tree may contain user changes. Do not overwrite, revert, or delete changes you did not make.
- Do not run destructive commands such as `git reset --hard`, `git checkout --`, or broad deletes unless explicitly requested.
- Use `rg` for searching when available.
- Use `apply_patch` for manual file edits.
- Do not edit generated files such as `.next/**` or `next-env.d.ts`.

## Verification

- After meaningful code changes, run:
  - `npm run lint`
  - `npm run build`
- If a command cannot be run or fails for an environmental reason, report that clearly.
- Before claiming completion, inspect the changed files and summarize what changed.

<!-- END:project-agent-rules -->
