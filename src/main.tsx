import { createRoot } from "react-dom/client";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import App from "./App.tsx";
import "./index.css";

// Define Celo Mainnet configuration
const celoMainnet = {
  chainId: 42220,
  rpc: ["https://forno.celo.org"],
  nativeCurrency: {
    name: "CELO",
    symbol: "CELO",
    decimals: 18,
  },
  shortName: "celo",
  slug: "celo",
  testnet: false,
  chain: "CELO",
  name: "Celo Mainnet",
};

createRoot(document.getElementById("root")!).render(
  <ThirdwebProvider 
    activeChain={celoMainnet}
    clientId={import.meta.env.VITE_THIRDWEB_CLIENT_ID || ""}
  >
    <App />
  </ThirdwebProvider>
);
