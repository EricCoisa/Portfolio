import styled from 'wrapper-styled-components';
import { css, keyframes } from 'styled-components';

// Detecta preferência de movimento reduzido
const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const BackgroundContainer = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
`;

const noiseAnim = keyframes`
  0% { filter: url(#noise); }
  100% { filter: url(#noise); }
`;

export const ProceduralSVG = styled.svg.attrs(() => ({
  viewBox: '0 0 1920 1080',
  width: '100%',
  height: '100%',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': 'true',
  style: { position: 'absolute', inset: 0, width: '100vw', height: '100vh', pointerEvents: 'none' }
}))`
  display: block;
  width: 100vw;
  height: 100vh;
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  background: ${({ theme }) => theme.colors.background};
  transition: background 0.3s;

  // Animação suave do ruído
  ${() => !prefersReducedMotion && css`
    animation: ${noiseAnim} 12s linear infinite;
  `}
`;


const swirl = keyframes`
  0% { transform: rotate(0deg) scale(1); filter: saturate(140%); }
  50% { transform: rotate(180deg) scale(1.02); filter: saturate(160%); }
  100% { transform: rotate(360deg) scale(1); filter: saturate(140%); }
`;

export const Background = styled.div<{
  viewColor?: string;
  viewBg?: string;
}>`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;

  /* Base levemente translúcida do tema + cor da view */
  background:
    radial-gradient(1200px 800px at 10% 10%, ${({ viewColor }) => viewColor || 'rgba(155,89,182,0.20)'}, transparent 60%),
    radial-gradient(1000px 700px at 90% 20%, ${({ viewBg }) => viewBg || 'rgba(30,144,255,0.18)'}, transparent 55%),
    radial-gradient(900px 700px at 20% 85%, rgba(255,255,255,0.08), transparent 60%),
    ${({ theme }) => theme.colors.background};
  transition: background 0.5s cubic-bezier(.4,0,.2,1);

  /* Camada dinâmica com conic-gradient (brilho líquido) */
  &::before {
    content: "";
    position: absolute;
    inset: -20%;
    background:
      conic-gradient(from 0deg at 50% 50%,
        rgba(255,255,255,0.08),
        ${({ viewColor }) => viewColor || 'rgba(155,89,182,0.06)'},
        ${({ viewBg }) => viewBg || 'rgba(30,144,255,0.06)'},
        rgba(255,255,255,0.08));
    mix-blend-mode: screen;
    filter: blur(40px);
    opacity: 0.6;
    animation: ${swirl} 38s linear infinite;
    transition: background 0.5s cubic-bezier(.4,0,.2,1);
  }

  /* Granulado fino (sem imagem) usando múltiplas sombras difusas */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0.18;
    backdrop-filter: ${({ theme }) => theme.blur};
    /* em LiquidGlass isso realça o efeito; no defaultTheme seu blur é "none" */
  }
`;


// O SVG procedural será renderizado no componente React, usando o tema via props.
