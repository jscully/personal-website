import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BlogDetail from '../components/BlogDetail';
import { useBlogPost } from '../hooks/useBlogs';
import { getRelatedPosts } from '../data/blogPosts'; // Keeping this helper for now, or move to hook if API supports it


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
  
  // Get related posts if the current post exists
  // Note: In a real app, this should probably be part of the API response or a separate hook call
  const relatedPosts = post ? getRelatedPosts(post, 3) : [];
  
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
      <ContentContainer>
        <BlogDetail post={post} relatedPosts={relatedPosts} />
      </ContentContainer>
    </BlogPostPageContainer>
  );
};

export default BlogPostPage;