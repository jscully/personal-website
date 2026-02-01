import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BlogDetail from '../components/BlogDetail';
import SEO from '../components/common/SEO';
import { useBlogPost } from '../hooks/useBlogs';

const BlogPostPageContainer = styled.div`
  padding: 2rem 0;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
`;

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const { data: post, isLoading, isError } = useBlogPost(slug || '');
  
  // TODO: Implement related posts fetching from API
  const relatedPosts: any[] = [];
  
  // Redirect to the blog page if the post doesn't exist
  useEffect(() => {
    if (!isLoading && !post && slug) {
      navigate('/blog', { replace: true });
    }
  }, [post, slug, navigate, isLoading]);
  
  if (isLoading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  if (isError || !post) {
     return null; 
  }
  
  return (
    <BlogPostPageContainer>
      <SEO 
        title={post.title} 
        description={post.excerpt} 
        ogType="article" 
        ogImage={post.coverImage} 
      />
      <ContentContainer>
        <BlogDetail post={post} relatedPosts={relatedPosts} />
      </ContentContainer>
    </BlogPostPageContainer>
  );
};

export default BlogPostPage;