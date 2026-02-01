import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';


import Home from './pages/Home';  
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactsPage';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import GlobalStyles from './styles/GlobalStyles';
import { theme } from './styles/Theme';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import CategoryPage from './pages/CategoryPage';
import TagPage from './pages/TagPage';

// Admin Pages
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import AdminBlogList from './pages/admin/AdminBlogList';
import BlogEditorPage from './pages/admin/BlogEditorPage';
import TagManagementPage from './pages/admin/TagManagementPage';
import AdminLayout from './components/layout/AdminLayout';
import RequireAuth from './components/auth/RequireAuth';

const PublicLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
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
            <Route path="blogs/edit/:slug" element={<BlogEditorPage />} />
            <Route path="tags" element={<TagManagementPage />} />
            <Route path="analytics" element={<div>Analytics Coming Soon</div>} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;