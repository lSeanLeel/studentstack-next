# StudentStack — Operations Manual

Plain-language guide for the **free weekly parent email** and the token-free admin drafting station.

---

## 1. The plumbing (database)

Copy and paste the following into the **Supabase SQL Editor** and run it once if you **do not** have a `subscribers` table yet.

```sql
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  parent_email text not null,
  student_grade text not null check (
    student_grade in ('8th', 'Freshman', 'Sophomore', 'Junior', 'Senior')
  ),
  friction_point text not null check (
    friction_point in (
      'Finding Research/Internships',
      'Boosting GPA',
      'Writing Essays'
    )
  ),
  created_at timestamptz not null default now()
);

create unique index if not exists subscribers_parent_email_key on public.subscribers (lower(parent_email));
```

**If you already had the old table** (older goal options), run the migration in `supabase/migrations/001_subscribers_goal_enum.sql` instead—it drops the old check constraint and adds the new allowed values.

The landing onboarding modal still sends the field name `friction_point` to the API; in the product it represents the parent’s **biggest goal** (research/internships, GPA, or essays).

---

## 2. The plumbing (environment)

Create a file named **`.env.local`** in the project root folder `studentthisisfinal-main/` (same folder as `package.json`). Use the exact variable names below.

```bash
# Supabase (server-side — parents’ signups go here)
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Admin login for /admin (pick a long random password)
ADMIN_PASSWORD=your-long-secret-admin-password

# Optional: OpenAI if you use other admin routes later
OPENAI_API_KEY=
```

- **`SUPABASE_URL`**: In Supabase → Project Settings → API → Project URL.
- **`SUPABASE_SERVICE_ROLE_KEY`**: Same page → `service_role` key (keep secret; never expose in the browser).
- **`ADMIN_PASSWORD`**: Whatever you type on the `/admin` login screen must match this value.

Restart `npm run dev` (or redeploy) after changing `.env.local`.

---

## 3. Branded weekly email (recommended — no OpenAI)

The primary workflow for the **help@studentstack.info** weekly send is the **Branded weekly email** card at the top of `/admin` after you log in.

1. Fill **week label**, **preheader** (inbox preview line), and **opening paragraph** in plain text.
2. Under **AI toolkit**, enter one tool per category (name, short blurb, optional link). Categories are fixed: Organization & planning, Notetaking, Studying & exam prep, Research & sources, Writing & communication.
3. Paste your **Google Sheet** URL and customize the **button label** for the opportunity board.
4. Write the **featured parent Q&A** (you can fabricate anonymized questions each week).
5. Click **Copy HTML** or **.html file**, then paste into Gmail (send yourself a test first — some clients clip CSS).

Your draft **auto-saves in this browser** (localStorage). Use **Reset** to clear it.

Implementation lives in `src/lib/weekly-email-manual.ts` (HTML) and `src/components/admin-weekly-email-composer.tsx` (admin UI).

---

## 4. Optional: ChatGPT prompt helper (legacy)

This is the intended loop **without** paying for API calls inside your app: you use the admin page to build a prompt, then free ChatGPT in the browser to generate HTML, then paste into Beehiiv. The prompt is written to match what the **marketing site** promises: a **living toolkit link**, a **Google Sheet link** for the opportunity board, and a **human Q&A**—not three robot columns.

**Step 1 — Log in**  
Open your site at `/admin`, enter the password that matches `ADMIN_PASSWORD`, and unlock the dashboard.

**Step 2 — Fill the draft station**  
In **Weekly email draft station**:

1. **Toolkit page URL** — the single page you update each week (Notion, your site, etc.). Parents use the **same** URL every issue.  
2. **This week on the toolkit** — short blurb for the email body.  
3. **Opportunity board Google Sheet URL** — the shared Sheet with programs and deadlines.  
4. **Board note** (optional) — what changed this week.  
5. **Featured Q&A** — paste a real question and your team’s answer.

**Step 3 — Generate the master prompt**  
Click **Generate master prompt**. The textarea fills with instructions that embed your real URLs so ChatGPT can build correct `href`s.

**Step 4 — Copy and paste into free ChatGPT**  
Click **Copy prompt**, open ChatGPT, paste, and run it. The model should return **inline-styled HTML only** (no markdown fences).

**Step 5 — Paste HTML back and preview**  
Paste the HTML into **Paste ChatGPT HTML here**, then **Preview output**. Confirm the toolkit and Sheet buttons go to your real links.

**Step 6 — Send the email**  
Paste the same HTML into **Beehiiv** (or your ESP) for this week’s send.

**Step 7 — (Optional) Check new parents**  
Scroll to **Newsletter subscribers** for new signups (email, grade, goal).

---

## Quick troubleshooting

| Problem | What to check |
|--------|----------------|
| Signup modal says save failed | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and that `subscribers` table exists with the correct `friction_point` check. |
| Admin login fails | `ADMIN_PASSWORD` in `.env.local` matches what you type; restart the dev server. |
| Preview is blank | ChatGPT may have wrapped output in markdown; strip fences or ask it again with “raw HTML only.” |

For file copies of the SQL above, see `supabase/schema.sql` and `supabase/migrations/001_subscribers_goal_enum.sql`.
