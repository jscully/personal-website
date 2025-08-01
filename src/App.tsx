import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />

            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/blog/tag/:slug" element={<TagPage />} />
            <Route path="/blog/category/:slug" element={<CategoryPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;