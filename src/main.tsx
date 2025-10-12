import { createRoot } from "react-dom/client";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import App from "./App.tsx";
import "./index.css";

// Celo Mainnet Chain ID
const CELO_CHAIN_ID = 42220;

createRoot(document.getElementById("root")!).render(
  <ThirdwebProvider 
    activeChain={CELO_CHAIN_ID}
    clientId={import.meta.env.VITE_THIRDWEB_CLIENT_ID || ""}
  >
    <App />
  </ThirdwebProvider>
);
