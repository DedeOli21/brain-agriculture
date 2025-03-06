# Etapa 1: Build
FROM node:23-alpine AS builder

WORKDIR /app

# Copia apenas os arquivos essenciais primeiro para aproveitar o cache
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# Agora copia o restante dos arquivos do projeto
COPY . .

RUN yarn build && ls -la /app/dist

RUN echo "Build completed" && ls -la /app

# Etapa 2: Produção
FROM node:23-alpine

WORKDIR /app

# Criação de um usuário não-root para rodar o Node.js
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app

# Copia apenas os arquivos necessários para rodar a aplicação
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./

ENV NODE_ENV=production
EXPOSE 3000

# Executa o container com um usuário seguro
USER appuser

CMD ["node", "./dist/src/main.js"]
