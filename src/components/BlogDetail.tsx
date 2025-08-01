import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BlogPost } from '../types/blog';
import ReactMarkdown from 'react-markdown';

const BlogDetailContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
  
  svg {
    margin-right: 0.5rem;
    width: 18px;
    height: 18px;
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.heading};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.8rem;
  object-fit: cover;
`;

const AuthorName = styled.span`
  font-weight: 500;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.9rem;
  
  svg {
    width: 16px;
    height: 16px;
    margin-right: 0.4rem;
  }
`;

const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Category = styled(Link)`
  font-size: 0.9rem;
  padding: 0.3rem 0.8rem;
  border-radius: 30px;
  background-color: ${({ theme }) => `${theme.colors.secondary}15`};
  color: ${({ theme }) => theme.colors.secondary};
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: white;
  }
`;

const Content = styled.div`
  margin-bottom: 3rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
  
  h1, h2, h3, h4, h5, h6 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.heading};
  }
  
  p {
    margin-bottom: 1.5rem;
  }
  
  img {
    max-width: 100%;
    border-radius: 8px;
    margin: 1.5rem 0;
  }
  
  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  blockquote {
    margin: 1.5rem 0;
    padding: 1rem 1.5rem;
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => `${theme.colors.primary}05`};
    font-style: italic;
  }
  
  code {
    font-family: monospace;
    background-color: #f5f5f5;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9em;
  }
  
  pre {
    background-color: #282c34;
    color: #abb2bf;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.5rem 0;
    
    code {
      background-color: transparent;
      padding: 0;
      color: inherit;
    }
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 0.75rem;
    text-align: left;
  }
  
  th {
    background-color: #f5f5f5;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 3rem;
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

const SocialShare = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
`;

const ShareTitle = styled.span`
  margin-right: 1rem;
  font-weight: 500;
`;

const ShareButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ShareButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-3px);
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

interface LikeButtonProps {
  liked: boolean;
}

const LikeButton = styled.button<LikeButtonProps>`
  display: flex;
  align-items: center;
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  border: none;
  background-color: ${({ liked, theme }) => 
    liked ? theme.colors.primary : `${theme.colors.primary}10`};
  color: ${({ liked }) => 
    liked ? 'white' : 'inherit'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
  
  svg {
    width: 20px;
    height: 20px;
    margin-right: 0.5rem;
  }
`;

const LikeCount = styled.span`
  margin-left: 0.5rem;
`;

const RelatedPosts = styled.div`
  margin-top: 4rem;
`;

const RelatedPostsTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 60px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const RelatedPostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const RelatedPostCard = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const RelatedPostImage = styled.div<{ imageUrl: string }>`
  height: 150px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

const RelatedPostContent = styled.div`
  padding: 1rem;
`;

const RelatedPostTitle = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.heading};
`;

const RelatedPostDate = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray};
`;

interface BlogDetailProps {
  post: BlogPost;
  relatedPosts?: BlogPost[];
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post, relatedPosts = [] }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const navigate = useNavigate();
  
  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount(prev => prev + 1);
    } else {
      setLiked(false);
      setLikeCount(prev => prev - 1);
    }
  };
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Generate social share URLs
  const pageUrl = window.location.href;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(post.title)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
  
  return (
    <BlogDetailContainer>
      <BackLink to="/blog">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Blog
      </BackLink>
      
      <CoverImage src={post.coverImage} alt={post.title} />
      
      <Categories>
        {post.categories.map(category => (
          <Category 
            key={category} 
            to={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {category}
          </Category>
        ))}
      </Categories>
      
      <Title>{post.title}</Title>
      
      <MetaInfo>
        <AuthorInfo>
          <AuthorAvatar src={post.author.avatar || '/assets/images/profile-placeholder.jpg'} alt={post.author.name} />
          <AuthorName>{post.author.name}</AuthorName>
        </AuthorInfo>
        
        <MetaItem>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          {formatDate(post.publishDate)}
        </MetaItem>
        
        <MetaItem>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          {post.readTime} min read
        </MetaItem>
      </MetaInfo>
      
      <Content>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </Content>
      
      <TagsContainer>
        {post.tags.map(tag => (
          <Tag 
            key={tag} 
            to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
          >
            #{tag}
          </Tag>
        ))}
      </TagsContainer>
      
      <SocialShare>
        <ShareTitle>Share:</ShareTitle>
        <ShareButtons>
          <ShareButton href={twitterShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </ShareButton>
          <ShareButton href={facebookShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </ShareButton>
          <ShareButton href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </ShareButton>
        </ShareButtons>
      </SocialShare>
      
      <LikeButton liked={liked} onClick={handleLike}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        {liked ? 'Liked' : 'Like'}
        <LikeCount>{likeCount}</LikeCount>
      </LikeButton>
      
      {relatedPosts.length > 0 && (
        <RelatedPosts>
          <RelatedPostsTitle>Related Posts</RelatedPostsTitle>
          <RelatedPostsGrid>
            {relatedPosts.map(relatedPost => (
              <RelatedPostCard key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                <RelatedPostImage imageUrl={relatedPost.coverImage} />
                <RelatedPostContent>
                  <RelatedPostTitle>{relatedPost.title}</RelatedPostTitle>
                  <RelatedPostDate>{formatDate(relatedPost.publishDate)}</RelatedPostDate>
                </RelatedPostContent>
              </RelatedPostCard>
            ))}
          </RelatedPostsGrid>
        </RelatedPosts>
      )}
    </BlogDetailContainer>
  );
};

export default BlogDetail;