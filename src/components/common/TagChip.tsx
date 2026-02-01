import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface TagChipProps {
  label: string;
  slug?: string;
  clickable?: boolean;
}

const Chip = styled.span<{ clickable?: boolean }>`
  display: inline-block;
  padding: 0.2rem 0.8rem;
  background-color: #f3f4f6;
  color: #4b5563;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 500;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  ${({ clickable }) => clickable && `
    cursor: pointer;
    &:hover {
      background-color: #e5e7eb;
      color: #111827;
    }
  `}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  
  &:hover {
    color: inherit;
  }
`;

const TagChip: React.FC<TagChipProps> = ({ label, slug, clickable = true }) => {
  const content = <Chip clickable={clickable}>{label}</Chip>;

  if (clickable && slug) {
    return <StyledLink to={`/blog/tag/${slug}`}>{content}</StyledLink>;
  }

  return content;
};

export default TagChip;
