import React, { useState } from 'react';
import styled from 'styled-components';
import BlogList from '../components/BlogList';
import Pagination from '../components/common/Pagination';
import { useBlogs, useCategories } from '../hooks/useBlogs';

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
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const { data: posts, isLoading: postsLoading, error: postsError } = useBlogs();
  const { data: categories } = useCategories();
  
  const loading = postsLoading;
  const error = postsError ? 'Failed to load blog posts. Please try again later.' : null;

  // Pagination Logic
  const postList = posts || [];
  const totalPages = Math.ceil(postList.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
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
          <>
            <BlogList posts={currentPosts} categories={categories?.map(c => c.name)} />
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          </>
        )}
      </ContentContainer>
    </BlogPageContainer>
  );
};

export default BlogPage;