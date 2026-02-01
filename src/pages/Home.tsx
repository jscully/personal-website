import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import BlogList from '../components/BlogList';
import PageContainer from '../components/common/PageContainer';
import Button from '../components/common/Button';
import SEO from '../components/common/SEO';
import { useBlogs } from '../hooks/useBlogs';

const FeaturedSection = styled.section`
  padding: 5rem 0;
  background-color: ${({ theme }) => theme.colors.background};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 60px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Home: React.FC = () => {
  const { data: posts } = useBlogs();
  // Filter for featured posts if the API supported it, or just take the first 3 recent ones
  const featuredPosts = posts ? posts.slice(0, 3) : [];

  return (
    <>
      <SEO 
        title="Home" 
        description="Software & Strategy Hobbiest. Portfolio and blog of Joe Scully." 
      />
      <Hero 
        name="Joe Scully"
        tagline="Software & Strategy Hobbiest"
        description="I build things, write things, test things"
      />
      <About />
      <FeaturedSection>
        <PageContainer>
          <SectionHeader>
            <SectionTitle>Featured Posts</SectionTitle>
            <Link to="/blog">
              <Button variant="outline">View All Posts</Button>
            </Link>
          </SectionHeader>
          <BlogList posts={featuredPosts} />
        </PageContainer>
      </FeaturedSection>
      <Projects />
      <Contact />
    </>
  );
};

export default Home;