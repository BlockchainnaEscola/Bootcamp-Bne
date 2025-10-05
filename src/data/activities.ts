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
    title: "Web2 vs Web3: Qual a Diferença?",
    description: "Entenda a evolução da internet",
    content: `Web2 vs Web3: A diferença fundamental

Web2 (Internet Atual):
• Seus dados pertencem a grandes empresas
• Plataformas centralizadas (Facebook, Google, etc.)
• Você é o produto (seus dados são vendidos)
• Precisa confiar em intermediários

Web3 (Nova Internet):
• VOCÊ possui seus dados e ativos digitais
• Redes descentralizadas sem dono único
• Você controla sua identidade digital
• Sem intermediários - interação direta

A Web3 está sendo construída sobre tecnologia blockchain, devolvendo o poder para as pessoas!`,
    reward: 10,
  },
  {
    id: 2,
    type: "text",
    title: "O que é Blockchain?",
    description: "Entenda a tecnologia por trás da Web3",
    content: `Blockchain: O Livro Público que Ninguém Pode Apagar

Imagine um caderno gigante onde:
• Todas as páginas são numeradas em sequência
• Qualquer pessoa pode ler
• NINGUÉM pode arrancar ou modificar páginas antigas
• Milhares de cópias idênticas existem ao mesmo tempo

É exatamente isso que é blockchain!

Principais características:
📖 Transparente - Todas as transações são públicas
🔒 Imutável - Uma vez registrado, não pode ser alterado
🌍 Descentralizado - Não há servidor central
✅ Seguro - Protegido por criptografia avançada

Exemplo: Bitcoin foi a primeira blockchain, criada em 2009!`,
    reward: 10,
  },
  {
    id: 3,
    type: "quiz",
    title: "Quiz: Carteiras Digitais",
    description: "Teste seu conhecimento sobre carteiras",
    quiz: {
      question: "O que é uma carteira digital (wallet) no mundo Web3?",
      options: [
        "Um aplicativo para guardar dinheiro físico",
        "Sua identidade na internet descentralizada que guarda suas chaves",
        "Um banco online tradicional",
        "Um programa para minerar criptomoedas",
      ],
      correctAnswer: 1,
    },
    reward: 15,
  },
  {
    id: 4,
    type: "text",
    title: "Chaves Públicas vs Privadas",
    description: "Entenda como funciona a segurança na Web3",
    content: `Chaves Públicas vs Privadas: A Base da Segurança Web3

🔓 CHAVE PÚBLICA (Como seu Email):
• Você pode compartilhar com todos
• É seu "endereço" na blockchain
• Exemplo: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
• Qualquer um pode enviar coisas para você

🔐 CHAVE PRIVADA (Como sua Senha):
• NUNCA compartilhe com NINGUÉM
• Dá acesso total aos seus ativos
• Se perder, perde tudo para sempre
• Se alguém descobrir, pode roubar tudo

⚠️ REGRA DE OURO:
Sua chave privada = Seu banco no bolso
Guardar com todo cuidado é SUA responsabilidade!

Na próxima atividade você vai criar sua primeira carteira!`,
    reward: 10,
  },
  {
    id: 5,
    type: "badge",
    title: "Badge de Ingresso",
    description: "Conquiste seu primeiro NFT soulbound!",
    badge: {
      id: 1,
      name: "Estudante Bootcamp BnE",
    },
    reward: 20,
  },
];
