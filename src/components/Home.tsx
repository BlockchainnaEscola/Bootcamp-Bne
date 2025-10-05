import { useState } from "react";
import { User, Coins, Trophy, LogOut, Calendar, BookOpen, Code, Rocket, Award } from "lucide-react";

interface HomeProps {
  address: string;
  signer: any;
  studentName: string;
  studentSchool: string;
  onLogout: () => void;
  onSelectDay: (day: number) => void;
}

const BOOTCAMP_DAYS = [
  {
    day: 1,
    title: "Internet, Futuro e Tecnologia",
    description: "Web2 vs Web3, Blockchain, Carteiras Digitais",
    icon: BookOpen,
    color: "bg-pink",
    activities: 5,
  },
  {
    day: 2,
    title: "NFTs e Arte Digital",
    description: "Criar e mintar seu primeiro NFT",
    icon: Award,
    color: "bg-yellow",
    activities: 4,
  },
  {
    day: 3,
    title: "Smart Contracts",
    description: "Deploy de tokens ERC-20 e exploradores",
    icon: Code,
    color: "bg-green",
    activities: 6,
  },
  {
    day: 4,
    title: "Projeto Final",
    description: "Construa sua dApp e apresente",
    icon: Rocket,
    color: "bg-secondary",
    activities: 3,
  },
];

const Home = ({ address, signer, studentName, studentSchool, onLogout, onSelectDay }: HomeProps) => {
  const [totalNOS, setTotalNOS] = useState(0);
  const completedDays = 0; // TODO: Track from actual progress

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="brutal-card p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Bootcamp BnE</h1>
              <p className="text-muted-foreground">Sua Jornada Web3 em 4 Dias</p>
            </div>
            <button
              onClick={onLogout}
              className="brutal-button py-2 px-4 bg-destructive text-destructive-foreground flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Desconectar
            </button>
          </div>
        </div>

        {/* Student Info & Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="brutal-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-pink rounded-xl border-2 border-border shadow-brutal">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estudante</p>
                <p className="font-bold text-lg">{studentName}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Instituição</p>
              <p className="font-bold">{studentSchool}</p>
            </div>
          </div>

          <div className="brutal-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-green rounded-xl border-2 border-border shadow-brutal">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Saldo Total</p>
                <p className="font-bold text-3xl">{totalNOS} $NOS</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-mono break-all">{address}</p>
          </div>

          <div className="brutal-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-yellow rounded-xl border-2 border-border shadow-brutal">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Progresso Geral</p>
                <p className="font-bold text-3xl">{completedDays}/4</p>
              </div>
            </div>
            <p className="text-sm font-bold">Dias Completados</p>
          </div>
        </div>

        {/* Bootcamp Overview */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Programa do Bootcamp</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {BOOTCAMP_DAYS.map((dayInfo) => {
              const Icon = dayInfo.icon;
              return (
                <button
                  key={dayInfo.day}
                  onClick={() => onSelectDay(dayInfo.day)}
                  className="brutal-card p-6 text-left hover:scale-[1.02] transition-transform"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-xl border-2 border-border shadow-brutal ${dayInfo.color}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-lg">Dia {dayInfo.day}</span>
                        {completedDays >= dayInfo.day && (
                          <div className="p-1 bg-green rounded-full border-2 border-border">
                            <Trophy className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <h3 className="font-bold text-xl mb-2">{dayInfo.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {dayInfo.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs font-bold">
                        <span>{dayInfo.activities} atividades</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-green">Ver atividades →</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Info */}
        <div className="brutal-card p-6 bg-yellow">
          <h3 className="font-bold text-xl mb-3">💡 Como Funciona?</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="font-bold">1.</span>
              <span>Complete atividades em cada dia para ganhar tokens $NOS</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">2.</span>
              <span>Ganhe badges NFT soulbound ao completar cada dia</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">3.</span>
              <span>Aprenda fazendo: teoria + prática hands-on</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">4.</span>
              <span>Ao final, você terá seu próprio projeto Web3!</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
