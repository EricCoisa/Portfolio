import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n/config";

// ReactScan - only in development
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  import('react-scan').then(({ scan }) => {
    // Check if ReactScan is enabled in localStorage
    const isReactScanEnabled = localStorage.getItem('reactScanEnabled') === 'true';
    if (isReactScanEnabled) {
      scan({
        enabled: true,
        log: true,
      });
    }
  });
}

createRoot(document.getElementById("root")!).render(<App />);
