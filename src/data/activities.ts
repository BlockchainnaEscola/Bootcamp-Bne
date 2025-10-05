export type ActivityType = "text" | "quiz" | "link" | "badge";

export interface Activity {
  id: number;
  type: ActivityType;
  title: string;
  description: string;
  content?: string;
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
  };
  link?: {
    url: string;
    linkText: string;
  };
  badge?: {
    id: number;
    name: string;
  };
  reward: number; // $NOS reward
}

export const DAY_1_ACTIVITIES: Activity[] = [
  {
    id: 1,
    type: "text",
    title: "Bem-vindo à Web3!",
    description: "Aprenda os conceitos básicos de blockchain",
    content: `Web3 é a próxima geração da internet, construída sobre tecnologia blockchain. Diferente da Web2, onde seus dados são controlados por grandes empresas, na Web3 você tem controle total sobre suas informações e ativos digitais.

Principais características:
• Descentralização - Não há servidor central
• Transparência - Todas as transações são públicas
• Propriedade - Você possui seus ativos digitais
• Sem intermediários - Interações peer-to-peer

Complete esta leitura para ganhar seus primeiros $NOS tokens!`,
    reward: 10,
  },
  {
    id: 2,
    type: "quiz",
    title: "Quiz: O que é Blockchain?",
    description: "Teste seus conhecimentos sobre blockchain",
    quiz: {
      question: "O que é uma blockchain?",
      options: [
        "Um tipo de criptomoeda",
        "Um livro-razão distribuído e imutável",
        "Um software de mineração",
        "Uma carteira digital",
      ],
      correctAnswer: 1,
    },
    reward: 15,
  },
  {
    id: 3,
    type: "link",
    title: "Explore o Ethereum",
    description: "Visite o site oficial do Ethereum",
    link: {
      url: "https://ethereum.org/pt/",
      linkText: "Visitar Ethereum.org",
    },
    reward: 5,
  },
  {
    id: 4,
    type: "text",
    title: "Smart Contracts 101",
    description: "Entenda contratos inteligentes",
    content: `Smart Contracts (Contratos Inteligentes) são programas que rodam na blockchain e executam automaticamente quando certas condições são atendidas.

Como funcionam:
1. Código é escrito (geralmente em Solidity)
2. Deploy na blockchain Ethereum
3. Execução automática quando condições são cumpridas
4. Resultados registrados permanentemente

Exemplos de uso:
• Transferências automáticas de tokens
• Sistemas de votação transparentes
• Mercados descentralizados (DEX)
• NFTs e colecionáveis digitais

Esta plataforma que você está usando agora funciona com 4 smart contracts!`,
    reward: 10,
  },
  {
    id: 5,
    type: "badge",
    title: "Conquiste seu Badge de Ingresso!",
    description: "Mint seu primeiro NFT soulbound",
    badge: {
      id: 1,
      name: "Estudante Pioneiro",
    },
    reward: 20,
  },
];
