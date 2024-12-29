# Documentação: Criação do Container MySQL e Banco de Dados Persistente

## **1. Configurando o Container MySQL**

1. Certifique-se de ter o Docker instalado no sistema.
2. Execute o comando para criar o container MySQL:

```bash
docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=root -d -p 3306:3306 -v $(pwd)/mysql_data:/var/lib/mysql mysql:8.0
```

### Explicação dos Parâmetros:

- `--name mysql-container`: Nome do container.
- `-e MYSQL_ROOT_PASSWORD=root`: Define a senha do usuário `root`.
- `-d`: Executa o container em segundo plano.
- `-p 3306:3306`: Mapeia a porta 3306 do host para o container.
- `-v $(pwd)/mysql_data:/var/lib/mysql`: Cria um volume persistente para o banco de dados.
- `mysql:8.0`: Utiliza a imagem oficial do MySQL 8.0.

---

## **2. Conectando ao Container MySQL**

1. Acesse o container:

```bash
docker exec -it mysql-container mysql -uroot -proot
```

2. Verifique os bancos de dados existentes:

```sql
SHOW DATABASES;
```

---

## **3. Criando o Banco de Dados e a Tabela**

1. Crie o banco de dados `testdb`:

```sql
CREATE DATABASE testdb;
USE testdb;
```

2. Crie a tabela `users` com persistência`:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

3. Insira alguns dados na tabela:

```sql
INSERT INTO users (name, email, password) VALUES
('Alice', 'alice@example.com', 'password123'),
('Bob', 'bob@example.com', 'securepass456');
```

4. Verifique os dados inseridos:

```sql
SELECT * FROM users;
```

---

## **4. Persistência dos Dados**

A pasta `mysql_data` (montada com o volume no comando `docker run`) garante que os dados permaneçam salvos mesmo que o container seja removido.

- Para recriar o container sem perder os dados:

```bash
docker rm -f mysql-container

docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=root -d -p 3306:3306 -v $(pwd)/mysql_data:/var/lib/mysql mysql:8.0
```

Os dados no volume serão restaurados automaticamente.

---
