import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./utils/data.ts";
import { i18nInitPromise } from "./i18n/config";

// Aguarda o i18n ser inicializado antes de renderizar o React
async function initApp() {
  try {
    // Aguarda o carregamento das traduções
    await i18nInitPromise;
    // Renderiza o React somente após o i18n estar pronto
    createRoot(document.getElementById("root")!).render(<App />);
  } catch (error) {
    // Renderiza mesmo com erro para mostrar uma interface básica
    createRoot(document.getElementById("root")!).render(<App />);
  }
}

// Inicia a aplicação
initApp();
