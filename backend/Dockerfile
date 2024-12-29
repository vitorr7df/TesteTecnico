# Dockerfile do Backend
FROM node:20

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos do backend
COPY package*.json ./
COPY . .

# Instale as dependências
RUN npm install

# Exponha a porta que o backend usa
EXPOSE 5000

# Comando para iniciar o servidor
CMD ["npm", "start"]
