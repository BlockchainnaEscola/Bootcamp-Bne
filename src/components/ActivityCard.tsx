import { useState } from "react";
import { BookOpen, HelpCircle, ExternalLink, Award, Check, Coins } from "lucide-react";
import { Activity } from "@/data/activities";
import confetti from "canvas-confetti";
import { toast } from "sonner";

interface ActivityCardProps {
  activity: Activity;
  isCompleted: boolean;
  onComplete: (activityId: number) => void;
}

const ActivityCard = ({ activity, isCompleted, onComplete }: ActivityCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const getIcon = () => {
    switch (activity.type) {
      case "text":
        return <BookOpen className="w-6 h-6" />;
      case "quiz":
        return <HelpCircle className="w-6 h-6" />;
      case "link":
        return <ExternalLink className="w-6 h-6" />;
      case "badge":
        return <Award className="w-6 h-6" />;
    }
  };

  const getColor = () => {
    if (isCompleted) return "bg-muted";
    switch (activity.type) {
      case "text":
        return "bg-pink";
      case "quiz":
        return "bg-yellow";
      case "link":
        return "bg-green";
      case "badge":
        return "bg-secondary";
      default:
        return "bg-card";
    }
  };

  const handleComplete = async () => {
    setIsProcessing(true);
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff99cc", "#99ff99", "#ffff66"],
    });
    
    toast.success(`Você ganhou ${activity.reward} $NOS!`, {
      icon: <Coins className="w-4 h-4" />,
    });
    
    onComplete(activity.id);
    setIsProcessing(false);
  };

  const handleQuizSubmit = () => {
    if (selectedAnswer === activity.quiz?.correctAnswer) {
      handleComplete();
    } else {
      toast.error("Resposta incorreta. Tente novamente!");
    }
  };

  const handleTextComplete = () => {
    handleComplete();
  };

  const handleLinkClick = () => {
    window.open(activity.link?.url, "_blank");
    setTimeout(() => handleComplete(), 1000);
  };

  const handleBadgeMint = () => {
    handleComplete();
  };

  return (
    <div className={`brutal-card p-6 ${isCompleted ? "opacity-60" : ""}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className={`p-3 rounded-xl border-2 border-border shadow-brutal ${getColor()}`}>
            {getIcon()}
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">{activity.title}</h3>
            <p className="text-sm text-muted-foreground">{activity.description}</p>
          </div>
        </div>
        {isCompleted && (
          <div className="p-2 bg-green rounded-full border-2 border-border">
            <Check className="w-4 h-4" />
          </div>
        )}
      </div>

      {!isCompleted && (
        <>
          {activity.type === "text" && (
            <div className="space-y-4">
              {!showContent ? (
                <button
                  onClick={() => setShowContent(true)}
                  className="brutal-button w-full py-2 px-4 bg-pink text-foreground"
                >
                  Ler Conteúdo
                </button>
              ) : (
                <>
                  <div className="bg-muted p-4 rounded-xl border-2 border-border">
                    <p className="text-sm whitespace-pre-line">{activity.content}</p>
                  </div>
                  <button
                    onClick={handleTextComplete}
                    disabled={isProcessing}
                    className="brutal-button w-full py-2 px-4 bg-green text-foreground disabled:opacity-50"
                  >
                    {isProcessing ? "Processando..." : `Concluir (+${activity.reward} $NOS)`}
                  </button>
                </>
              )}
            </div>
          )}

          {activity.type === "quiz" && activity.quiz && (
            <div className="space-y-3">
              <p className="font-bold">{activity.quiz.question}</p>
              {activity.quiz.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnswer(index)}
                  className={`brutal-button w-full py-2 px-4 text-left ${
                    selectedAnswer === index ? "bg-yellow" : "bg-card"
                  }`}
                >
                  {option}
                </button>
              ))}
              <button
                onClick={handleQuizSubmit}
                disabled={selectedAnswer === null || isProcessing}
                className="brutal-button w-full py-2 px-4 bg-green text-foreground disabled:opacity-50"
              >
                {isProcessing ? "Processando..." : `Enviar Resposta (+${activity.reward} $NOS)`}
              </button>
            </div>
          )}

          {activity.type === "link" && activity.link && (
            <button
              onClick={handleLinkClick}
              disabled={isProcessing}
              className="brutal-button w-full py-2 px-4 bg-green text-foreground flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ExternalLink className="w-4 h-4" />
              {isProcessing ? "Processando..." : activity.link.linkText}
            </button>
          )}

          {activity.type === "badge" && activity.badge && (
            <div className="space-y-3">
              <div className="bg-muted p-4 rounded-xl border-2 border-border text-center">
                <Award className="w-12 h-12 mx-auto mb-2" />
                <p className="font-bold">{activity.badge.name}</p>
                <p className="text-sm text-muted-foreground">Badge Soulbound NFT</p>
              </div>
              <button
                onClick={handleBadgeMint}
                disabled={isProcessing}
                className="brutal-button w-full py-2 px-4 bg-secondary text-foreground disabled:opacity-50"
              >
                {isProcessing ? "Mintando..." : `Mintar Badge (+${activity.reward} $NOS)`}
              </button>
            </div>
          )}
        </>
      )}

      {isCompleted && (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground font-bold">✓ Atividade Concluída</p>
        </div>
      )}
    </div>
  );
};

export default ActivityCard;
