import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAddress, ConnectWallet } from "@thirdweb-dev/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogIn, UserPlus } from "lucide-react";

interface AuthProps {
  onAuthenticated: () => void;
}

const Auth = ({ onAuthenticated }: AuthProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
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

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast({
          title: "Login realizado!",
          description: "Bem-vindo de volta ao Bootcamp BnE.",
        });
        onAuthenticated();
      } else {
        if (!name || !school) {
          toast({
            title: "Campos obrigatórios",
            description: "Preencha todos os campos.",
            variant: "destructive"
          });
          return;
        }
        const { error } = await signUp(email, password, name, school, address);
        if (error) throw error;
        toast({
          title: "Cadastro realizado!",
          description: "Sua conta foi criada com sucesso.",
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
            {isLogin ? "Entre na sua conta" : "Crie sua conta"}
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="font-bold">2. Dados de Acesso</Label>
              
              {!isLogin && (
                <>
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="brutal-input"
                      required={!isLogin}
                    />
                  </div>
                  <div>
                    <Label htmlFor="school">Instituição</Label>
                    <select
                      id="school"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      className="brutal-input w-full"
                      required={!isLogin}
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
                </>
              )}
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="brutal-input"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="brutal-input"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="brutal-button w-full bg-green text-foreground"
              disabled={loading || !address}
            >
              {loading ? (
                "Processando..."
              ) : isLogin ? (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Entrar
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Cadastrar
                </>
              )}
            </Button>
          </form>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isLogin ? "Não tem conta? Cadastre-se" : "Já tem conta? Faça login"}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
