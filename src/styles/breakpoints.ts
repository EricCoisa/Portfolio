// Breakpoints para responsividade
export const breakpoints = {
  mobile: '320px',
  mobileLarge: '480px',
  tablet: '768px',
  desktop: '1024px',
  desktopLarge: '1280px',
  desktopXL: '1440px',
};

// Media queries helpers
export const mediaQueries = {
  mobile: `@media (max-width: ${breakpoints.tablet})`,
  tablet: `@media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  desktopLarge: `@media (min-width: ${breakpoints.desktopLarge})`,
  
  // Específicos
  mobileOnly: `@media (max-width: 767px)`,
  tabletUp: `@media (min-width: ${breakpoints.tablet})`,
  desktopUp: `@media (min-width: ${breakpoints.desktop})`,
  
  // Para componentes específicos
  headerCollapse: `@media (max-width: 900px)`,
  navCollapse: `@media (max-width: 768px)`,
};

// Utilitários para spacing responsivo
export const spacing = {
  mobile: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
  },
  tablet: {
    xs: '6px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  desktop: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
    xxl: '64px',
  },
};

export const fontSizes = {
  mobile: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
  },
  tablet: {
    xs: '0.8125rem',  // 13px
    sm: '0.9375rem',  // 15px
    base: '1.0625rem', // 17px
    lg: '1.1875rem',  // 19px
    xl: '1.375rem',   // 22px
    '2xl': '1.625rem', // 26px
    '3xl': '2rem',    // 32px
    '4xl': '2.5rem',  // 40px
  },
  desktop: {
    xs: '0.875rem',   // 14px
    sm: '1rem',       // 16px
    base: '1.125rem', // 18px
    lg: '1.25rem',    // 20px
    xl: '1.5rem',     // 24px
    '2xl': '1.75rem', // 28px
    '3xl': '2.25rem', // 36px
    '4xl': '3rem',    // 48px
  },
};
