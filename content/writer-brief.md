# Content brief — Saggi Law Firm service pages

> Share this brief with any content writer (human or AI) commissioned to
> draft an individual service page (e.g. Impaired Driving, Bail Hearings).
> The output should slot directly into `content/services/<slug>.mdx` with
> only formatting cleanup by the site builder.

---

## 1. Client & context

**Firm**: Saggi Law Firm (Brampton, Ontario)
**Lawyer**: Mandeep Saggi, Barrister & Solicitor — called to the Ontario Bar 2009
**Practice**: Criminal defence only — no family, real estate, or general practice
**Jurisdiction**: Brampton, Peel Region, Greater Toronto Area, Southern Ontario
**Courts**: Ontario Court of Justice and Superior Court of Justice, daily at Brampton Courthouse (A. Grenville Davis Courthouse) and regularly at Old City Hall (Toronto), College Park, 1000 Finch, Milton, Newmarket
**Languages served**: English, French
**Contact**: mandeep@saggilawfirm.com · 647-983-6720 (24/7)

**Website goals** for these pages:
1. Rank in Google for "[charge] lawyer Brampton" and related local searches
2. Convert an anxious visitor into a phone call or consultation booking
3. Signal expertise without over-claiming outcomes

---

## 2. Audience

Who reads a service page:
- **The accused** — recently charged, scared, googling from their phone late at night
- **A family member** — parent, spouse, sibling trying to help
- **Someone with a court date coming up** — has disclosure, wants to understand what's next

They are not lawyers. They will bounce from anything that reads like a Wikipedia article, a marketing brochure, or a fear-mongering blog. They stay for clear, honest, plain-language answers.

---

## 3. Voice & tone

- **Plain English** — no legalese unless it's defined in the same sentence
- **Direct** — short sentences, active voice
- **Composed** — no urgency-baiting, no bold caps, no "DON'T WAIT!"
- **Respectful of the reader's intelligence** — they know they're in trouble; do not talk down
- **Confident, not boastful** — "we look at these things" is better than "we always win"
- **Second person** — address the reader as "you"
- **Firm as "we"** — Saggi Law Firm, not "our team of expert attorneys"

**Reference tone**: The Economist meets a good local defence lawyer. Not: TV commercial for a personal injury firm.

---

## 4. Compliance rules (non-negotiable — Ontario)

These come from the Law Society of Ontario's Rules of Professional Conduct. Breaches can result in disciplinary action against Mandeep Saggi personally.

- **RPC 4.2-1**: Marketing must not be false, misleading, or misleading by omission. Do not write "guaranteed", "we always win", "best in Brampton", "#1", or anything comparable.
- **No specific promises of outcomes**. Ever. "We will get your charges dropped" is out.
- **No dollar-amount promises** on fines, awards, or settlements unless the writer has been given a verified source.
- **No fabricated case results, testimonials, or statistics**. If a number appears (e.g. "over 400 impaired driving matters defended"), it must come from the firm.
- **Disclaim generously**. Include: *"Past results do not guarantee future outcomes. Every case turns on its own facts."* somewhere on every page.
- **No client names or identifying facts** in case examples unless client consent is on file.
- **This is not legal advice for the reader's specific matter** — say so once per page.

---

## 5. SEO targets

Primary keyword (goes in H1 or first H2): **`[charge] lawyer Brampton`**
Secondary: **`[charge] defence Brampton`**, **`[charge] lawyer GTA`**, **`Brampton criminal defence lawyer`**

For "Impaired Driving", primaries include: `DUI lawyer Brampton`, `impaired driving lawyer Brampton`, `Over 80 defence Ontario`.

- Use the primary phrase naturally in the H1, the first paragraph, and one H2.
- Do NOT stuff keywords. If it reads awkwardly, cut it.
- Use related terms Google understands: "Charter", "Crown", "disclosure", "s. 320.14", "roadside", etc. — signals topical depth.
- Write for humans first; Google follows.

---

## 6. Length

