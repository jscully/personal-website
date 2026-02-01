import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useBlogs } from '../../hooks/useBlogs';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import LoadingIndicator from '../../components/common/LoadingIndicator';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  background-color: #f3f4f6;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const StatusBadge = styled.span<{ published: boolean }>`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${({ published }) => (published ? '#d1fae5' : '#fef3c7')};
  color: ${({ published }) => (published ? '#065f46' : '#92400e')};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const AdminBlogList: React.FC = () => {
  const { data: posts, isLoading, error } = useBlogs();

  if (isLoading) return <LoadingIndicator />;
  if (error) return <div>Error loading posts.</div>;

  return (
    <div>
      <Header>
        <h1>Blog Management</h1>
        <Link to="/admin/blogs/new">
          <Button>Create New Post</Button>
        </Link>
      </Header>

      <Table>
        <thead>
          <tr>
            <Th>Title</Th>
            <Th>Status</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((post) => (
            <tr key={post.id}>
              <Td>{post.title}</Td>
              <Td>
                <StatusBadge published={true}>Published</StatusBadge>
              </Td>
              <Td>{post.publishDate}</Td>
              <Td>
                <ActionButtons>
                  <Link to={`/admin/blogs/edit/${post.slug}`}>
                    <Button variant="outline" size="small">Edit</Button>
                  </Link>
                  <Button variant="outline" size="small" style={{ color: 'red', borderColor: 'red' }}>
                    Delete
                  </Button>
                </ActionButtons>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminBlogList;
