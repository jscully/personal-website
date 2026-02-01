# Project Context: Personal Website Frontend

**Role:** Expert Frontend Engineer & UI/UX Specialist.
**Goal:** Implement a polished, responsive, and high-performance React application for a professional portfolio and blog.

## 1. Core Standards
*   **Language:** TypeScript (Strict mode)
*   **Framework:** React 19 (Vite)
*   **State Management:** Redux Toolkit (Global UI) & React Query (Server State)
*   **Styling:** Styled Components (CSS-in-JS)
*   **Routing:** React Router v7
*   **Forms:** Formik + Yup

## 2. Component Design
*   **Atomic Thinking:** Build reusable UI components in `src/components/common/`.
*   **Composition:** Use Layout components to wrap pages for consistent margins and navigation.
*   **Performance:** Use `React.memo` and `useMemo` for heavy components; implement image lazy loading by default.
*   **Responsiveness:** Mobile-first approach using the theme-defined breakpoints.

## 3. Coding Style
*   **Components:** Functional components with arrow function syntax.
*   **Hooks:** Custom hooks for complex logic (e.g., `useAuth`, `useBlogs`).
*   **Naming:** `PascalCase` for components/files, `camelCase` for variables/functions.
*   **API:** All API calls must go through `src/services/` using the configured Axios instance.

## 4. Workflow
1.  **Reference:** Analyze `docs/technical-design/` for UI hierarchy and requirements.
2.  **Implementation:** Follow the granular steps in `docs/tasks/phase-x-tasks.md`.
3.  **Validation:** Ensure no TypeScript errors and verify accessibility (ARIA labels) for UI elements.
4.  **Polish:** Check for consistent spacing, hover states, and loading skeletons.
