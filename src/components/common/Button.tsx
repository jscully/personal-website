import styled, { css } from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  border: 2px solid transparent;
  outline: none;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          padding: 0.4rem 0.8rem;
          font-size: 0.875rem;
        `;
      case 'large':
        return css`
          padding: 0.8rem 1.6rem;
          font-size: 1.125rem;
        `;
      default:
        return css`
          padding: 0.6rem 1.2rem;
          font-size: 1rem;
        `;
    }
  }}

  ${({ variant, theme }) => {
    switch (variant) {
      case 'secondary':
        return css`
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.light};
          &:hover {
            background-color: ${theme.colors.primary};
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          color: ${theme.colors.primary};
          border-color: ${theme.colors.primary};
          &:hover {
            background-color: ${theme.colors.primary};
            color: ${theme.colors.light};
          }
        `;
      case 'ghost':
        return css`
          background-color: transparent;
          color: ${theme.colors.text};
          &:hover {
            background-color: rgba(0, 0, 0, 0.05);
          }
        `;
      default:
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.light};
          &:hover {
            opacity: 0.9;
          }
        `;
    }
  }}

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

Button.defaultProps = {
  variant: 'primary',
  size: 'medium',
};

export default Button;
