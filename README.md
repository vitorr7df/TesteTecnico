# Projeto Teste Técnico

Este projeto é uma aplicação simples composta por três partes: Backend (Node.js), Frontend (React), e um banco de dados (MySQL). Ele foi projetado para ser executado em containers Docker, garantindo um ambiente de desenvolvimento isolado e fácil de configurar.

Foi implementado um crud de usuarios, com login e cadastro, uso de token para utilização do sistema e proteção de rotas, criptografia de senha, dentre outras funcionalidades, ainda estando aberto a receber novas features.

## Requisitos

Antes de iniciar, certifique-se de ter os seguintes requisitos instalados:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/)

## Instruções de Execução

### Passo 1: Clonar o repositório

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/vitorr7df/TesteTecnico.git
cd TesteTecnico
```

### Passo 2: Construir os containers

```bash
docker-compose up --build
```

Este comando irá:

Criar e configurar o container mysql-container com o banco de dados MySQL.
Criar e configurar o container backend-container com a aplicação Node.js.
Criar e configurar o container frontend-container com a aplicação React.

### Passo 3: Acessar a aplicação

Após a construção e inicialização dos containers, os serviços estarão disponíveis nos seguintes endereços:

Frontend (React): http://localhost:3000
Backend (Node.js): http://localhost:5000
Banco de Dados MySQL: Porta 3306, acesso via root com a senha root.

### Passo 4: Verificar a base de dados

O MySQL será iniciado com um banco de dados chamado testdb, e o arquivo init.sql será executado automaticamente, criando a tabela users.

Abra um outro terminal e dê permissão ao arquivo init.sql:

```bash
chmod 777 ./init.sql
```

Para verificar a criação da tabela, você pode acessar o MySQL via linha de comando:

```bash
docker exec -it mysql-container mysql -u root -proot testdb
```

E então rodar:

```bash
SHOW TABLES;
```

A tabela users deve aparecer na lista.

### Passo 5: Testes

A aplicação Backend e Frontend estão configuradas para se comunicarem via API REST.

Backend: A API está disponível em http://localhost:5000. Você pode utilizar ferramentas como Postman ou curl para testar os endpoints.

Frontend: A interface React está disponível em http://localhost:3000.

### Passo 6: Parar os containers

Quando terminar, pare os containers com:

```bash
docker-compose down
```

Isso irá parar os containers, mas os dados serão preservados no volume db_data. Se você quiser remover os volumes de dados e reiniciar o projeto do zero, use:

```bash
docker-compose down -v
```

### Estrutura do Projeto

O projeto é dividido nas seguintes pastas:

backend/: Contém a aplicação Node.js/Express que interage com o banco de dados MySQL.

frontend/: Contém a aplicação React que se comunica com o backend.

docker/: Contém o arquivo docker-compose.yml para orquestrar os containers.

init.sql: Arquivo SQL para inicializar o banco de dados com a tabela users.

### Dependências

#### Backend

express: Framework para criar a API.

mysql2: Cliente MySQL para Node.js.

dotenv: Para gerenciamento das variáveis de ambiente.

#### Frontend

react: Biblioteca para construir a interface do usuário.

axios: Para realizar requisições HTTP ao Backend.

MySQL
mysql:8.0: Imagem Docker do MySQL 8.0.

## Autor do projeto: Vitor R. Ramos

https://github.com/vitorr7df
