import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAdminBlogs } from '../../hooks/useBlogs';
import { BlogAPI } from '../../services/BlogAPI';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import ConfirmDialog from '../../components/common/ConfirmDialog';

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

const StatusBadge = styled.span<{ status: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${({ status }) => (status === 'published' ? '#d1fae5' : '#fef3c7')};
  color: ${({ status }) => (status === 'published' ? '#065f46' : '#92400e')};
  text-transform: capitalize;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const AdminBlogList: React.FC = () => {
  const { data: posts, isLoading, error, refetch } = useAdminBlogs();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await BlogAPI.deletePost(deleteId);
      refetch();
      setDeleteId(null);
    } catch (err) {
      alert('Failed to delete post');
    } finally {
      setIsDeleting(false);
    }
  };

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
                <StatusBadge status={post.status}>{post.status}</StatusBadge>
              </Td>
              <Td>{post.publishDate ? new Date(post.publishDate).toLocaleDateString() : 'N/A'}</Td>
              <Td>
                <ActionButtons>
                  <Link to={`/admin/blogs/edit/${post.slug}`}>
                    <Button variant="outline" size="small">Edit</Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="small" 
                    style={{ color: 'red', borderColor: 'red' }}
                    onClick={() => setDeleteId(post.id)}
                  >
                    Delete
                  </Button>
                </ActionButtons>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Post"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default AdminBlogList;
