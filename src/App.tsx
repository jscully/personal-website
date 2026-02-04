import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import GlobalStyles from './styles/GlobalStyles';
import { theme } from './styles/Theme';
import LoadingIndicator from './components/common/LoadingIndicator';
import AdminLayout from './components/layout/AdminLayout';
import RequireAuth from './components/auth/RequireAuth';

// Public Pages
const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ContactPage = lazy(() => import('./pages/ContactsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const TagPage = lazy(() => import('./pages/TagPage'));

// Admin Pages
const LoginPage = lazy(() => import('./pages/admin/LoginPage'));
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
const AdminBlogList = lazy(() => import('./pages/admin/AdminBlogList'));
const BlogEditorPage = lazy(() => import('./pages/admin/BlogEditorPage'));
const TagManagementPage = lazy(() => import('./pages/admin/TagManagementPage'));
const AddTagPage = lazy(() => import('./pages/admin/AddTagPage'));

const PublicLayout = () => (
  <>
    <Navbar />
    <main>
      <Suspense fallback={<LoadingIndicator />}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
  </>
);

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Suspense fallback={<LoadingIndicator />}>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/contact" element={<ContactPage />} />

              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/blog/tag/:slug" element={<TagPage />} />
              <Route path="/blog/category/:slug" element={<CategoryPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<LoginPage />} />
            
            <Route path="/admin" element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }>
              <Route index element={<DashboardPage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="blogs" element={<AdminBlogList />} />
              <Route path="blogs/new" element={<BlogEditorPage />} />
              <Route path="blogs/edit/:id" element={<BlogEditorPage />} />
              <Route path="tags" element={<TagManagementPage />} />
              <Route path="tags/new" element={<AddTagPage />} />
              <Route path="analytics" element={<div>Analytics Coming Soon</div>} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;