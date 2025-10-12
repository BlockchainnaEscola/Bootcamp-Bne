// Contract addresses on Celo Mainnet
// NOTA: Estes são endereços de exemplo. Você precisa fazer o deploy dos contratos usando Thirdweb
export const CONTRACTS = {
  // Deploy estes contratos via thirdweb.com/deploy na rede Celo
  NOS_TOKEN: "", // ERC-20 Token para recompensas $NOS
  INGRESSO_BADGE: "", // ERC-1155 para badges do bootcamp
};

// Para usar com Thirdweb, você vai usar os SDKs diretamente
// Exemplo de como mintar NFT badge:
// const contract = await sdk.getContract(CONTRACTS.INGRESSO_BADGE);
// await contract.erc1155.mint({ to: address, supply: 1, metadata: {...} });
