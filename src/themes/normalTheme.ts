import type { DefaultTheme } from "styled-components";
import { Theme } from "../types/themes";

const normalTheme = {
  name: Theme.Default,
  colors: {
    background: "#121212",
    cardBackground: "#1E1E1E",
    primary: "#1E90FF",
    text: "#E0E0E0",
    textSecondary: "#AAAAAA",
    floor: "rgba(255, 255, 255, 0.18)",
    detail: "#E0E0E0",
  },
  blur: "none",
  border: "1px solid rgba(255,255,255,0.05)",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
  glassOverlay: "none",
  hoverHighlight: "rgba(255, 255, 255, 0.2)",
  header: {
    isOnTop: {
      borderRadius: "unset",
      width: "100%",
      left: "0",
      transform: "unset",
      height: "90px",
    },
    isOnScroll: {
      borderRadius: "unset",
      width: "100%",
      left: "0",
      transform: "unset",
      height: "90px",
    }
  },
  badge: {
    background: "rgba(255, 255, 255, 0.1)",
    color: "#FFFFFF",
    borderRadius: "12px",
    padding: "4px 8px",
  }
} as DefaultTheme;

export default normalTheme;
