import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from './Input';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const SearchInput = styled(Input)`
  padding-left: 3rem;
  border-radius: 30px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.gray};
  display: flex;
  align-items: center;
  pointer-events: none;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search articles...", 
  initialValue = "" 
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  return (
    <SearchContainer>
      <SearchIcon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </SearchIcon>
      <SearchInput 
        type="text" 
        placeholder={placeholder} 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </SearchContainer>
  );
};

export default SearchBar;
