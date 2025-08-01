import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BlogPost } from '../types/blog';

const BlogListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const CategoryFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

interface FilterButtonProps {
  active: boolean;
}

const FilterButton = styled.button<FilterButtonProps>`
  padding: 0.5rem 1rem;
  border-radius: 30px;
  background-color: ${({ active, theme }) => 
    active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) => 
    active ? 'white' : theme.colors.text};
  border: 1px solid ${({ active, theme }) => 
    active ? theme.colors.primary : '#ddd'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ active, theme }) => 
      active ? theme.colors.primary : `${theme.colors.primary}10`};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const BlogCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
`;

const BlogCardImage = styled.div<{ imageUrl: string }>`
  height: 200px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

const BlogCardContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const BlogCardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.heading};
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const BlogCardMeta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray};
`;

const BlogCardDate = styled.span`
  margin-right: 1rem;
`;

const BlogCardReadTime = styled.span``;

const BlogCardExcerpt = styled.p`
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
`;

const Tag = styled(Link)`
  font-size: 0.8rem;
  padding: 0.3rem 0.7rem;
  border-radius: 30px;
  background-color: ${({ theme }) => `${theme.colors.primary}10`};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const BlogReadMore = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

interface BlogListProps {
  posts: BlogPost[];
  categories?: string[];
}

const BlogList: React.FC<BlogListProps> = ({ posts, categories = [] }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(post => post.categories.includes(activeCategory));
    
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <>
      {categories.length > 0 && (
        <CategoryFilter>
          <FilterButton 
            active={activeCategory === 'all'} 
            onClick={() => setActiveCategory('all')}
          >
            All
          </FilterButton>
          {categories.map(category => (
            <FilterButton 
              key={category} 
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </FilterButton>
          ))}
        </CategoryFilter>
      )}
      
      <BlogListContainer>
        {filteredPosts.map(post => (
          <BlogCard key={post.id}>
            <BlogCardImage imageUrl={post.coverImage} />
            <BlogCardContent>
              <BlogCardTitle>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </BlogCardTitle>
              <BlogCardMeta>
                <BlogCardDate>{formatDate(post.publishDate)}</BlogCardDate>
                <BlogCardReadTime>{post.readTime} min read</BlogCardReadTime>
              </BlogCardMeta>
              <BlogCardExcerpt>{post.excerpt}</BlogCardExcerpt>
              <TagsContainer>
                {post.tags.slice(0, 3).map(tag => (
                  <Tag key={tag} to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}>
                    {tag}
                  </Tag>
                ))}
              </TagsContainer>
              <BlogReadMore to={`/blog/${post.slug}`}>Read More</BlogReadMore>
            </BlogCardContent>
          </BlogCard>
        ))}
      </BlogListContainer>
    </>
  );
};

export default BlogList;