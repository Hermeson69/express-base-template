# Modelo basico de um projeto usando express com TypeScript

Este é um modelo básico para iniciar um projeto usando Express com TypeScript. Ele inclui uma estrutura de diretórios organizada, scripts de construção e execução, e configuração inicial para facilitar o desenvolvimento.

## Estrutura de Diretórios

```bash
express-base-model/
├── src/
│   ├── controllers/
│   ├── core/
│   ├── db/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── utils/
│   └── server.ts
├── dist/
├── package.json
├── tsconfig.json
└── README.md
```

Essa estrutura é bem simples e pode ser usada em cosslinguages como o proprio python que foi de onde ela foi tirada. Ela tem um simples e eficiente modelo MVC (Model-View-Controller) para organizar o código. Dessa forma, como ela trabalha com pacotes onde cada pasta tem sua responsabilidade, fica mais fácil de manter e escalar o projeto.

## Libs Utilizadas
- express
- typescript
- ts
- Drizzle ORM (opcional, para gerenciamento de banco de dados)
- UUID (para geração de IDs únicos)
- dotenv (para gerenciamento de variáveis de ambiente)
- Zod (para validação de esquemas)
- bcrypt (para hashing de senhas)

obs: Algumas dessas bibliotecas são opcionais e podem ser substituídas conforme suas necessidades específicas como por exemplo o Drizzle ORM pelo Prisma ou Sequelize. Mas em suma, essas são as principais bibliotecas que compõem esse modelo básico e pode-se dizer muito eficiente e funcional para a maoria dos projetos web.

## Scripts Disponíveis

No arquivo `package.json`, você encontrará os seguintes scripts úteis:

- `dev`: "tsx src/server.ts"
- `build`: "tsc"
- `start`: "node dist/server.js"
- `migrate-new`: "npx drizzle-kit generate"
- `migrate-up`: "npx drizzle-kit migrate"

## Como Usar
1. Clone este repositório para o seu ambiente local.
2. Instale as dependências usando `npm install` ou `yarn install`.
3. Inicie o servidor em modo de desenvolvimento com `npm run dev` ou `yarn dev`.
4. Para construir o projeto para produção, use `npm run build` ou `yarn build`.
5. Inicie o servidor em produção com `npm start` ou `yarn start`.

## ATENÇÃO
Antes de inicializar o projeto, certifique-se de configurar o `tsconfig.json` e o banco de dados conforme suas necessidades específicas (se tiver usando ts).
