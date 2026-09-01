## Solid `bare` template

The smallest useful Solid 2.0 app: `solid-js` + `@solidjs/web`, no router, no server dependencies.

**Deployment contract:** `vite build` emits a purely static site — deploy `dist/client` to any static host. The client ships only Solid and your component.

## How it works

There is no `index.html` and no mount file. `@solidjs/vite-plugin`'s turnkey mode (`start: true` in `vite.config.ts`) generates the entries around two conventions:

- **`src/App.tsx`** — the app. A plain default-exported component; everything you build lives under it.
- **`src/Document.tsx`** — the document shell, the new `index.html`. It renders the full `<html>` and is where head tags go (title, meta, favicon). It is compiled only into the prerendered static shell and adds **zero client-side JS**. Delete it to fall back to the plugin's built-in shell.

`vite build` prerenders the shell into `dist/client/index.html` and emits the client assets alongside it.

## Usage

Those templates dependencies are maintained via [pnpm](https://pnpm.io) via `pnpm up -Lri`.

This is the reason you see a `pnpm-lock.yaml`. That being said, any package manager will work. This file can be safely be removed once you clone a template.

```bash
$ npm install # or pnpm install or yarn install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm run dev` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the static production site to `dist/client`.

### `npm run serve`

Serves the production build locally.

## The `ssr` flip

Streaming SSR is one boolean: add `ssr: true` next to `start: true` in `vite.config.ts`. `src/App.tsx` and `src/Document.tsx` carry over unchanged — `<HydrationScript />` is already in place in the Document (in client mode it is stripped from the static shell). The build then emits a request handler to `dist/server` instead of a purely static site.

## Growing out of `bare`

- **A router, file-system routes, per-page titles, and testing** come with the `basic` template — same structure, more floors.
- **A server** (data loading, mutations, sessions, API routes) is the `fullstack` template.

## This project was created with the [Solid CLI](https://github.com/solidjs-community/solid-cli)
