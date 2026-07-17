# Plan Mode & first Act prompts — NTT_Website

Paste these into your coding agent (Cline / Cursor / Claude Code). Run PLAN first, review, then ACT.

---

## 1) PLAN MODE prompt (no code yet)

```
You are acting as a senior product architect and full-stack engineer.

We are building the official personal website for Vietnamese visual artist
Nguyễn Tuấn Thịnh. Do NOT write, create, edit, or delete any file yet.

First, read ALL files in /docs and the .clinerules file at the repo root:
- docs/product-brief.md
- docs/content-model.md
- docs/design-system.md
- docs/sitemap.md
- docs/ai-knowledge-policy.md
- docs/moderation-policy.md
- docs/security-requirements.md
- docs/acceptance-criteria.md
- .clinerules

Assumed stack (challenge it, with reasons, if you disagree): Next.js (App Router)
+ TypeScript (strict) + Tailwind CSS; Supabase (Postgres, Auth, Storage) with
pgvector for the later AI layer; Vercel hosting; bilingual vi/en.

Key product constraints you MUST respect (from the docs):
- "Temple-with-a-salon" model: the core (Home, Artist, Artworks) is quiet;
  interaction lives only in the salon wing.
- The three "cõi" (nang / doi / hon-mang) are the PRIMARY navigation for Artworks;
  style / medium / theme / year are FILTERS, not menu items.
- The Nàng collection has NO comments.
- Dark-first design per design-system.md.
- Three-tier artwork descriptions with explicit author; AI text is NEVER
  presented as the artist's voice.
- MVP scope and explicit exclusions per product-brief.md (no AI Q&A, crawling,
  open comments, e-commerce, or public accounts in MVP).

Then produce (a written plan only — no code):
1. Proposed system architecture.
2. Recommended folder structure.
3. Database entities and relationships (derived from content-model.md), with enums.
4. User roles and permission model, including an RLS strategy (deny-by-default).
5. A phased implementation roadmap by vertical slice
   (Slice 1 = Artwork Publishing, per acceptance-criteria.md).
6. MVP scope and explicitly excluded features.
7. Key security, copyright, privacy and AI-governance risks, and how the plan
   mitigates them.
8. Testing requirements.
9. A list of unresolved decisions that need my input.
10. The exact first vertical slice you propose to implement end-to-end,
    mapped to acceptance-criteria.md.

Do not create, edit or delete any project file until I review and approve this plan.
```

---

## 2) First ACT prompt (only after the plan is approved)

```
Implement Vertical Slice 1: Artwork Publishing, exactly per docs/acceptance-criteria.md.

The slice must include:
- artworks + artwork_images schema (3-tier descriptions with author), per content-model.md;
- image upload (1 primary + n detail; generate web renditions; keep originals in private storage);
- admin form to create and edit an artwork, with required-field validation;
- public artwork listing by cõi (/vi/tac-pham/{collection}) with pagination;
- filtering by type and year, with shareable URL query params;
- artwork detail page (/vi/tac-pham/{collection}/{code}) with the dual-mode viewer
  (Toàn cảnh / Chi tiết cảm xúc);
- bilingual vi/en with /vi and /en prefixes;
- dark-first styling per design-system.md (color tokens; Playfair Display + Inter);
- loading, empty and error states;
- responsive mobile layout; alt text on images; keyboard navigation; adequate contrast;
- SEO metadata + Open Graph on detail pages;
- ownership_status shown as "Available / Collected" WITHOUT revealing buyer identity.

Before editing, list the exact files you will create or modify.

Do NOT implement in this slice: public authentication, AI Q&A, comments,
e-commerce, external crawling, or newsletter.

After implementation:
1. Run lint and type checking.
2. Run relevant tests.
3. Test the workflow in the browser with real data (>= 5 artworks per cõi).
4. Report files changed, known limitations, and the next recommended slice.
Work on a branch; do not merge to production.
```
