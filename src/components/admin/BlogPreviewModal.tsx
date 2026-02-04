import React from 'react';
import styled from 'styled-components';
import { BlogPost } from '../../types/blog';
import BlogDetail from '../BlogDetail';
import Button from '../common/Button';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1001;
`;

const PreviewBadge = styled.span`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  margin-left: 1rem;
`;

const ModalContent = styled.div`
  background-color: white;
  min-height: calc(100vh - 60px);
  padding: 2rem;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

interface BlogPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formValues: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    categories: string;
    tags: string;
    status: string;
    reading_time: number;
    publishDate: string | null;
  };
}

const BlogPreviewModal: React.FC<BlogPreviewModalProps> = ({ isOpen, onClose, formValues }) => {
  if (!isOpen) return null;

  // Transform form values to BlogPost format
  const previewPost: BlogPost = {
    id: 'preview',
    title: formValues.title || 'Untitled Post',
    slug: formValues.slug || 'preview',
    content: formValues.content || '',
    excerpt: formValues.excerpt || '',
    coverImage: '/assets/images/blog/default.jpg',
    publishDate: formValues.publishDate || new Date().toISOString(),
    tags: formValues.tags
      ? formValues.tags.split(',').map(t => t.trim()).filter(Boolean)
      : [],
    categories: formValues.categories
      ? formValues.categories.split(',').map(c => c.trim()).filter(Boolean)
      : [],
    author: {
      name: 'Joe Scully',
      avatar: '/assets/images/profile-placeholder.jpg',
    },
    readTime: formValues.reading_time || 5,
    likes: 0,
    featured: false,
    status: formValues.status || 'draft',
  };

  return (
    <ModalOverlay>
      <ModalHeader>
        <div>
          <span>Preview Mode</span>
          <PreviewBadge>Draft</PreviewBadge>
        </div>
        <Button variant="outline" onClick={onClose} style={{ color: 'white', borderColor: 'white' }}>
          Close Preview
        </Button>
      </ModalHeader>
      <ModalContent>
        <ContentContainer>
          <BlogDetail post={previewPost} relatedPosts={[]} />
        </ContentContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default BlogPreviewModal;
