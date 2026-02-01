import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BlogList from '../components/BlogList';
import { useBlogs } from '../hooks/useBlogs';

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
  
  const { data: posts, isLoading } = useBlogs(undefined, slug);
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <TagPageContainer>
      <PageHeader>
        <PageTitle>#{slug}</PageTitle>
        <PageDescription>
          Articles tagged with "{slug}"
        </PageDescription>
      </PageHeader>
      
      <ContentContainer>
        <BlogList posts={posts || []} />
      </ContentContainer>
    </TagPageContainer>
  );
};

export default TagPage;