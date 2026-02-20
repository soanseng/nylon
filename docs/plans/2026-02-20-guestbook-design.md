# 留言板 Guestbook — Design Document

Date: 2026-02-20

## Overview

Add a guestbook section to the CallToAction chapter using `@giscus/react`, embedding GitHub Discussions as a comment wall. Pattern mirrors the implementation in `~/projects/the-lin`.

## Placement

Inside the CallToAction chapter (`src/chapters/CallToAction.tsx`), after the resource links section and before the closing quote (「剩下的，就是你們的事了。」).

## Technical Details

**Package:** `@giscus/react`

**Giscus config:**
- `repo`: `soanseng/nylon`
- `repoId`: `R_kgDORUVLWQ`
- `category`: `General`
- `categoryId`: `DIC_kwDORUVLWc4C229Q`
- `mapping`: `specific`
- `term`: `留言板 Guestbook`
- `theme`: `noborder_dark`
- `lang`: `zh-TW`

## Component

New file: `src/components/interactive/Guestbook.tsx`

- Header with GUESTBOOK label in `font-document` monospace
- Title 「留言板」in `font-narrative`
- Description inviting thoughts, questions, supplementary material
- Link to GitHub Discussions page as fallback for users without GitHub
- Giscus widget in `border border-smoke/20 rounded-sm` wrapper

**Color tokens (nylon amber/dawn palette):**
- Label: `text-amber/60`
- Title: `text-paper-aged`
- Body text: `text-dust`
- Link: `text-amber/80` on hover

## Implementation Steps

1. `npm install @giscus/react`
2. Create `src/components/interactive/Guestbook.tsx`
3. Import and render `<Guestbook />` in `CallToAction.tsx` before the closing quote ScrollReveal block
