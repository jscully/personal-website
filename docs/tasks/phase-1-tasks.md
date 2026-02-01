# Phase 1: Frontend Foundation & Public Website

**Goal:** Build the public-facing side of the website, including Blog, Projects, and About pages.

**Estimated Duration:** 2 weeks

**Reference:** docs/technical-design/01_frontend_architecture.md, docs/technical-design/02_ui_requirements.md

---

## 1. Project Setup & Architecture
> Reference: 01_frontend_architecture.md (Section 2 & 3.1.1)

### 1.1 Core Libraries
- [x] Install State Management: `@reduxjs/toolkit`, `react-redux`.
- [x] Install Data Fetching: `@tanstack/react-query`, `axios`.
- [x] Install UI Utils: `formik`, `yup`, `react-markdown`, `date-fns`.

### 1.2 Global Styles & Theme
- [x] Update `src/styles/Theme.ts` with brand colors and typography.
- [x] Implement `GlobalStyles` using `styled-components`.
- [x] Configure a responsive Grid/Flexbox layout system.

### 1.3 State Management Setup
- [x] Configure Redux Store (`store.ts`) for global UI state (theme, modal).
- [x] Configure React Query Client (`queryClient.ts`) with default stale times.

---

## 2. Common Components
> Reference: 01_frontend_architecture.md (Section 3.1.1)

### 2.1 UI Kit
- [x] Create `Button`, `Input`, `Card` components.
- [x] Create `LoadingIndicator` (Spinner/Skeleton).
- [x] Create `TagChip` for displaying blog tags.

### 2.2 Layout Components
- [x] Implement `Navbar` with responsive hamburger menu.
- [x] Implement `Footer` with social links.
- [x] Create `PageContainer` wrapper for consistent margins.

---

### 3. Public Pages (Read-Only)
- [x] Implement `WelcomePage` (Hero section, Featured posts).
- [x] Implement `AboutPage`.

### 3.2 Projects Page
- [x] Create `ProjectCard` component.
- [x] Implement `ProjectsPage` with Grid layout.
- [x] (Mock Data) Populate projects list locally for now.

### 3.3 Blog Listing
- [x] Create `BlogCard` component.
- [x] Implement `BlogPage` (List view).
- [x] Integrate `useBlogs` hook (React Query) to fetch from API.
- [x] Add Pagination controls.

### 3.4 Blog Detail
- [x] Create `BlogContent` component using `react-markdown`.
- [x] Implement `BlogPostPage` (Detail view).
- [x] Add `RelatedBlogs` section.

---

## 4. Phase 1 Verification
- [x] Verify all public routes navigate correctly.
- [x] Check responsive design on Mobile/Tablet viewports.
- [x] Ensure API data is rendering correctly in Blog components.
