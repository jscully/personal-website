# Phase 3: Search, Contact & Polish

**Goal:** Finalize features, SEO optimization, and Polish.

**Estimated Duration:** 1 week

**Reference:** docs/technical-design/02_ui_requirements.md

---

## 1. Search Interface
> Reference: 02_ui_requirements.md (Blog Section)

### 1.1 Search Component
- [ ] Create `SearchBar` component with debounce.
- [ ] Implement `BlogSearch` page or modal.
- [ ] Display search results with highlighting (if supported by API response).

### 1.2 Filtering
- [ ] Implement Filter by Tag UI on Blog List.

---

## 2. Contact Form
> Reference: 02_ui_requirements.md (Contact Page)

### 2.1 Form Implementation
- [ ] Update `ContactPage` with `Formik` and `Yup`.
- [ ] Integrate `POST /api/contact` endpoint.
- [ ] Show Success/Error notifications (Toast messages).

---

## 3. Polish & Optimization
> Reference: 03_testing_performance.md

### 3.1 SEO & Meta Tags
- [ ] Implement `React Helmet` (or similar) for dynamic `<title>` and `<meta>` tags.
- [ ] Ensure OpenGraph tags are populated for Blog Posts.

### 3.2 Performance
- [ ] Implement Lazy Loading for images (`loading="lazy"`).
- [ ] Verify Code Splitting (Routes are lazy loaded).
- [ ] Run Lighthouse audit and fix critical issues.

---

## 4. Phase 3 Verification
- [ ] Submit Contact Form and verify API call.
- [ ] Search for a blog post and verify results.
- [ ] Check Lighthouse score is > 90 for Performance and SEO.
