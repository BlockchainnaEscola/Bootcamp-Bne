import { useState } from "react";
import { UserPlus } from "lucide-react";
import { getStudentRegistry } from "@/lib/web3";
import { toast } from "sonner";

interface RegistrationFormProps {
  signer: any;
  onRegistered: () => void;
}

const SCHOOLS = [
  "Escola Pública Municipal",
  "Escola Pública Estadual",
  "Escola Particular",
  "Instituto Federal",
  "Universidade Pública",
  "Universidade Particular",
  "Outro",
];

const RegistrationForm = ({ signer, onRegistered }: RegistrationFormProps) => {
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !school) {
      toast.error("Preencha todos os campos");
      return;
    }

    setIsRegistering(true);
    try {
      // Simulate contract interaction
      // const contract = getStudentRegistry(signer);
      // const tx = await contract.registerStudent(name, school);
      // await tx.wait();
      
      // For demo purposes, simulate success after delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Registro realizado com sucesso!");
      onRegistered();
    } catch (error: any) {
      console.error(error);
      toast.error("Erro ao registrar estudante");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="brutal-card p-8 max-w-md w-full space-y-6">
        <div className="text-center">
          <div className="inline-block p-4 bg-green rounded-xl border-2 border-border shadow-brutal mb-4">
            <UserPlus className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Cadastro de Estudante</h2>
          <p className="text-muted-foreground">
            Complete seu perfil para começar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-bold mb-2">
              Nome Completo
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="brutal-input w-full"
              placeholder="Digite seu nome"
              disabled={isRegistering}
            />
          </div>

          <div>
            <label htmlFor="school" className="block text-sm font-bold mb-2">
              Instituição de Ensino
            </label>
            <select
              id="school"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="brutal-input w-full"
              disabled={isRegistering}
            >
              <option value="">Selecione sua escola</option>
              {SCHOOLS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isRegistering}
            className="brutal-button w-full py-4 px-6 bg-secondary text-foreground disabled:opacity-50"
          >
            {isRegistering ? "Registrando..." : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
