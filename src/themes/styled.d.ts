import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    colors: {
      background: string;
      cardBackground: string;
      primary: string;
      text: string;
      textSecondary: string;
      floor: string;
      detail: string;
    };
    blur: string;
    border: string;
    boxShadow: string;
    glassOverlay: string;
  }
}
