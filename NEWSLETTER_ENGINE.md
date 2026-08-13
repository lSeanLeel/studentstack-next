# StudentStack newsletter engine

## What we ship publicly
- **Daily newsletter** for parents (list growth + trust)
- **Certifications** for students (clear paid pathway on the site)

## Automated daily flow
1. Weekday rotates the focus pillar (Organization / Planning / Notetaking)
2. Seed is built from `NEWSLETTER_ANGLE` + pillar (`buildAngleSeed`)
3. Claude drafts structured Markdown (`generateDailyMarkdown`)
4. Template renders Beehiiv-ready HTML (`buildBeehiivHtml`)
5. Optional: create a **Beehiiv draft** (never auto-sends)

### Operator (human in the loop)
`/operator` → **Auto-draft today** → tailor Parent note → Design → Copy HTML or Push draft

### Cron (hands-off draft)
- Route: `GET /api/cron/daily-newsletter?push=1`
- Auth: `Authorization: Bearer $CRON_SECRET` or Vercel Cron header
- Schedule: `vercel.json` → `0 13 * * *` (13:00 UTC daily)
- Set `CRON_SECRET`, `ANTHROPIC_API_KEY`, `BEEHIIV_API_KEY`, `BEEHIIV_PUBLICATION_ID` on Vercel

Manual test:
```bash
curl -H "Authorization: Bearer $CRON_SECRET" \
  "https://YOUR_DOMAIN/api/cron/daily-newsletter?push=1"
```

## Soft Elite line in the daily
The model may add one calm Soft close sentence about Elite. No price, no checkout, no portal tour as the lead.

---

## Elite product ideation (next build)

### Split that works
| Layer | Job | Monetization |
|---|---|---|
| Daily | Keep parents current on AI-in-school climate + one forwardable move | Free list |
| Certifications | Credentialed student pathways | One-time / cohort fees |
| **Elite** | Ongoing systems portal for families who want more than email | Subscription |

Yes: the daily can soft-upsell Elite every day **after** the useful content. The daily should still feel complete without Elite.

### What Elite portal should be
Not a dump of more AI news. A living **family operating system**:

1. **Week board** – syllabus/deadline systems the daily teaches, saved per student
2. **Toolkit shelf** – curated workflows (org / planning / notes) versioned as tools change
3. **Integrity desk** – classroom-safe AI norms, detector literacy, disclosure templates
4. **Signal archive** – searchable past dailies + “what changed this month”
5. **Certification track** – Elite members see cert progress / discounts (optional bundle)
6. **Ask the desk** – async question queue answered by the student-led team (not 24/7 chat)

Parents pay for **continuity + memory + structure**. Students log in for the toolkit and cert paths.

### How AI keeps the portal updated
- **Nightly ingest**: same climate signals that feed the daily also patch Toolkit cards
- **Diff publish**: AI proposes updates; operator approves in `/operator` before parents see them
- **Per-pillar pages**: Organization / Planning / Notetaking pages regenerate from approved source packs
- **Stale alerts**: if a tool/policy is older than N days, flag for refresh
- **Elite digest**: weekly “what changed in your portal” email (separate from the free daily)

### Pricing sketch (not on landing yet)
- Daily: free
- Certifications: one-time ($149–$229 as listed)
- Elite: monthly parent subscription (portal access for household) with soft daily CTA

### Build order
1. Harden newsletter automation (this doc) until daily drafts are boringly reliable
2. Soft Elite close in copy only
3. Elite portal MVP: toolkit shelf + signal archive + week board
4. Checkout + gated `/portal`
5. AI refresh jobs for toolkit cards
