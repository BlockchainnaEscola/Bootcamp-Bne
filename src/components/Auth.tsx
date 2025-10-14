import { useState } from "react";
import { useAddress, ConnectWallet } from "@thirdweb-dev/react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import { Wallet } from "lucide-react";

interface AuthProps {
  onAuthenticated: () => void;
}

const Auth = ({ onAuthenticated }: AuthProps) => {
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [loading, setLoading] = useState(false);
  
  const address = useAddress();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address) {
      toast({
        title: "Conecte sua carteira",
        description: "Por favor, conecte sua carteira antes de continuar.",
        variant: "destructive"
      });
      return;
    }

    if (!name || !school) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para continuar.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Check if profile already exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('wallet_address', address)
        .single();

      if (existingProfile) {
        toast({
          title: "Bem-vindo de volta!",
          description: "Sua carteira já está registrada.",
        });
        onAuthenticated();
      } else {
        // Create new profile
        const { error } = await supabase
          .from('profiles')
          .insert({
            wallet_address: address,
            name,
            school,
            user_id: address // Using wallet address as user_id for wallet-based auth
          });

        if (error) throw error;

        toast({
          title: "Cadastro realizado!",
          description: "Seu perfil foi criado com sucesso.",
        });
        onAuthenticated();
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Card className="brutal-card p-8 max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Bootcamp BnE</h1>
          <p className="text-muted-foreground">
            Conecte sua carteira para começar
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-bold mb-2">1. Conecte sua Carteira</Label>
            <ConnectWallet 
              theme="light"
              btnTitle="Conectar Carteira"
              modalTitle="Escolha sua carteira"
            />
            {address && (
              <p className="text-xs text-muted-foreground mt-2 font-mono break-all">
                {address}
              </p>
            )}
          </div>

          {address && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="font-bold">2. Complete seu Perfil</Label>
                
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="brutal-input"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="school">Instituição</Label>
                  <select
                    id="school"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="brutal-input w-full"
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="UFPE">UFPE</option>
                    <option value="UFRPE">UFRPE</option>
                    <option value="UPE">UPE</option>
                    <option value="IFPE">IFPE</option>
                    <option value="Uninassau">Uninassau</option>
                    <option value="Estácio">Estácio</option>
                    <option value="Outra">Outra</option>
                  </select>
                </div>
              </div>

              <Button
                type="submit"
                className="brutal-button w-full bg-green text-foreground"
                disabled={loading}
              >
                {loading ? (
                  "Processando..."
                ) : (
                  <>
                    <Wallet className="w-4 h-4 mr-2" />
                    Entrar no Bootcamp
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Auth;
