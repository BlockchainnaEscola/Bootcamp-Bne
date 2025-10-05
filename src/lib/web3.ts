import { ethers } from "ethers";
import { CONTRACTS, STUDENT_REGISTRY_ABI, NOS_TOKEN_ABI, ACTIVITY_TRACKER_ABI, INGRESSO_BADGE_ABI } from "./contracts";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const getProvider = () => {
  if (typeof window !== "undefined" && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return null;
};

export const connectWallet = async () => {
  const provider = getProvider();
  if (!provider) {
    throw new Error("MetaMask não está instalada!");
  }

  const accounts = await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  return { address: accounts[0], signer };
};

export const getStudentRegistry = (signer: ethers.Signer) => {
  return new ethers.Contract(CONTRACTS.STUDENT_REGISTRY, STUDENT_REGISTRY_ABI, signer);
};

export const getNOSToken = (signerOrProvider: ethers.Signer | ethers.Provider) => {
  return new ethers.Contract(CONTRACTS.NOS_TOKEN, NOS_TOKEN_ABI, signerOrProvider);
};

export const getActivityTracker = (signer: ethers.Signer) => {
  return new ethers.Contract(CONTRACTS.ACTIVITY_TRACKER, ACTIVITY_TRACKER_ABI, signer);
};

export const getIngressoBadge = (signer: ethers.Signer) => {
  return new ethers.Contract(CONTRACTS.INGRESSO_BADGE, INGRESSO_BADGE_ABI, signer);
};

export const switchToSepolia = async () => {
  const provider = getProvider();
  if (!provider) return;

  try {
    await provider.send("wallet_switchEthereumChain", [{ chainId: "0xaa36a7" }]);
  } catch (error: any) {
    if (error.code === 4902) {
      await provider.send("wallet_addEthereumChain", [
        {
          chainId: "0xaa36a7",
          chainName: "Sepolia Testnet",
          nativeCurrency: { name: "Sepolia ETH", symbol: "ETH", decimals: 18 },
          rpcUrls: ["https://sepolia.infura.io/v3/"],
          blockExplorerUrls: ["https://sepolia.etherscan.io"],
        },
      ]);
    }
  }
};
