import React from 'react';
import styled from 'styled-components';
import { useAdminBlogs, useTags } from '../../hooks/useBlogs';
import Card from '../../components/common/Card';
import LoadingIndicator from '../../components/common/LoadingIndicator';

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(Card)`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0.5rem 0;
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const RecentPostsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
`;

const RecentPostItem = styled.li`
  padding: 0.75rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

const PostTitle = styled.span`
  font-weight: 500;
`;

const PostStatus = styled.span<{ $status: string }>`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background-color: ${({ $status }) =>
    $status === 'published' ? '#e6f4ea' : '#fef7e0'};
  color: ${({ $status }) =>
    $status === 'published' ? '#1e7e34' : '#856404'};
`;

const DashboardPage: React.FC = () => {
  const { data: blogs, isLoading: blogsLoading } = useAdminBlogs();
  const { data: tags, isLoading: tagsLoading } = useTags();

  if (blogsLoading || tagsLoading) {
    return <LoadingIndicator />;
  }

  const totalPosts = blogs?.length || 0;
  const publishedPosts = blogs?.filter(post => post.status === 'published').length || 0;
  const draftPosts = blogs?.filter(post => post.status === 'draft').length || 0;
  const totalTags = tags?.length || 0;

  const stats = [
    { label: 'Total Posts', value: totalPosts.toString() },
    { label: 'Published', value: publishedPosts.toString() },
    { label: 'Drafts', value: draftPosts.toString() },
    { label: 'Total Tags', value: totalTags.toString() },
  ];

  const recentPosts = blogs?.slice(0, 5) || [];

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Dashboard</h1>

      <DashboardGrid>
        {stats.map((stat) => (
          <StatCard key={stat.label}>
            <StatLabel>{stat.label}</StatLabel>
            <StatValue>{stat.value}</StatValue>
          </StatCard>
        ))}
      </DashboardGrid>

      <Card>
        <h3>Recent Posts</h3>
        {recentPosts.length > 0 ? (
          <RecentPostsList>
            {recentPosts.map((post) => (
              <RecentPostItem key={post.id}>
                <PostTitle>{post.title}</PostTitle>
                <PostStatus $status={post.status}>{post.status}</PostStatus>
              </RecentPostItem>
            ))}
          </RecentPostsList>
        ) : (
          <p style={{ marginTop: '1rem', color: '#666' }}>No posts yet.</p>
        )}
      </Card>
    </div>
  );
};

export default DashboardPage;
