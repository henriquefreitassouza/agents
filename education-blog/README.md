# Education Blog

A SvelteKit + mdsvex starter focused on a clean content architecture and a reusable design system for publishing educational articles.

This project gives you:

- file-based blog posts in markdown
- frontmatter-driven metadata (`title`, `description`, `date`, `tags`)
- a blog listing page (`/blog`)
- dynamic post routes (`/blog/[slug]`)
- customizable theme tokens and reusable UI components

## Project objective

The main goal is to provide a practical baseline for teams or creators who want to:

1. write content in markdown
2. keep blog structure simple and scalable
3. style pages consistently using reusable components and theme variables
4. adapt the system quickly for their own brand/project

## Tech stack

- [SvelteKit](https://svelte.dev/docs/kit/introduction)
- [mdsvex](https://mdsvex.pngwn.io/)
- TypeScript
- Yarn

## Folder structure

```txt
src/
  app.css                          # theme tokens and global styles
  lib/
    components/                    # reusable themed UI components
    posts.ts                       # post loading and metadata helpers
  posts/                           # markdown blog posts with frontmatter
  routes/
    +layout.svelte                 # global shell/header and app-level styling import
    +page.svelte                   # themed homepage
    blog/
      +page.ts                     # blog listing loader
      +page.svelte                 # blog listing UI
      [slug]/
        +page.ts                   # slug validation and metadata loader
        +page.svelte               # markdown post renderer
```

## Run locally

```sh
yarn install
yarn dev
```

Open `http://localhost:5173`.

## Content authoring guide

Add new posts as `.md` files inside `src/posts`.

Example:

```md
---
title: My New Post
description: What this post is about.
date: 2026-04-18
tags:
  - education
  - tutorial
---

Your markdown content goes here.
```

Notes:

- the filename becomes the slug (for example `my-new-post.md` -> `/blog/my-new-post`)
- posts are sorted by date (newest first)

## Customize the design theme

Start in `src/app.css`:

- update color tokens (`--primary`, `--bg`, `--text`, etc.)
- adjust spacing/radius/shadow tokens (`--radius-*`, `--shadow-*`)
- tune base typography styles

Then adapt components in `src/lib/components` to match your visual system.

## Reusing this in your own project

You can copy this architecture into any SvelteKit app that uses mdsvex.

### 1) Install required packages

```sh
yarn add -D mdsvex
```

### 2) Configure mdsvex in `svelte.config.js`

Use the same `preprocess` and `extensions` setup used in this repository.

### 3) Copy core files

- `src/lib/posts.ts`
- `src/posts/` (create this folder)
- `src/routes/blog/+page.ts`
- `src/routes/blog/+page.svelte`
- `src/routes/blog/[slug]/+page.ts`
- `src/routes/blog/[slug]/+page.svelte`
- `src/app.css`
- `src/lib/components/` (optional but recommended)

### 4) Import global theme

In your root layout, import `src/app.css`:

```ts
import '../app.css';
```

### 5) Start writing posts

Create markdown files in `src/posts` and your blog will populate automatically.

## Quality checks

```sh
yarn check
yarn build
```

## License

Use freely as a starter template for personal, educational, or commercial projects.
