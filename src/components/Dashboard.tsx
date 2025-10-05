import { useState, useEffect } from "react";
import { User, Coins, Trophy, LogOut, ArrowLeft } from "lucide-react";
import { DAY_1_ACTIVITIES } from "@/data/activities";
import ActivityCard from "./ActivityCard";

interface DashboardProps {
  address: string;
  signer: any;
  studentName: string;
  studentSchool: string;
  selectedDay: number;
  onLogout: () => void;
  onBackToHome: () => void;
}

const Dashboard = ({ address, signer, studentName, studentSchool, selectedDay, onLogout, onBackToHome }: DashboardProps) => {
  const [completedActivities, setCompletedActivities] = useState<Set<number>>(new Set());
  const [nosBalance, setNosBalance] = useState(0);

  const handleActivityComplete = (activityId: number) => {
    setCompletedActivities(prev => new Set([...prev, activityId]));
    const activity = DAY_1_ACTIVITIES.find(a => a.id === activityId);
    if (activity) {
      setNosBalance(prev => prev + activity.reward);
    }
  };

  const progress = (completedActivities.size / DAY_1_ACTIVITIES.length) * 100;

  const getDayTitle = () => {
    const titles = [
      "Dia 1: Internet, Futuro e Tecnologia",
      "Dia 2: NFTs e Arte Digital",
      "Dia 3: Smart Contracts",
      "Dia 4: Projeto Final"
    ];
    return titles[selectedDay - 1] || titles[0];
  };


  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="brutal-card p-6">
          <div className="flex flex-col gap-4">
            <button
              onClick={onBackToHome}
              className="brutal-button py-2 px-4 bg-card text-foreground flex items-center gap-2 w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Dashboard
            </button>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Bootcamp BnE</h1>
                <p className="text-muted-foreground">{getDayTitle()}</p>
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
        </div>

        {/* Student Info & Balance */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="brutal-card p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-pink rounded-xl border-2 border-border shadow-brutal">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estudante</p>
                <p className="font-bold text-lg">{studentName}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Instituição</p>
              <p className="font-bold">{studentSchool}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Carteira</p>
              <p className="font-mono text-xs break-all">{address}</p>
            </div>
          </div>

          <div className="brutal-card p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green rounded-xl border-2 border-border shadow-brutal">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Saldo</p>
                <p className="font-bold text-3xl">{nosBalance} $NOS</p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <p className="text-sm font-bold">Progresso</p>
                </div>
                <p className="text-sm font-bold">{completedActivities.size}/{DAY_1_ACTIVITIES.length}</p>
              </div>
              <div className="bg-muted rounded-full h-4 border-2 border-border overflow-hidden">
                <div
                  className="bg-yellow h-full transition-all duration-500 border-r-2 border-border"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Activities Feed */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Atividades do Dia</h2>
          <div className="space-y-4">
            {DAY_1_ACTIVITIES.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                isCompleted={completedActivities.has(activity.id)}
                onComplete={handleActivityComplete}
              />
            ))}
          </div>
        </div>

        {/* Completion Message */}
        {completedActivities.size === DAY_1_ACTIVITIES.length && (
          <div className="brutal-card p-8 text-center bg-yellow">
            <Trophy className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Parabéns! 🎉</h3>
            <p className="text-lg mb-4">Você completou todas as atividades do Dia 1!</p>
            <p className="font-bold text-xl">Total ganho: {nosBalance} $NOS</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
