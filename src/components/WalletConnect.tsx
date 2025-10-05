import { useState } from "react";
import { Wallet } from "lucide-react";
import { connectWallet, switchToSepolia } from "@/lib/web3";
import { toast } from "sonner";

interface WalletConnectProps {
  onConnect: (address: string, signer: any) => void;
}

const WalletConnect = ({ onConnect }: WalletConnectProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await switchToSepolia();
      const { address, signer } = await connectWallet();
      onConnect(address, signer);
      toast.success("Carteira conectada com sucesso!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Erro ao conectar carteira");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="brutal-card p-8 max-w-md w-full text-center space-y-6">
        <div className="inline-block p-4 bg-yellow rounded-xl border-2 border-border shadow-brutal">
          <Wallet className="w-12 h-12" />
        </div>
        
        <div>
          <h1 className="text-4xl font-bold mb-2">NOS Academy</h1>
          <p className="text-lg text-muted-foreground">
            Aprenda Web3 e ganhe recompensas
          </p>
        </div>

        <div className="space-y-3 text-left">
          <div className="flex items-start gap-2">
            <span className="text-pink font-bold">→</span>
            <p>Complete atividades educacionais</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green font-bold">→</span>
            <p>Ganhe tokens $NOS como recompensa</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow font-bold">→</span>
            <p>Colete badges NFT exclusivos</p>
          </div>
        </div>

        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="brutal-button w-full py-4 px-6 bg-pink text-foreground disabled:opacity-50"
        >
          {isConnecting ? "Conectando..." : "Conectar Carteira"}
        </button>

        <p className="text-sm text-muted-foreground">
          Certifique-se de estar na rede Sepolia
        </p>
      </div>
    </div>
  );
};

export default WalletConnect;
