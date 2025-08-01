import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getPostsByTag, blogTags } from '../data/blogPosts';
import BlogList from '../components/BlogList';


const TagPageContainer = styled.div`
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

const TagPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const tag = slug ? blogTags.find(t => t.slug === slug) : undefined;
  const posts = slug ? getPostsByTag(slug) : [];
  
  useEffect(() => {
    if ((!tag || posts.length === 0) && slug) {
      navigate('/blog', { replace: true });
    }
  }, [tag, posts, slug, navigate]);

  if (!tag) {
    return null;
  }
  
  return (
    <TagPageContainer>
      <PageHeader>
        <PageTitle>#{tag.name}</PageTitle>
        <PageDescription>
          {posts.length} article{posts.length !== 1 ? 's' : ''} tagged with "{tag.name}"
        </PageDescription>
      </PageHeader>
      
      <ContentContainer>
        <BlogList posts={posts} />
      </ContentContainer>
    </TagPageContainer>
  );
};

export default TagPage;