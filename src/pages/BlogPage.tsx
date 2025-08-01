import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { blogPosts, blogCategories } from '../data/blogPosts';
import BlogList from '../components/BlogList';
import { BlogAPI } from '../services/BlogAPI';
import { BlogPost } from '../types/blog';

const BlogPageContainer = styled.div`
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

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.gray};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const postsData = await BlogAPI.getPosts();
        setPosts(postsData);
        
        const uniqueCategories = Array.from(
          new Set(postsData.flatMap(post => post.categories))
        );

        setCategories(uniqueCategories);
        
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogData();
  }, []);
  
  return (
    <BlogPageContainer>
      <PageHeader>
        <PageTitle>Blog</PageTitle>
        <PageDescription>
          Thoughts, stories and ideas about all aspects of Software Engineering
        </PageDescription>
      </PageHeader>
      
      <ContentContainer>
        {loading ? (
          <LoadingMessage>Loading blog posts...</LoadingMessage>) : error ? (
          <ErrorMessage>{error}</ErrorMessage>) : (
          <BlogList posts={posts} categories={categories} />
        )}
      </ContentContainer>
    </BlogPageContainer>
  );
};

export default BlogPage;