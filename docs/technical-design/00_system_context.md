# System Context & Architecture

## 1. System Architecture Overview

### 1.1 Architecture Diagram

```Plain
Copy
┌─────────────────────┐     ┌─────────────────────┐
│                     │     │                     │
│  Public Website     │     │  Admin Portal       │
│  (React/TypeScript) │     │  (React/TypeScript) │
│                     │     │                     │
└─────────┬───────────┘     └─────────┬───────────┘
          │                           │
          │                           │
          │     ┌───────────────────────────────┐
          │     │                               │
          └─────►  Backend API                  │
                │  (FastAPI/Python)             │
                │                               │
                └─┬─────────────┬───────────┬───┘
                  │             │           │
       ┌──────────▼──┐   ┌──────▼─────┐   ┌─▼───────────┐
       │             │   │            │   │             │
       │ PostgreSQL  │   │Elasticsearch│   │ Object     │
       │ Database    │   │(OpenSearch)│   │ Storage     │
       │             │   │            │   │ (S3)        │
       └─────────────┘   └────────────┘   └─────────────┘
```

### 1.2 Component Interaction Flow

1. **Content Flow**:
    - Admin Portal → Backend API → PostgreSQL (for content creation/management)
    - Backend API → Elasticsearch (for content indexing on publish)
    - Public Website → Backend API → Elasticsearch (for content search)
    - Public Website → Backend API → PostgreSQL (for content retrieval)

2. **Authentication Flow**:
    - Admin Portal → Backend API (JWT-based authentication)
    - All API endpoints secured with appropriate authentication mechanisms

3. **Deployment Architecture**:
    - Public Website: AWS Amplify
    - Admin Portal: AWS Amplify (separate deployment)
    - Backend API: AWS Elastic Beanstalk
    - Database: Amazon RDS (PostgreSQL)
    - Search: AWS OpenSearch
    - Media Storage: Amazon S3
    - CDN: Amazon CloudFront

## 15. Deployment Architecture

### 15.1 Deployment Process

1. **Build and Package**:
    - Frontend: Built as static assets (`npm run build`)
    - Backend: Packaged as a Docker container
    - Database: Migrations packaged with backend

2. **Deployment Flow**:
    - CI pipeline triggered by merge to main branch
    - Run tests and security scans
    - Build applications
    - Deploy infrastructure changes (if any)
    - Deploy backend to Elastic Beanstalk
    - Deploy frontends to AWS Amplify
    - Run smoke tests

3. **Rollback Mechanism**:
    - Automated rollback on failed smoke tests
    - Elastic Beanstalk application version management

### 15.2 Infrastructure Configuration

*(See Backend Documentation for Terraform specifics)*

## 16. Conclusion and Next Steps

### 16.1 Key Technical Decisions
- **React/TypeScript**: Ensures type safety and modern component architecture.
- **FastAPI**: Provides high performance and automatic documentation.
- **PostgreSQL + Elasticsearch**: Hybrid approach for reliable storage and fast search.
- **AWS Managed Services**: Reduces operational overhead (Amplify, RDS, OpenSearch).

### 16.2 Recommended Implementation Phases
1. **Phase 1**: Backend Core & Database (Entities, API Skeleton).
2. **Phase 2**: Admin Portal (Auth, Blog Management).
3. **Phase 3**: Public Website (Read-only views, Search).
4. **Phase 4**: Polish, Optimization, and Deployment.

### 16.3 Estimated Timeline
- **Weeks 1-2**: Backend Foundation.
- **Weeks 3-4**: Admin Portal MVP.
- **Weeks 5-6**: Public Website MVP.
- **Week 7**: Testing & Refinement.
