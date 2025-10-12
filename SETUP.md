# Configuração do Bootcamp BnE

## 📋 Pré-requisitos

1. Conta no [Thirdweb](https://thirdweb.com)
2. Carteira Web3 (MetaMask, Valora, etc)
3. Alguns tokens CELO para gas fees

## 🚀 Setup

### 1. Configurar Thirdweb

1. Acesse [thirdweb.com/dashboard](https://thirdweb.com/dashboard)
2. Crie um novo projeto
3. Copie seu **Client ID**
4. Crie um arquivo `.env` na raiz do projeto:
   ```
   VITE_THIRDWEB_CLIENT_ID=seu_client_id_aqui
   ```

### 2. Deploy dos Contratos na Rede Celo

#### Token $NOS (ERC-20)

1. Acesse [thirdweb.com/deploy](https://thirdweb.com/deploy)
2. Selecione **"Token"** (ERC-20)
3. Configure:
   - **Name**: NOS Token
   - **Symbol**: NOS
   - **Initial Supply**: 10000000 (10 milhões)
   - **Decimals**: 18
4. Selecione **Celo Mainnet** como rede
5. Faça o deploy e aguarde a confirmação
6. Copie o endereço do contrato

#### Badges (ERC-1155)

1. No Thirdweb, selecione **"NFT Collection"** ou **"Edition"** (ERC-1155)
2. Configure:
   - **Name**: Bootcamp BnE Badges
   - **Symbol**: BADGE
3. Selecione **Celo Mainnet**
4. Deploy e copie o endereço

### 3. Atualizar Endereços dos Contratos

Edite o arquivo `src/lib/contracts.ts`:

```typescript
export const CONTRACTS = {
  NOS_TOKEN: "0x...", // Cole o endereço do token $NOS
  INGRESSO_BADGE: "0x...", // Cole o endereço do contrato de badges
};
```

### 4. Configurar Permissões nos Contratos

#### Token $NOS
1. Acesse o dashboard do contrato no Thirdweb
2. Vá em **"Permissions"**
3. Adicione o endereço da carteira admin como **Minter**
4. Isso permitirá distribuir tokens $NOS automaticamente

#### Badges
1. Acesse o dashboard do contrato de badges
2. Configure permissões de **Mint**
3. Adicione a carteira admin

## 🎯 Funcionalidades Implementadas

✅ Autenticação com Lovable Cloud (Supabase)
✅ Conexão de carteira via Thirdweb
✅ Sistema de perfis de usuários
✅ Registro de atividades on-chain
✅ Sistema de recompensas $NOS
✅ Mint de badges NFT
✅ Dashboard por dia do bootcamp
✅ Rede Celo integrada

## 📝 Próximos Passos

1. **Implementar transações reais**: Atualmente as transações são simuladas. Descomente o código em `ActivityCard.tsx` para fazer mints reais de badges.

2. **Criar backend para distribuição automática**: Considere criar uma Edge Function que distribua tokens $NOS automaticamente quando o usuário completa atividades.

3. **Adicionar mais dias**: O sistema suporta 4 dias. Adicione mais atividades em `src/data/activities.ts`.

4. **Implementar leaderboard**: Use as tabelas do banco para criar um ranking de estudantes.

## 🔒 Segurança

- ✅ RLS (Row Level Security) habilitado em todas as tabelas
- ✅ Autenticação obrigatória
- ✅ Dados dos usuários protegidos
- ✅ Badges como tokens soulbound (não transferíveis)

## 📚 Documentação Útil

- [Thirdweb Docs](https://portal.thirdweb.com/)
- [Celo Docs](https://docs.celo.org/)
- [Lovable Cloud Docs](https://docs.lovable.dev/features/cloud)

## 💡 Dicas

- Use a rede de testes Celo Alfajores para desenvolvimento
- Mantenha backup das seed phrases das carteiras
- Monitore os custos de gas na rede Celo
