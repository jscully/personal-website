import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAdminBlogs } from '../../hooks/useBlogs';
import { BlogAPI } from '../../services/BlogAPI';
import Button from '../../components/common/Button';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Toast, { ToastType } from '../../components/common/Toast';

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

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.gray};
  background: white;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const AdminBlogList: React.FC = () => {
  const { data: posts, isLoading, error, refetch } = useAdminBlogs();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType; isVisible: boolean }>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  useEffect(() => {
    if (error) {
      setToast({ 
        message: 'Failed to load blog posts. Please check your connection or backend.', 
        type: 'error', 
        isVisible: true 
      });
    }
  }, [error]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await BlogAPI.deletePost(deleteId);
      setToast({ message: 'Post deleted successfully', type: 'success', isVisible: true });
      refetch();
      setDeleteId(null);
    } catch (err) {
      setToast({ message: 'Failed to delete post', type: 'error', isVisible: true });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) return <LoadingIndicator />;

  return (
    <div>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
      <Header>
        <h1>Blog Management</h1>
        <Link to="/admin/blogs/new">
          <Button>Create New Post</Button>
        </Link>
      </Header>

      {(!posts || posts.length === 0) ? (
        <EmptyState>
          <h3>No posts found</h3>
          <p>Get started by creating your first blog post.</p>
        </EmptyState>
      ) : (
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
            {posts.map((post) => (
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
      )}

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
