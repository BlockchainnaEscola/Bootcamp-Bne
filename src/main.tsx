import { createRoot } from "react-dom/client";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient();

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
  <QueryClientProvider client={queryClient}>
    <ThirdwebProvider 
      activeChain={celoMainnet}
      clientId={import.meta.env.VITE_THIRDWEB_CLIENT_ID || ""}
    >
      <App />
    </ThirdwebProvider>
  </QueryClientProvider>
);