- **Total body**: 900 – 1,400 words
- Anything shorter feels thin; anything longer loses the reader
- 3 to 6 H2 sections
- Paragraphs: 2–4 sentences max
- Bullet lists welcome; every list has at least 3 items and at most 7

---

## 7. Structure (write in this order)

Every section becomes an H2 in the MDX body. The page hero and CTAs are handled by the site — do not repeat them. Start the content at "What the charge covers."

### 1. What the charge covers *(H2)*

Plain-language explanation of the offence.
- What section of the Criminal Code (or other statute)
- What the Crown has to prove — elements of the offence
- Common variants (e.g. impaired vs. Over 80 vs. refusal)
- ~150–200 words

Include one `<Callout label="In plain language">…</Callout>` inside this section — a short, memorable framing sentence.

### 2. Penalties on the table *(H2)*

What the reader is actually facing if convicted.
- Minimum fines and prohibitions (federal)
- Provincial licence / driving impacts if relevant
- Immigration consequences (permanent residents, visa holders)
- Employment / travel impacts
- ~150 words + a bulleted list

### 3. How we defend this charge *(H2)*

The lawyer's approach. This is the expertise section.
- Charter issues we look for (s. 8, 9, 10(b), etc.)
- Evidence / procedural issues specific to this charge
- What the disclosure review focuses on
- When we negotiate vs. go to trial
- ~200 words + a bulleted list of 4–7 defence angles

### 4. What happens after you contact us *(H2)*

Sets expectations.
- Free initial consultation
- Disclosure request
- Strategy and fixed-fee quote
- Ongoing representation
- ~120 words

### 5. Recent outcomes *(H2)* — optional

If verified case results exist for this charge type, the site auto-inserts them below. Do not fabricate outcomes in the copy.

If you want to write one paragraph framing the outcomes section, keep it to 1–2 sentences: *"Past results below reflect matters similar in charge type. Every case turns on its own facts."*

### 6. Common questions *(H2)*

3–5 real questions the reader is likely googling — with concise, useful answers.
- Format each as a sub-heading in the H3 style, or as a plain list of `**Q:** … **A:** …` pairs
- Answers: 40–80 words each
- Do NOT copy questions from other firms' sites

---

## 8. Output format (MDX)

Deliver the content as a Markdown file with YAML frontmatter. This is what the site actually reads.

```mdx
---
title: Impaired Driving and DUI
slug: impaired-driving-dui
icon: D
order: 2
heroKicker: Impaired driving · Over 80 · Refusal
summary: One-sentence lede shown under the H1. What this practice area covers, in plain English. Keep to 200–250 characters.
seoTitle: Impaired Driving & DUI Lawyer — Brampton & GTA
seoDescription: 150–160 character meta description. Include the primary keyword naturally. Do not repeat the summary verbatim.
---

## What the charge covers

Prose paragraph…

<Callout label="In plain language">
A memorable, one-sentence reframing of the concept above.
</Callout>

## Penalties on the table

Prose paragraph.

- Bullet one
- Bullet two
- Bullet three

## How we defend this charge

Prose paragraph.

- Charter angle
- Evidentiary angle
- Procedural angle

## What happens after you contact us

Prose paragraph.

## Common questions

### Question one?

Answer paragraph.

### Question two?

Answer paragraph.
```

Do **not** include: an H1 (the page adds it from the frontmatter title), the hero, phone numbers, CTAs, related services, blog posts, or the footer. The site inserts all of those around the article body.

You **may** use: `**bold**`, `*italic*`, `[links](url)`, `> blockquotes`, `<Callout label="…">…</Callout>`, ordered and unordered lists.

---

## 9. Frontmatter reference

| Field | Required | Purpose |
|---|---|---|
| `title` | ✓ | H1 of the page, used in nav / breadcrumbs |
| `slug` | ✓ | URL slug — MUST match one of the ten in `src/lib/services.ts` |
| `icon` | ✓ | Single letter shown in the icon square (B, D, A, R, F, L, T, H, W, Y) |
| `order` | ✓ | Sort order in listings (see services.ts for existing) |
| `heroKicker` |  | Kicker above the H1 (e.g. "Impaired driving · Over 80 · Refusal") |
| `summary` | ✓ | Shown under the H1. 200–250 characters. |
| `seoTitle` |  | Overrides `<title>` for search results |
| `seoDescription` |  | Overrides meta description |

