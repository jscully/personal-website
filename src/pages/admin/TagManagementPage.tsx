import React from 'react';
import styled from 'styled-components';
import { useTags } from '../../hooks/useBlogs';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import TagChip from '../../components/common/TagChip';

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
  const { data: tags, isLoading, error } = useTags();

  if (isLoading) return <LoadingIndicator />;
  if (error) return <div>Error loading tags.</div>;

  return (
    <div>
      <Header>
        <h1>Tag Management</h1>
        <Button>Add New Tag</Button>
      </Header>

      <TagGrid>
        {tags?.map((tag) => (
          <TagCard key={tag.id}>
            <TagChip label={tag.name} clickable={false} />
            <div style={{ color: '#666', fontSize: '0.875rem' }}>{tag.count} Posts</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button variant="outline" size="small">Edit</Button>
              <Button variant="outline" size="small" style={{ color: 'red', borderColor: 'red' }}>Delete</Button>
            </div>
          </TagCard>
        ))}
      </TagGrid>
    </div>
  );
};

export default TagManagementPage;
