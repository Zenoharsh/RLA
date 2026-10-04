# Red Lantern Analytica: Frontend Architecture & Migration Blueprint

## 1. Information Architecture & Routing Map

This map translates the legacy WordPress navigation into Next.js App Router paths. We are moving from static WordPress pages to dynamic, data-driven Next.js routes.

### Primary Navigation (Header & Footer)

*   **Home** -> `src/app/page.tsx`
*   **About Us**
    *   About RLA -> `src/app/about-rla/page.tsx` (Static Page)
    *   Mentors -> `src/app/mentors/page.tsx` (Static Page)
    *   Team -> `src/app/team/page.tsx` (Static Page)
*   **Publications** (Dynamic Archive Grids)
    *   Articles -> `src/app/category/articles/page.tsx`
    *   Statements -> `src/app/category/statements/page.tsx`
    *   Reports -> `src/app/category/reports/page.tsx`
    *   Opinions -> `src/app/category/opinions/page.tsx`
    *   Events & Press Release -> `src/app/category/rla-events/page.tsx`
    *   Media Coverage -> `src/app/category/media-coverage/page.tsx`
*   **Contribute to Us**
    *   Submissions -> `src/app/submission/page.tsx` (Static/Form Page)
    *   Careers -> `src/app/careers/page.tsx` (Static Page)
*   **RLA Briefs** (Dynamic Archive Grids)
    *   India's Diplomatic Digest -> `src/app/category/indias-diplomatic-digest/page.tsx`
    *   Indian Ocean Region Digest -> `src/app/category/indian-ocean-region-digest/page.tsx`
    *   Tibet Digest -> `src/app/category/tibet-brief/page.tsx`
    *   China Digest -> `src/app/category/china-digest/page.tsx`
    *   Africa Digest -> `src/app/category/africa-digest/page.tsx`
    *   Europe Digest -> `src/app/category/europe-digest/page.tsx`
    *   America Digest -> `src/app/category/america-digest/page.tsx`
    *   Neighbourhood Digest -> `src/app/category/neighbourhood-digest/page.tsx`
    *   Tech & AI Digest -> `src/app/category/tech-ai-digest/page.tsx`
    *   West Asia Digest -> `src/app/category/west-asia-digest/page.tsx`
*   **Standalone Media**
    *   Podcast -> `src/app/podcast/page.tsx`
    *   Weekly IR Magazine -> `src/app/weekly-ir-magazine/page.tsx`

---

## 2. Page Templates Inventory

To support the above routing matrix without duplicating code, we will build the following core Next.js Page Templates:

1.  **`src/app/page.tsx` (Homepage)**
    *   *Purpose*: The main landing dashboard (Hero, Featured Dossiers, Telemetry, etc.).
2.  **`src/app/category/[slug]/page.tsx` (Category Archive Engine)**
    *   *Purpose*: Reusable template that dynamically renders any "Publication" or "RLA Brief" (e.g., China Digest, Reports, Statements). It queries WordPress by category slug and maps out `DossierCard`s.
3.  **`src/app/post/[id]/page.tsx` (Single Article Reader)**
    *   *Purpose*: The consumption page for individual intelligence briefs. Parses raw WP HTML into the Tailwind Typography (`prose-invert`) layout.
4.  **`src/app/page/[slug]/page.tsx` (Static Page Engine)**
    *   *Purpose*: A fallback dynamic route to render standard WordPress pages (e.g., About, Mentors, Team) by fetching the WP Page content.
5.  **`src/app/search/page.tsx` (Search Results)**
    *   *Purpose*: Renders `DossierCard`s based on a `?q=` query string parameter.

---

## 3. UI Component Tree (Atomic Breakdown)

The site will be strictly modularized into the following React Server/Client Components:

### Global Layout
*   `Navbar` *(Client Component - due to dropdown hover/click states and mobile menu)*
*   `Footer` *(Server Component - static 3-column layout with links and visual elements)*

### Atomic UI / Cards
*   `DossierCard`: Standard masonry-style feed item for briefs and reports.
*   `FeaturedDossierCard`: Larger variant for the top of the homepage or category pages.
*   `MediaThumbnailCard`: Specialized card for podcasts/video content.
*   `SectionHeader`: Reusable component for titles (e.g., "CORE RESEARCH COMMUNIQUE").

### Page Sections
*   `HeroSection`: The landing atmospheric visual with framer-motion animations.
*   `FeaturedDossiers`: The top masonry grid fetching the latest priority articles.
*   `LiveTelemetryDashboard`: The statistical/metrics visualization area.
*   `StrategicQuoteBanner`: Full-width atmospheric separator.
*   `EnrollmentForm`: The newsletter subscription module (requires client-side state).

---

## 4. WordPress API Data Mapping

To hydrate the Next.js templates, we will interact with the following `redlanternanalytica.com` REST API endpoints:

### 1. Homepage (`/`)
*   **Fetch Latest Posts (Featured Dossiers)**:
    *   `GET /wp-json/wp/v2/posts?per_page=5&_embed`
    *   *Purpose*: Populates the homepage grid with the absolute latest intelligence across all categories.

### 2. Category Archive (`/category/[slug]`)
*   **Step A: Resolve Slug to Category ID**:
    *   `GET /wp-json/wp/v2/categories?slug=[slug]`
    *   *Returns*: Category object containing the numeric `id` (e.g., 42 for China Digest).
*   **Step B: Fetch Posts by Category ID**:
    *   `GET /wp-json/wp/v2/posts?categories=[id]&per_page=20&_embed`
    *   *Purpose*: Populates the masonry grid on pages like "China Digest" or "Statements".

### 3. Single Article Reader (`/post/[id]`)
*   **Fetch Single Post Data**:
    *   `GET /wp-json/wp/v2/posts/[id]?_embed`
    *   *Purpose*: Retrieves `title.rendered`, `content.rendered`, `date`, and `_embedded.author` for the reading view.

### 4. Static Pages (`/about-rla`, `/team`)
*   **Fetch Page Content**:
    *   `GET /wp-json/wp/v2/pages?slug=[slug]`
    *   *Purpose*: Retrieves the raw HTML for non-post static pages managed in WP.

### 5. Search (`/search?q=[query]`)
*   **Fetch Search Results**:
    *   `GET /wp-json/wp/v2/posts?search=[query]&per_page=20&_embed`
    *   *Purpose*: Enables global site search functionality.
