# StudentStack newsletter engine

## Product
- **StudentStack Daily membership** ($40/mo)
- Public CTA: **Join the daily** (email) → then reveal price → Stripe membership checkout when configured
- Partner certifications remain a separate paid path
- Operator portal: `/operator` (default `admin` / `admin`)

## Daily email shape (public + generator)
1. Morning desk note (student-led voice)
2. School AI signal
3. Toolkit move (Organization / Planning / Notetaking)
4. Forward tonight (parent → student)

## Automated draft flow
1. Weekday rotates focus pillar
2. Seed from `NEWSLETTER_ANGLE` (`buildAngleSeed`)
3. Claude drafts Markdown (`generateDailyMarkdown`)
4. Beehiiv HTML (`buildBeehiivHtml`)
5. Optional Beehiiv **draft** push (never auto-send)

### Operator
`/operator` → Auto-draft today → tailor Parent note → Design → Copy HTML or Push draft

### Cron
`GET /api/cron/daily-newsletter?push=1` with `Authorization: Bearer $CRON_SECRET`

## Env
- `OPERATOR_USERNAME` / `ADMIN_PASSWORD` (defaults admin/admin)
- `ANTHROPIC_API_KEY`
- `BEEHIIV_API_KEY` / `BEEHIIV_PUBLICATION_ID`
- `STRIPE_SECRET_KEY` / `STRIPE_PRICE_MEMBERSHIP` for live $40 checkout
- `CRON_SECRET`
