# Creator Notes Section Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a "製作者手記" section to `CallToAction.tsx` between "為什麼要架這個網站" and "系列網站", using first-person voice with two sub-blocks: personal reflection and 焚而不燬 / Nec Tamen Consumebatur narrative.

**Architecture:** Single file edit to `src/chapters/CallToAction.tsx`. No new components, no new data files. Pure JSX addition following the existing `ScrollReveal` + `border-t border-amber/10 pt-10` section pattern already used in the file.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4

---

### Task 1: Add 製作者手記 section to CallToAction.tsx

**Files:**
- Modify: `src/chapters/CallToAction.tsx`

Reference: `docs/plans/2026-02-20-creator-notes-design.md`

**Step 1: Open the file and find the insertion point**

The new section goes between the closing `</ScrollReveal>` of "為什麼要架這個網站" (ends around line 103) and the opening `<ScrollReveal>` of "系列網站" (starts around line 105).

Exact insertion — after this block:
```tsx
        </ScrollReveal>

        <ScrollReveal>
          <div className="space-y-6 border-t border-amber/10 pt-10">
            <h2 className="font-heading text-[1.1rem] font-bold text-dawn">
              系列網站
```

Insert the following new `<ScrollReveal>` block BEFORE the 系列網站 block:

```tsx
        <ScrollReveal>
          <div className="space-y-6 border-t border-amber/10 pt-10">
            <h2 className="font-heading text-[1.1rem] font-bold text-dawn">
              製作者手記
            </h2>
            <div className="space-y-4 font-narrative text-[0.9rem] leading-[2] text-dust">
              <p>
                以前有人說，讀太多書會死掉——聽起來像是玩笑話。但仔細想想，這真的好恐怖。讀個書、說幾句自己的感想，可能就是唯一死刑的罪。被捉了面對的是死刑，那自焚又有什麼差別？
              </p>
              <p>
                鄭南榕自囚的那71天，橫跨了春節。他選擇留在雜誌社——一方面是抵抗，一方面，他也清楚知道自己的死期將近。我們現在以為解嚴就天下太平、什麼都可以說，才知道說錯話還是死路一條。飯可以隨便吃，書真的不能隨便讀——讀了書、有了思想、想說些什麼；說錯話，不只是你死，上有老母、下有妻兒，都要跟著活受罪。
              </p>
              <p>
                我是在做這個網站的過程中，才真正搞懂刑法100條和二條一是什麼。寫錯字、說錯話，就只有死路一條。寫這個網站，放到40年前，可能是極度危險的事情。
              </p>
              <p>
                1989年，不是只有天安門。那一年的台灣，也沒有好到哪裡去。
              </p>
            </div>

            <div className="my-6 w-12 border-t border-amber/20" />

            <p className="font-document text-[0.95rem] tracking-[0.2em] text-amber">
              Nec Tamen Consumebatur
            </p>
            <div className="space-y-4 font-narrative text-[0.9rem] leading-[2] text-dust">
              <p>
                「焚而不燬」出自聖經出埃及記第三章——摩西在西奈山見到荊棘被火燃燒，卻沒有燒盡。拉丁文：<em>Nec Tamen Consumebatur</em>。這四個字，是台灣基督長老教會的座右銘，從馬偕1865年登陸台灣，歷經日據、威權，從未熄滅。義光教會，林義雄的教會，1980年的那個傷痛之地，仍然在那裡。鄭南榕，1989年的烈火，燒掉的是他的身體——他說的那些話，沒有燒掉。
              </p>
              <p>
                <em>Nec Tamen Consumebatur</em>——這個域名還沒有人買。我就買下來，用 nectamen.com，來記錄2026年這個春節長假，我調查這段歷史的過程。
              </p>
            </div>
          </div>
        </ScrollReveal>
```

**Step 2: Verify build passes**

```bash
npm run build
```

Expected: clean build, no TypeScript errors, no lint errors.

**Step 3: Commit**

```bash
git add src/chapters/CallToAction.tsx
git commit -m "feat: add 製作者手記 section with personal reflection and Nec Tamen Consumebatur narrative"
```
