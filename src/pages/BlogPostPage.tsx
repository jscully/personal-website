import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BlogDetail from '../components/BlogDetail';
import { getBlogPostBySlug, getRelatedPosts } from '../data/blogPosts';


const BlogPostPageContainer = styled.div`
  padding: 2rem 0;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Find the blog post by slug
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  
  // Get related posts if the current post exists
  const relatedPosts = post ? getRelatedPosts(post, 3) : [];
  
  // Redirect to the blog page if the post doesn't exist
  useEffect(() => {
    if (!post && slug) {
      navigate('/blog', { replace: true });
    }
  }, [post, slug, navigate]);
  
  // Show nothing while checking the post
  if (!post) {
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