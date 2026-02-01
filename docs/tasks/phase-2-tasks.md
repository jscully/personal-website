# Phase 2: Admin Portal

**Goal:** Build the secure Admin Portal for content management.

**Estimated Duration:** 2 weeks

**Reference:** docs/technical-design/01_frontend_architecture.md (Section 3.2)

---

## 1. Authentication Integration
> Reference: 01_frontend_architecture.md (Section 3.2.2)

### 1.1 Auth Services
- [ ] Create `authService.ts` (Login, Refresh Token, Logout).
- [ ] Configure Axios interceptors to handle 401 token refresh automatically.
- [ ] Create Redux slice `authSlice` to store user status.

### 1.2 Auth Pages
- [ ] Implement `LoginPage` form with validation.
- [ ] Create `RequireAuth` High Order Component (HOC) or Route Wrapper.

---

## 2. Admin Layout & Dashboard
> Reference: 01_frontend_architecture.md (Section 3.2.1)

### 2.1 Admin Structure
- [ ] Create `AdminLayout` (Sidebar, Header, Main Content).
- [ ] Create `DashboardPage` (Placeholder stats).

### 2.2 Admin Routing
- [ ] Configure nested routes under `/admin/*`.
- [ ] Ensure unauthorized users are redirected to login.

---

## 3. Blog Management
> Reference: 02_ui_requirements.md (Section 13.2)

### 3.1 Blog List (Admin)
- [ ] Create `AdminBlogList` with status indicators (Draft/Published).
- [ ] Add "Create New" and "Edit" actions.

### 3.2 Blog Editor
- [ ] Create `BlogEditor` page.
- [ ] Integrate a Markdown Editor (e.g., `react-simplemde-editor` or custom).
- [ ] Add `MetadataForm` (Title, Slug, Excerpt, Tags).
- [ ] Implement "Save Draft" and "Publish" actions.

### 3.3 Tag Management
- [ ] Create `TagManagementPage`.
- [ ] Implement Create/Edit/Delete flows for Tags.

---

## 4. Phase 2 Verification
- [ ] Verify Login/Logout flow.
- [ ] Verify Token Refresh works (simulate expired token).
- [ ] Create a Blog Post via Admin and verify it appears on Public site.
