# Frontend Architecture & Design

## 2. Technology Stack Selection

### 2.1 Frontend Technologies

| Technology | Purpose | Rationale |
| :--- | :--- | :--- |
| **React 18** | UI Library | Industry standard, component-based architecture facilitates maintainable code |
| **TypeScript** | Language | Type safety, better developer experience, showcases engineering discipline |
| **Redux Toolkit** | State Management | Simplified Redux implementation with built-in best practices |
| **React Router** | Routing | Mature solution for SPA navigation |
| **Material UI or Chakra UI** | Component Library | Professional aesthetics with minimal design, accessibility support |
| **Formik + Yup** | Form Management | Robust form handling with schema validation |
| **Axios** | API Client | Consistent API request interface with interceptor support |
| **React Query** | Data Fetching | Optimized data fetching with caching and background updates |

## 3. Component Design

### 3.1 Public Website (React/TypeScript)

#### 3.1.1 Component Hierarchy

```
App
├── Layout
│   ├── Header
│   ├── Navigation
│   ├── Main Content Area
│   └── Footer
├── Pages
│   ├── WelcomePage
│   ├── ProjectsPage
│   │   └── ProjectCard
│   ├── BlogPage
│   │   ├── BlogList
│   │   │   └── BlogCard
│   │   ├── BlogDetail
│   │   │   ├── BlogContent
│   │   │   ├── RelatedBlogs
│   │   │   └── TagList
│   │   └── BlogSearch
│   └── ContactPage
│       └── ContactForm
└── Common Components
    ├── SearchBar
    ├── Pagination
    ├── CodeBlock
    ├── TagChip
    └── LoadingIndicator
```

#### 3.1.2 State Management

- **Global State** (Redux):
    - User preferences (theme, etc.)
    - Application status (loading states, errors)
    - Search parameters

- **Server State** (React Query):
    - Blog posts
    - Project data
    - Tag information

- **Local State** (React useState):
    - Form inputs
    - UI toggles
    - Component-specific state

### 3.2 Admin Portal (React/TypeScript)

#### 3.2.1 Component Hierarchy

```
AdminApp
├── AuthLayout
│   ├── Header
│   ├── Sidebar
│   ├── Main Content Area
│   └── Footer
├── Pages
│   ├── LoginPage
│   ├── DashboardPage
│   ├── BlogManagementPage
│   │   ├── BlogList
│   │   ├── BlogEditor
│   │   │   ├── RichTextEditor
│   │   │   ├── MetadataForm
│   │   │   └── TagSelector
│   │   └── BlogPreview
│   ├── TagManagementPage
│   └── AnalyticsDashboard
└── Common Components
    ├── ConfirmDialog
    ├── NotificationSystem
    ├── DataTable
    └── DatePicker
```

#### 3.2.2 Authentication Flow

1. User enters credentials on `LoginPage`.
2. Credentials sent to `/api/admin/auth/login` endpoint.
3. Backend validates credentials and returns JWT tokens (access + refresh).
4. Access token stored in memory, refresh token in secure HTTP-only cookie.
5. All subsequent API requests include access token.
6. Token refresh mechanism handles token expiration.