---

## 10. What NOT to do (specific traps)

- ❌ "The best DUI lawyer in Brampton"
- ❌ "We have never lost a case"
- ❌ "Guaranteed results"
- ❌ "Free consultation!" (with exclamation) — say "Free consultation" instead
- ❌ Fake testimonials or invented client quotes
- ❌ Made-up statistics ("94% success rate")
- ❌ Wall-of-text paragraphs longer than five sentences
- ❌ Legal citations without context (throw in `s. 320.14` without saying what it is)
- ❌ Directly copying language from other firms' service pages
- ❌ Cold-open with "Facing a DUI charge in Brampton? You need help NOW."
- ❌ Including the H1 in the MDX body

---

## 11. Deliverable checklist

Before handing off:

- [ ] Word count is 900–1,400
- [ ] H1 is NOT in the body (only in frontmatter as `title`)
- [ ] Primary keyword appears in `title` and first H2
- [ ] `summary` is 200–250 chars
- [ ] `seoTitle` is under 60 chars; `seoDescription` is 150–160 chars
- [ ] At least one `<Callout>`
- [ ] At least one bulleted list
- [ ] No outcome promises, guarantees, or superlatives
- [ ] Includes the "past results do not guarantee future outcomes" disclaimer once
- [ ] Common Questions section has 3–5 real Q/A
- [ ] Reads well aloud

---

## 12. Example first pass (impaired driving, first 3 sections)

```mdx
---
title: Impaired Driving and DUI
slug: impaired-driving-dui
icon: D
order: 2
heroKicker: Impaired driving · Over 80 · Refusal
summary: Impaired driving matters turn on procedure — the stop, the demand, the sample. Saggi Law Firm reviews each of them and explains the legal options available under Canadian criminal law.
seoTitle: Impaired Driving & DUI Lawyer — Brampton & GTA
seoDescription: Criminal defence for impaired driving, Over 80, and refusal charges in Brampton, Peel Region, and across the Greater Toronto Area.
---

## What the charge covers

Most people call this a "DUI," but the Criminal Code splits it into three
separate offences that often appear on the same information: **impaired
operation** (s. 320.14(1)(a)), **Over 80** (s. 320.14(1)(b)), and
**refusal or failure to provide a sample** (s. 320.15). Each has its own
elements and its own defences. The Crown often proceeds on more than one
and picks the strongest at trial.

<Callout label="In plain language">
"Impaired" is about how you drove. "Over 80" is about a number. "Refusal"
is about what you said or didn't say at the roadside. Different charges,
different arguments.
</Callout>

## Penalties on the table

A first offence carries federal minimums:

- **Fine**: $1,000 minimum, higher on elevated readings
- **Driving prohibition**: 1 year (federal), plus provincial licence impacts
- **Criminal record**: permanent, unless the charge is beaten or discharged
- **Insurance impact**: 3× to 6× premiums for three to six years

Additional consequences follow for permanent residents (inadmissibility),
professional licence holders, and anyone travelling to the United States.

## How we defend an impaired driving charge

Every file begins with a full disclosure review. We look for:

- **Charter breaches** — unlawful stops, delayed access to counsel,
  arbitrary detention (ss. 8, 9, 10(b))
- **Breath-sample technicalities** — the "as soon as practicable"
  window, calibration records, technician qualifications
- **Grounds for the breath demand** — whether reasonable grounds
  actually existed
- **Continuity of evidence** — every hand-off from vehicle to instrument
  to disclosure package
```

That gives the site builder a working file that renders end-to-end.

---

## 13. Handing back

Return one `.mdx` file per service page, named `<slug>.mdx` (e.g.
`impaired-driving-dui.mdx`). Include a short (1–3 line) note flagging
anything the writer thought needed the firm's review before publishing.
