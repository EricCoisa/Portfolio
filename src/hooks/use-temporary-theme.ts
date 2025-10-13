import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

/**
 * Hook que temporariamente define um tema específico para a página,
 * salvando o tema atual e restaurando quando o componente é desmontado
 */
export const useTemporaryTheme = (temporaryTheme: string) => {
  const { theme, setTheme } = useTheme();
  const originalThemeRef = useRef<string | undefined>(undefined);
  const hasSetTemporaryTheme = useRef(false);

  // Effect para salvar o tema original e aplicar o temporário apenas uma vez
  useEffect(() => {
    // Aguarda a hidratação do tema
    if (theme === undefined) return;

    // Salva o tema original apenas na primeira vez
    if (originalThemeRef.current === undefined) {
      originalThemeRef.current = theme;
      console.log(`Salvando tema original: ${theme}`);
    }

    // Aplica o tema temporário apenas se ainda não foi aplicado e é diferente
    if (!hasSetTemporaryTheme.current && theme !== temporaryTheme) {
      console.log(`Aplicando tema temporário: ${temporaryTheme}`);
      setTheme(temporaryTheme);
      hasSetTemporaryTheme.current = true;
    }
  }, [theme, setTheme, temporaryTheme]);

  // Cleanup: restaura o tema original quando o componente é desmontado
  useEffect(() => {
    return () => {
      if (originalThemeRef.current && originalThemeRef.current !== temporaryTheme && hasSetTemporaryTheme.current) {
        console.log(`Restaurando tema original: ${originalThemeRef.current}`);
        // Pequeno delay para evitar conflitos durante navegação
        setTimeout(() => {
          setTheme(originalThemeRef.current!);
        }, 50);
      }
    };
  }, [setTheme, temporaryTheme]);
};