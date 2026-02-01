import React from 'react';
import styled from 'styled-components';
import Card from '../../components/common/Card';

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

const DashboardPage: React.FC = () => {
  const stats = [
    { label: 'Total Posts', value: '12' },
    { label: 'Published', value: '8' },
    { label: 'Drafts', value: '4' },
    { label: 'Total Views', value: '1,245' },
  ];

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
        <h3>Recent Activity</h3>
        <p style={{ marginTop: '1rem', color: '#666' }}>No recent activity to show.</p>
      </Card>
    </div>
  );
};

export default DashboardPage;
