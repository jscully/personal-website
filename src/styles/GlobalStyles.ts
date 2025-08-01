import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './Theme';

// Remove the theme prop requirement since it will come from ThemeProvider
const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    transition: all 0.2s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  main {
    min-height: calc(100vh - 140px);
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  section {
    padding: 5rem 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.heading};
  }

  p {
    margin-bottom: 1rem;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    main {
      padding: 0 1.5rem;
    }
    
    section {
      padding: 4rem 0;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    main {
      padding: 0 1rem;
    }
    
    section {
      padding: 3rem 0;
    }
  }
`;

export default GlobalStyles;