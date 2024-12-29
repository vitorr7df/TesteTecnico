# Dockerfile do Frontend
FROM node:20

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos do frontend
COPY package*.json ./
COPY . .

# Instale as dependências
RUN npm install

# Construa a aplicação para produção
RUN npm run build

# Servir o build com um servidor simples
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Exponha a porta que o frontend usa
EXPOSE 3000
