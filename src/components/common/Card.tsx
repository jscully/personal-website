import styled from 'styled-components';

interface CardProps {
  padding?: string;
  hoverable?: boolean;
}

const Card = styled.div<CardProps>`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: ${({ padding }) => padding || '1.5rem'};
  transition: transform ${({ theme }) => theme.transitions.default}, box-shadow ${({ theme }) => theme.transitions.default};
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);

  ${({ hoverable, theme }) =>
    hoverable &&
    `
    cursor: pointer;
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${theme.shadows.medium};
    }
  `}
`;

export default Card;
