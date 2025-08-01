export interface ThemeType {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
      heading: string;
      light: string;
      dark: string;
      gray: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    transitions: {
      default: string;
      fast: string;
      slow: string;
    };
    shadows: {
      small: string;
      medium: string;
      large: string;
    };
  }
  
  export const theme: ThemeType = {
    colors: {
      primary: '#0070f3',
      secondary: '#6d28d9',
      accent: '#00ced1',
      background: '#ffffff',
      text: '#333333',
      heading: '#111111',
      light: '#ffffff',
      dark: '#000000',
      gray: '#666666',
    },
    breakpoints: {
      mobile: '576px',
      tablet: '768px',
      desktop: '1200px',
    },
    transitions: {
      default: '0.3s ease',
      fast: '0.15s ease',
      slow: '0.5s ease',
    },
    shadows: {
      small: '0 2px 8px rgba(0, 0, 0, 0.1)',
      medium: '0 4px 12px rgba(0, 0, 0, 0.1)',
      large: '0 8px 24px rgba(0, 0, 0, 0.1)',
    },
  };