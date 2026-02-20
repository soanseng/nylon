# Guestbook Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a 留言板 guestbook to the CallToAction chapter using `@giscus/react` (GitHub Discussions embedded comments).

**Architecture:** Install the `@giscus/react` package, create a `Guestbook` component styled to nylon's amber/dawn palette, and render it in `CallToAction.tsx` before the closing quote. No backend needed — giscus handles storage via GitHub Discussions on `soanseng/nylon`.

**Tech Stack:** React 19, TypeScript, `@giscus/react`, Tailwind CSS 4, Vite

---

### Task 1: Install @giscus/react

**Files:**
- Modify: `package.json` (via npm)

**Step 1: Install the package**

```bash
npm install @giscus/react
```

**Step 2: Verify it's in package.json**

```bash
grep giscus package.json
```
Expected: `"@giscus/react": "^3.x.x"` (or similar)

**Step 3: Verify build still passes**

```bash
npm run build
```
Expected: clean build, no errors

**Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add @giscus/react dependency"
```

---

### Task 2: Create Guestbook component

**Files:**
- Create: `src/components/interactive/Guestbook.tsx`

**Step 1: Write the component**

```tsx
import Giscus from '@giscus/react'

/**
 * 留言板 — Guestbook
 *
 * Embeds GitHub Discussions as a comment wall via giscus.
 * Comments are stored in soanseng/nylon Discussions > General.
 */
export function Guestbook() {
  return (
    <div className="mx-auto w-full max-w-[720px]">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 font-document text-[0.75rem] uppercase tracking-[0.4em] text-amber/60">
          GUESTBOOK
        </div>
        <h3 className="mb-3 font-narrative text-[clamp(1.3rem,4vw,2rem)] font-bold text-paper-aged">
          留言板
        </h3>
        <p className="font-narrative text-[clamp(0.9rem,2vw,1rem)] leading-[2] text-dust">
          讀完之後有什麼想法？無論是感想、疑問、補充資料，或只是想說一句話——
          都歡迎留言。你的每一則留言都會保存在本專案的{' '}
          <a
            href="https://github.com/soanseng/nylon/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber/80 underline decoration-amber/30 underline-offset-4 transition-colors hover:text-amber"
          >
            GitHub Discussions
          </a>{' '}
          中。
        </p>
        <p className="mt-2 font-document text-[0.75rem] leading-6 text-stone/60">
          需要 GitHub 帳號登入。沒有帳號？也可以直接到{' '}
          <a
            href="https://github.com/soanseng/nylon/discussions/new?category=general"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone underline decoration-stone/30 underline-offset-4 transition-colors hover:text-amber/80"
          >
            Discussions 頁面
          </a>{' '}
          發表。
        </p>
      </div>

      {/* Giscus widget */}
      <div className="giscus-wrapper overflow-hidden rounded-sm border border-smoke/20">
        <Giscus
          id="guestbook"
          repo="soanseng/nylon"
          repoId="R_kgDORUVLWQ"
          category="General"
          categoryId="DIC_kwDORUVLWc4C229Q"
          mapping="specific"
          term="留言板 Guestbook"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="noborder_dark"
          lang="zh-TW"
          loading="lazy"
        />
      </div>
    </div>
  )
}
```

**Step 2: Verify build passes**

```bash
npm run build
```
Expected: clean build

**Step 3: Commit**

```bash
git add src/components/interactive/Guestbook.tsx
git commit -m "feat: add Guestbook component with giscus"
```

---

### Task 3: Integrate into CallToAction

**Files:**
- Modify: `src/chapters/CallToAction.tsx`

**Step 1: Add import at top of file**

Add after existing imports:
```tsx
import { Guestbook } from '../components/interactive/Guestbook'
```

**Step 2: Find insertion point**

The closing quote block looks like this in `CallToAction.tsx`:
```tsx
        <ScrollReveal>
          <div className="text-center font-document text-[0.65rem] tracking-[0.2em] text-stone/40">
            鄭南榕 (1947–1989) — 「剩下的，就是你們的事了。」
          </div>
        </ScrollReveal>
```

**Step 3: Insert Guestbook section before the closing quote**

Add a new `ScrollReveal` block containing the Guestbook, with a visual separator:

```tsx
        <ScrollReveal>
          <div className="border-t border-smoke/20 pt-16">
            <Guestbook />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="text-center font-document text-[0.65rem] tracking-[0.2em] text-stone/40">
            鄭南榕 (1947–1989) — 「剩下的，就是你們的事了。」
          </div>
        </ScrollReveal>
```

**Step 4: Verify build passes**

```bash
npm run build
```
Expected: clean build, no TypeScript errors

**Step 5: Smoke test in browser**

```bash
npm run dev
```
Open `http://localhost:5173`, scroll to the end of the CallToAction chapter. Verify:
- 「GUESTBOOK」label appears
- 「留言板」title appears
- Giscus widget loads (may show login prompt)
- Separator line is visible above the guestbook

**Step 6: Commit**

```bash
git add src/chapters/CallToAction.tsx
git commit -m "feat: integrate Guestbook into CallToAction chapter"
```
