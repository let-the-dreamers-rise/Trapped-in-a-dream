# UX / Bug Report — GATE Rank 1, 90-Day Mission PWA

Tested with Playwright (Chromium, 390×844 viewport) against a local static
server (`python3 -m http.server`), following a full simulated "study day"
across onboarding, Study/theory, practice quiz, Mock test, Progress, Plan,
Home, and a rapid-navigation stress test. All `pageerror` and `console.error`
events were captured for every scenario below. App files were not modified.

No JavaScript exceptions or console errors were thrown in **any** of the
scenarios tested (onboarding, 65 topics' theory tabs, 46 quiz questions
across MCQ/MSQ/NAT, a full 65-question mock start→finish→review→tag→landing
cycle, mock abandon, Progress export/import, Plan checkbox persistence
across reload, Home focus timer, and 20× rapid tab switching).

---

## Bugs found

### 1. Daily rollover uses UTC midnight instead of local midnight (Medium)
**Where:** `js/app.js`, `todayKey()` (line 25): `new Date().toISOString().slice(0,10)`.

**Repro:**
1. Set the system/browser timezone to `Asia/Kolkata` (UTC+5:30) — the
   timezone implied by the app's own content (Pisces/Meena-rashi astrology
   card, GATE India context).
2. Load the app just after local midnight, e.g. 03:00 AM IST on Aug 30.
3. `new Date().toISOString().slice(0,10)` evaluates to **`2026-08-29`**,
   i.e. still "yesterday", even though the user's calendar day has already
   turned over.
   - Verified directly in a Chromium page evaluate: local time
     `Sun Aug 30 2026 03:01:21 GMT+0530 (India Standard Time)` →
     `todayKeyLike: '2026-08-29'`.

**Impact:** `todayKey()` backs `missionDay()` (Day chip / content-freeze
trigger), the daily-quota counter (`S.daily`), and the streak calculation
(`S.streak`). For any user east of UTC (which includes the app's entire
apparent target audience), the "day" the app thinks it is only rolls over
several hours after the user's actual local midnight (5.5 hours late for
IST). Concretely: a student who studies from 12:30 AM–2 AM local time
(very plausible for exam-prep grinding) has those answers credited to the
*previous* day's quota, the Day-N counter doesn't advance until ~5:30 AM
local, and the streak logic can undercount or misjudge "yesterday" around
that boundary. For users west of UTC the same bug can make the day
advance *too early* (before local midnight).

**Fix suggestion:** build `todayKey()` from local date parts
(`d.getFullYear()`, `getMonth()`, `getDate()`) instead of `toISOString()`.

**Severity:** Medium — doesn't crash anything, but silently corrupts the
core "which day is it" state that Day chip, quota, freeze-banner, and
streak all depend on, for exactly the timezone the app was built for.

---

## No other bugs found

Every other area exercised behaved correctly under the same instrumentation
(no console/page errors in any case):

- **Onboarding:** Setting start date to 70 days ago correctly shows
  **Day 71/90** (Day 1 = the start date itself, so +70 elapsed days = Day
  71 — this is correct by the app's own inclusive-day convention, not a
  bug; see "Works as intended" below) and the Day-60 content-freeze
  banner renders at that point.
- **Study → Topic theory:** All 11 subjects / 65 topics render all 4
  theory tabs (Intro, Core theory, Deep dive, Exam strategy) with
  non-placeholder content; every topic's "Deep dive" tab exceeds 500
  characters. No empty tab bodies found anywhere in the syllabus.
- **Practice quiz:** Answered 10+ questions per session across multiple
  topics/subjects including MCQ, MSQ (multi-select + "Submit selection"),
  and NAT (numeric input + "Check answer"); explanation block and (for
  authored, non-generated questions) the 🚩 flag button appear after every
  answer; flagging persists ("🚩 Flagged", button disabled). Difficulty
  filter buttons (all/easy/medium/hard) correctly swap the question pool,
  including graceful "No … questions here yet" messaging when a filtered
  pool is exhausted for the current session.
- **Mock test:** Start → answer a mix of question kinds → Prev/Next
  navigation preserves previously chosen options (including MSQ
  highlighting) → Abandon shows a confirm dialog and returns cleanly to
  the mock landing screen without scoring it. Separately, a full
  65-question run-through to Submit → result screen → "Review all
  answers" → per-question mistake tagging (Concept/Silly/Time) → back to
  landing (now showing the "lock" message and mock history) all completed
  with zero errors. The countdown timer visibly ticks down every second
  during the test (verified 03:00:00 → 02:59:55 after ~5s of interaction).
- **Progress:** Stats card (questions answered, accuracy, mastered count,
  latest mock score, avg time/question, flags) renders; "Export progress"
  fills the textarea with valid JSON and fires the "copied to clipboard"
  confirmation; "Import" reveals the paste box + "Restore from pasted
  code" button, and restoring a valid export triggers the expected
  confirm dialog.
- **Plan:** Expanding day rows 1, 15, and 45 and checking the first task
  box in each persists correctly through a full page reload
  (`localStorage` round-trip verified for all three days).
- **Home:** Focus timer (both 25-min and 45-min buttons) visibly counts
  down once started (24:58 after ~2s); the Pisces/Meena-rashi astro card
  renders with color/number/time/mantra/ritual copy.
- **Stress test:** 20 rapid, unthrottled tab switches (home → subjects →
  test → progress → plan, repeated) produced no console/page errors and
  left the app in a consistent state (correct active tab highlighted,
  non-empty view rendered).

---

## Summary

| Severity | Count |
|---|---|
| Critical | 0 |
| High | 0 |
| Medium | 1 |
| Low | 0 |

**Total bugs found: 1** (1 Medium, 0 High/Critical, 0 Low).
