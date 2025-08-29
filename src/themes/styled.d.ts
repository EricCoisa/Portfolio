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
    borderRadius: string;
    boxShadow: string;
    glassOverlay: string;
    header: {
      isOnTop:{
        height: string;
        width: string;
         transform: string;
          left: string;
           borderRadius: string;
      },
      isOnScroll:{
         height: string;
        width: string;
         transform: string;
          left: string;
           borderRadius: string;
      }
    };
    badge: {
      background: string;
      color: string;
      borderRadius: string;
      padding: string;
    };
  }
}
