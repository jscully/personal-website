import React, { useState } from 'react';
import styled from 'styled-components';
import Projects from '../components/Projects';

const PageHeader = styled.div`
  text-align: center;
  padding: 6rem 2rem;
  background-color: ${({ theme }) => theme.colors.primary}10;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.heading};
`;

const PageDescription = styled.p`
  max-width: 600px;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.gray};
  font-size: 1.1rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem 0;
  flex-wrap: wrap;
  gap: 1rem;
`;

interface FilterButtonProps {
  active: boolean;
}

const FilterButton = styled.button<FilterButtonProps>`
  padding: 0.6rem 1.5rem;
  border-radius: 30px;
  font-weight: 500;
  background-color: ${({ active, theme }) => active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) => active ? 'white' : theme.colors.text};
  border: 1px solid ${({ active, theme }) => active ? theme.colors.primary : '#ddd'};
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: ${({ active, theme }) => 
      active ? theme.colors.primary : theme.colors.primary}10;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'design', label: 'UI/UX Design' }
  ];
  
  return (
    <>
      <PageHeader>
        <PageTitle>My Projects</PageTitle>
        <PageDescription>
          A showcase of my work, personal projects, and experiments
        </PageDescription>
      </PageHeader>
      
      <FilterContainer>
        {filters.map((filter) => (
          <FilterButton key={filter.id} active={activeFilter === filter.id} onClick={() => setActiveFilter(filter.id)}>
            {filter.label}
          </FilterButton>
        ))}
      </FilterContainer>
      
      <Projects />
    </>
  );
};

export default ProjectsPage;