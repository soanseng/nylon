# 製作者手記 Section Design

**Date:** 2026-02-20
**File:** `src/chapters/CallToAction.tsx`

## Summary

Add a "製作者手記" (Creator's Notes) section to the CallToAction chapter. The section uses first-person voice to contrast with the existing formal journalistic paragraphs in "為什麼要架這個網站".

## Placement

Insert between "為什麼要架這個網站" and "系列網站", using the same `border-t border-amber/10 pt-10` separator pattern as other sections.

## Structure

```
border-t separator
h2: 製作者手記
  4 personal reflection paragraphs (font-narrative, text-dust)
  inner divider (w-12 border-t border-amber/20 my-6)
  "Nec Tamen Consumebatur" — large standalone line (font-document tracking-widest text-amber)
  2 paragraphs on 焚而不燬 narrative (font-narrative, text-dust)
```

## Content

### Personal Reflection (4 paragraphs)

1. 以前有人說讀太多書會死掉——聽起來像是玩笑話。但仔細想想，這真的好恐怖。讀個書、說幾句自己的感想，可能就是唯一死刑的罪。被捉了面對的是死刑，那自焚又有什麼差別？

2. 鄭南榕自囚的那71天，橫跨了春節。他選擇留在雜誌社——一方面是抵抗，一方面，他也清楚知道自己的死期將近。我們現在以為解嚴就天下太平、什麼都可以說，才知道說錯話還是死路一條。飯可以隨便吃，書真的不能隨便讀——讀了書、有了思想、想說些什麼；說錯話，不只是你死，上有老母、下有妻兒，都要跟著活受罪。

3. 我是在做這個網站的過程中，才真正搞懂刑法100條和二條一是什麼。寫錯字、說錯話，就只有死路一條。寫這個網站，放到40年前，可能是極度危險的事情。

4. 1989年，不是只有天安門。那一年的台灣，也沒有好到哪裡去。

### Nec Tamen Consumebatur (2 paragraphs)

**Standalone line:** `Nec Tamen Consumebatur`
(font-document, tracking-widest, text-amber, centered or left-aligned)

1. 「焚而不燬」出自聖經出埃及記第三章——摩西在西奈山見到荊棘被火燃燒，卻沒有燒盡。拉丁文：*Nec Tamen Consumebatur*。這四個字，是台灣基督長老教會的座右銘，從馬偕1865年登陸台灣，歷經日據、威權，從未熄滅。義光教會，林義雄的教會，1980年的那個傷痛之地，仍然在那裡。鄭南榕，1989年的烈火，燒掉的是他的身體——他說的那些話，沒有燒掉。

2. *Nec Tamen Consumebatur*——這個域名還沒有人買。我就買下來，用 nectamen.com，來記錄2026年這個春節長假，我調查這段歷史的過程。

## Visual Tokens

- Section title: `font-heading text-[1.1rem] font-bold text-dawn`
- Body text: `font-narrative text-[0.9rem] leading-[2] text-dust`
- Latin headline: `font-document text-[0.95rem] tracking-[0.2em] text-amber`
- Inner divider: `w-12 border-t border-amber/20 my-6`
- Italic passages (*Nec Tamen Consumebatur* inline): `italic`
