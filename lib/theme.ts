export const theme = {
  colors: {
    primary: {
      main: '#000000', // Black for text
      light: '#333333',
    },
    secondary: {
      main: '#ffffff', // White
      dark: '#f5f5f5',
    },
    gradient: {
      start: '#a8d0f0', // Light blue
      middle: '#ccd0f0', // Middle blue/purple
      end: '#e7d0f2',   // Light purple
    },
    background: {
      light: '#ffffff',
      dark: '#f9f9f9',
    },
    button: {
      background: '#333333',
      text: '#ffffff',
      hover: '#555555',
    }
  },
  fonts: {
    heading: 'var(--font-inter), sans-serif',
    body: 'var(--font-inter), sans-serif',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '5rem',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  }
};