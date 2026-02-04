import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';
import { useTags } from '../../hooks/useBlogs';
import { BlogAPI } from '../../services/BlogAPI';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import TagChip from '../../components/common/TagChip';
import Toast, { ToastType } from '../../components/common/Toast';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const TagGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const TagCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const TagManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: tags, isLoading, error } = useTags();
  const [toast, setToast] = useState<{ message: string; type: ToastType; isVisible: boolean }>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const handleDelete = async (tagId: string, tagName: string) => {
    if (!window.confirm(`Are you sure you want to delete the tag "${tagName}"?`)) {
      return;
    }

    const success = await BlogAPI.deleteTag(tagId);
    if (success) {
      showToast('Tag deleted successfully!', 'success');
      await queryClient.invalidateQueries({ queryKey: ['tags'] });
    } else {
      showToast('Failed to delete tag. Please try again.', 'error');
    }
  };

  if (isLoading) return <LoadingIndicator />;
  if (error) return <div>Error loading tags.</div>;

  return (
    <div>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
      <Header>
        <h1>Tag Management</h1>
        <Button onClick={() => navigate('/admin/tags/new')}>Add New Tag</Button>
      </Header>

      <TagGrid>
        {tags?.map((tag) => (
          <TagCard key={tag.id}>
            <TagChip label={tag.name} clickable={false} />
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <Link to={`/admin/tags/edit/${tag.id}`}>
                <Button variant="outline" size="small">Edit</Button>
              </Link>
              <Button
                variant="outline"
                size="small"
                style={{ color: 'red', borderColor: 'red' }}
                onClick={() => handleDelete(tag.id, tag.name)}
              >
                Delete
              </Button>
            </div>
          </TagCard>
        ))}
      </TagGrid>
    </div>
  );
};

export default TagManagementPage;
