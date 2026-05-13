# StudentStack Codebase & MVP Audit

## 1. MVP Gaps (Critical for Launch)

### **A. Functional Form Submission**
*   **Current State:** The form in `HeroSection` uses a simulated network delay (`setTimeout`). It does not actually collect emails.
*   **Missing:** A live connection to an Email Service Provider (ESP).
*   **Action Plan:**
    1.  **Select ESP:** Sign up for **ConvertKit (Kit)**, **Beehiiv**, or **MailerLite**.
    2.  **API Route:** Update `src/app/api/subscribe/route.ts` to actually `fetch` the ESP's API endpoint using an API Key.
    3.  **Client Integration:** Update `src/app/page.tsx` to call the local API route (`/api/subscribe`) instead of the mock promise.

### **B. Design & Assets (Missing Details)**
*   **Profile Pictures:** The `students.ts` file currently uses high-quality Unsplash stock photos as placeholders.
    *   *Action:* You must collect real headshots from the 12 students listed. Upload them to a host (like Cloudinary or your project's `public/` folder) and update the URLs in `students.ts`.
*   **Bio Accuracy:** Ensure the bios and "Key Achievements" are verified by the students themselves to maintain authenticity.

### **C. Analytics**
*   **Missing:** Meta Pixel (Facebook) and Google Analytics.
*   **Why:** Since your funnel relies on FB/IG ads, you need the Pixel installed to track "Lead" conversions. This is crucial for optimizing your ad spend.

## 2. Technical Audit & Fixes

### **A. React Error #31 (Fixed)**
*   **Symptoms:** "Uncaught Error: Minified React error #31... Objects are not valid as a React child".
*   **Investigation:**
    *   Audited `StudentCard` and `StudentGrid`: Confirmed all rendered variables (`student.name`, etc.) are strings, not objects.
    *   Audited `CyclingColleges` and `HeroSection`: Confirmed no object literals are being passed as children.
*   **Root Cause:** The error was caused by the `react/` wildcard mapping to version 19.x while `react-dom` was pinned to 18.2.0. The JSX runtime produced "React 19 Elements" (objects with `$$typeof`, `props`, etc.) which the React 18 DOM renderer treated as invalid plain objects.
*   **Fix:** Aligned `react/` and `react-dom/` in `index.html` to version 18.2.0 to ensure Element Object compatibility.

### **B. Mobile Responsiveness**
*   **Status:** The site uses Tailwind's responsive prefixes (`sm:`, `md:`) effectively.
*   **Note:** The "CyclingColleges" animation and the "StudentStack" intro animation should be tested on actual mobile devices to ensure they don't cause layout shifts.

## 3. Backend & Domain Connection Steps

1.  **Buy Domain:** Purchase `studentstack.org` (or `.com`).
2.  **Hosting:** Deploy the project to **Vercel** (recommended for Next.js/React).
    *   Connect your GitHub repository to Vercel.
    *   Add your custom domain in Vercel settings.
3.  **DNS Settings:** Vercel will provide A Records or CNAME records to add to your domain registrar (Namecheap/GoDaddy).
4.  **Environment Variables:**
    *   In Vercel Project Settings, add keys for your ESP: `CONVERTKIT_API_KEY`, `CONVERTKIT_FORM_ID`.

## 4. Summary of Code Changes
*   **`index.html`**: Updated `importmap` to ensure all React imports (including subpaths like `jsx-runtime`) resolve to version 18.2.0.
*   **`AUDIT.md`**: Updated with technical investigation details.