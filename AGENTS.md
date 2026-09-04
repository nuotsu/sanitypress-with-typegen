<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

```bash
bun run dev          # Start dev server (Next.js + Sanity Studio)
bun run build        # Production build
bun run typecheck    # TypeScript type check (no emit)
bun run typegen      # Regenerate src/sanity/types.ts from schema + queries
```

After any schema or GROQ query change, always run `bun run typegen` to keep `src/sanity/types.ts` in sync.

## Architecture

This is a **Next.js 16 (App Router) + Sanity CMS** site with full TypeGen type safety.

- **Frontend:** `src/app/(frontend)/` — catch-all route `[[...slug]]` renders any page by fetching a `page` document from Sanity and piping its `modules[]` array through `ModulesResolver`.
- **Studio:** `src/app/(studio)/admin/` — embedded Sanity Studio served at `/admin`.
- **Live Content API:** `sanityFetch` + `DynamicFetchOptions` (`perspective`/`stega`) from `src/sanity/lib/live.ts`, used with Next.js Cache Components (`'use cache'`).

### Page rendering flow

1. `[[...slug]]/page.tsx` fetches a `page` document with `PAGE_QUERY` (draft/dev via Suspense + dynamic options; published via cached path).
2. `PAGE_QUERY` assembles `modules[]` by concatenating global-before + path-before + page + path-after + global-after modules (all resolved via `MODULES_QUERY`).
3. `<ModulesResolver>` (`src/modules/index.tsx`) maps each `_type` to a React component via `MODULES_MAP`.

### Module system

Every page section is a **colocated module** under `src/modules/<module-name>/`. Adding a new module — use `/new-module`:

| Step                      | File                                                                                     |
| ------------------------- | ---------------------------------------------------------------------------------------- |
| 1. Module folder          | `src/modules/<module-name>/` — `schema.ts`, `index.tsx`, optional `query.ts`             |
| 2. Schema index           | `src/sanity/schemaTypes/index.ts` → `import … from '@/modules/<name>/schema'`            |
| 3. Modules fragment       | `src/sanity/schemaTypes/fragments/modules.ts`                                            |
| 4. GROQ query (if needed) | `src/modules/<name>/query.ts` → export e.g. `MY_MODULE_QUERY`; wire into `MODULES_QUERY` |
| 5. Component index        | `src/modules/index.tsx` → `MODULES_MAP`                                                  |
| 6. Thumbnail (optional)   | `public/module-thumbnails/<module-name>.webp` (Studio insert-menu grid)                  |

A module that runs its own independent Sanity fetch (not just what `MODULES_QUERY` already resolves) needs a registration step — see [Modules that fetch their own Sanity data](#modules-that-fetch-their-own-sanity-data) below.

**Schema:** Use `defineModule` (not `defineType`) from `src/sanity/schemaTypes/fragments/define-module.ts`. It auto-injects the `attributes` field, `options` group, and Studio preview component — never add these manually.

**Component:** Always spread `...props` into `<Module>` (default `as="section"`). This wires up `id`, `data-module`, `hidden`, and scoped CSS for Visual Editing.

```tsx
import * as stylex from '@stylexjs/stylex'
import { Module } from '@/modules'
import { shared } from '@/styles/shared'

export default function ({ intro, ...props }: MyModule) {
	return (
		<Module {...stylex.props(shared.section)} {...props}>
			<div>...</div>
		</Module>
	)
}
```

**GROQ query:** Only add `src/modules/<name>/query.ts` (uppercase export like `MY_MODULE_QUERY`) if the module has nested CTAs with links, references, or other joins. Simple scalar/block-only modules need no `query.ts`. Shared fragments (`LINK_QUERY`, etc.) live in `src/sanity/lib/queries.ts`.

**TypeGen types:** After `bun run typegen`, the module type is exported from `src/sanity/types.ts` as PascalCase (e.g. `my-module` → `MyModule`). Import it from `@/sanity/types`.

#### Modules that fetch their own Sanity data

A module component that runs an independent Sanity query (beyond what the page's `MODULES_QUERY` already resolves) must:

- wrap the fetch in a sibling function with `'use cache'`
- accept `perspective`/`stega` (`DynamicFetchOptions` from `@/sanity/lib/live`) as props
- register that module's `_type` in the `moduleSpecificProps` switch in `src/modules/index.tsx` so `ModulesResolver` actually passes those props down

See `src/modules/blog-index/index.tsx` for a worked example. Missing the registration step is silent — the module still renders, but its `'use cache'` fetch always resolves the published/non-stega view, so draft mode and Visual Editing never show up for it.

### Key utilities (`src/lib/utils.ts`)

- `getBlockText(block)` — extracts plain text from a PortableText block array (use in schema `preview.prepare`)
- `count(arr, singular)` — formats `"3 items"` (use in schema `preview.prepare`)

### Global modules

`global-module` documents in Sanity can inject modules before/after any page matching a path pattern. The wildcard `path == '*'` applies globally; specific paths use prefix matching with optional `excludePaths`.

### Environment variables

Defined in `.env.local` (copy from `.env.example`):

```
NEXT_PUBLIC_BASE_URL           # Production domain
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
SANITY_API_READ_TOKEN          # "Viewer" permissions
```

`ROUTES` in `src/lib/env.ts` controls URL path prefixes (e.g. `blog: 'blog'`).

### Sanity schema layout

```
src/modules/<name>/           # Colocated module: schema.ts, index.tsx, query.ts?
src/modules/index.tsx         # ModulesResolver + <Module> wrapper
src/ui/blog/                  # Shared blog UI helpers (not modules)
src/sanity/schemaTypes/
  documents/                  # Top-level content types: page, blog.post, site, navigation, etc.
  objects/                    # Reusable field groups: cta, link, metadata, module-attributes
  fragments/                  # Shared helpers: define-module.ts, modules.ts (fragment field)
src/sanity/lib/
  queries.ts                  # Shared GROQ fragments + assembles MODULES_QUERY from per-module query.ts exports
```

### Styling

StyleX (`stylex.create` / `stylex.props`) compiled via `@stylexswc/nextjs-plugin` (Turbopack) + `@stylexswc/postcss-plugin`. Tokens/breakpoints live in `src/styles/*.stylex.ts` (`defineVars` / `defineConsts`) and **must be imported with relative paths** (StyleX cannot resolve `@/` aliases for theme files). Shared recipes: `src/styles/shared.ts`. Thin global leftovers (document rules, `.prose` descendants, carousel/accordion pseudos) stay in `src/app.css`.
