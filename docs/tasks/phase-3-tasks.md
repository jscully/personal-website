# Phase 3: Search, Contact & Polish

**Goal:** Finalize features, SEO optimization, and Polish.

**Estimated Duration:** 1 week

**Reference:** docs/technical-design/02_ui_requirements.md

---

## 1. Search Interface
> Reference: 02_ui_requirements.md (Blog Section)

### 1.1 Search Component
- [x] Create `SearchBar` component with debounce.
- [x] Implement `BlogSearch` page or modal.
- [x] Display search results with highlighting (if supported by API response).

### 1.2 Filtering
- [x] Implement Filter by Tag UI on Blog List.

---

## 2. Contact Form
> Reference: 02_ui_requirements.md (Contact Page)

### 2.1 Form Implementation
- [x] Update `ContactPage` with `Formik` and `Yup`.
- [x] Integrate `POST /api/contact` endpoint.
- [x] Show Success/Error notifications (Toast messages).

---

## 3. Polish & Optimization
> Reference: 03_testing_performance.md

### 3.1 SEO & Meta Tags
- [x] Implement `React Helmet` (or similar) for dynamic `<title>` and `<meta>` tags.
- [x] Ensure OpenGraph tags are populated for Blog Posts.

### 3.2 Performance
- [x] Implement Lazy Loading for images (`loading="lazy"`).
- [x] Verify Code Splitting (Routes are lazy loaded).
- [x] Run Lighthouse audit and fix critical issues.

---

## 4. Phase 3 Verification
- [x] Submit Contact Form and verify API call.
- [x] Search for a blog post and verify results.
- [x] Check Lighthouse score is > 90 for Performance and SEO.
