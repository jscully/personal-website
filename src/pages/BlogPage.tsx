import React, { useState } from 'react';
import styled from 'styled-components';
import BlogList from '../components/BlogList';
import Pagination from '../components/common/Pagination';
import SearchBar from '../components/common/SearchBar';
import SEO from '../components/common/SEO';
import { useBlogs, useCategories } from '../hooks/useBlogs';

const BlogPageContainer = styled.div`
  padding: 4rem 0;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
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

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.gray};
  font-size: 1.2rem;
`;

const BlogPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const postsPerPage = 6;

  const { data: posts, isLoading: postsLoading, error: postsError } = useBlogs(undefined, undefined, searchQuery);
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on search
  };
  
  return (
    <BlogPageContainer>
      <SEO 
        title="Blog" 
        description="Read my latest thoughts and stories about software engineering, web development, and more." 
      />
      <PageHeader>
        <PageTitle>Blog</PageTitle>
        <PageDescription>
          Thoughts, stories and ideas about all aspects of Software Engineering
        </PageDescription>
      </PageHeader>

      <ContentContainer>
        <SearchBar onSearch={handleSearch} />

        {loading ? (
          <LoadingMessage>Loading blog posts...</LoadingMessage>) : error ? (
          <ErrorMessage>{error}</ErrorMessage>) : (
          <>
            {postList.length > 0 ? (
              <>
                <BlogList posts={currentPosts} categories={categories?.map(c => c.name)} />
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={handlePageChange} 
                />
              </>
            ) : (
              <NoResults>No articles found matching your search.</NoResults>
            )}
          </>
        )}
      </ContentContainer>
    </BlogPageContainer>
  );
};

export default BlogPage;