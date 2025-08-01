import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getPostsByCategory, blogCategories } from '../data/blogPosts';
import BlogList from '../components/BlogList';


const CategoryPageContainer = styled.div`
  padding: 4rem 0;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.heading};
`;

const PageDescription = styled.p`
  max-width: 600px;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.gray};
  font-size: 1.1rem;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Find the category by slug
  const category = slug ? blogCategories.find(c => c.slug === slug) : undefined;
  
  // Get posts in this category
  const posts = slug ? getPostsByCategory(slug) : [];
  
  // Redirect to the blog page if the category doesn't exist or has no posts
  useEffect(() => {
    if ((!category || posts.length === 0) && slug) {
      navigate('/blog', { replace: true });
    }
  }, [category, posts, slug, navigate]);
  
  // Show nothing while checking the category
  if (!category) {
    return null;
  }
  
  return (
    <CategoryPageContainer>
      <PageHeader>
        <PageTitle>{category.name}</PageTitle>
        <PageDescription>
          {category.description || `${posts.length} article${posts.length !== 1 ? 's' : ''} in "${category.name}"`}
        </PageDescription>
      </PageHeader>
      
      <ContentContainer>
        <BlogList posts={posts} />
      </ContentContainer>
    </CategoryPageContainer>
  );
};

export default CategoryPage;