import type { DefaultTheme } from "styled-components";
import { Theme } from "../types/themes";

const liquidGlassTheme = {
  name: Theme.LiquidGlass,
  colors: {
    background: "rgba(30, 30, 60, 0.35)",
    cardBackground: "rgba(255, 255, 255, 0.18)",
    primary: "#1E90FF",
    text: "#F3F6FF",
    textSecondary: "#D1D6E0",
    floor: "rgba(255, 255, 255, 0.18)",
    detail: "#3a3a3aff",
  },
  blur: "blur(18px)",
  border: "1px solid rgba(255, 255, 255, 0.4)",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255,255,255,0.25)",
  glassOverlay: "linear-gradient(120deg, rgba(155,89,182,0.18) 0%, rgba(30,144,255,0.12) 100%)",
  hoverHighlight: "rgba(255, 255, 255, 0.2)"
} as DefaultTheme;

export default liquidGlassTheme;
