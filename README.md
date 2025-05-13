# API de Feedback de Transporte

Uma API RESTful construída com Node.js, Express e MySQL para gerenciar feedbacks de usuários sobre serviços de transporte. Permite criar, listar, buscar, atualizar e deletar registros de feedback.

## Tecnologias Utilizadas

*   Node.js
*   Express.js
*   MySQL (com o driver `mysql2`)
*   `dotenv` para gerenciamento de variáveis de ambiente
*   `cors` para habilitar requisições cross-origin

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

*   [Node.js](https://nodejs.org/) (versão LTS recomendada)
*   [MySQL Server](https://dev.mysql.com/downloads/mysql/) (ou um servidor MySQL compatível como MariaDB)

## Configuração e Instalação

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO_NO_GITHUB>
    cd <NOME_DA_PASTA_DO_PROJETO>
    ```

2.  **Instale as dependências do projeto:**
    ```bash
    npm install
    ```

3.  **Configure o Banco de Dados MySQL:**
    *   Acesse seu servidor MySQL.
    *   Crie um banco de dados para a aplicação (ex: `db_transporte-opina`).
        ```sql
        CREATE DATABASE db_transporte_opina;
        ```
    *   Use o banco de dados criado:
        ```sql
        USE db_transporte_opina;
        ```
    *   Crie a tabela `feedback_users` executando o seguinte script SQL:
        ```sql
        CREATE TABLE IF NOT EXISTS feedback_users (
            `id_feedback` INT AUTO_INCREMENT PRIMARY KEY,
            `bus_number` VARCHAR(50) NOT NULL,
            `bus_line` VARCHAR(200) NOT NULL,
            `excessive_delay` BOOLEAN DEFAULT NULL,
            `bus_overcrowded` BOOLEAN DEFAULT NULL,
            `lack_of_accessibility` BOOLEAN DEFAULT NULL,
            `air_conditioning_broken` BOOLEAN DEFAULT NULL,
            `driver_misconduct` BOOLEAN DEFAULT NULL,
            `route_change` BOOLEAN DEFAULT NULL,
            `vehicle_poor_condition` BOOLEAN DEFAULT NULL,
            `comment` VARCHAR(300) DEFAULT NULL,
            `boarding_point` VARCHAR(255) DEFAULT NULL,
            `occurrence_location` VARCHAR(255) DEFAULT NULL,
            `submission_datetime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            `overall_rating` INT DEFAULT NULL,
            `safety_rating` INT DEFAULT NULL,
            `improvement_suggestions` TEXT DEFAULT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        ```

4.  **Configure as Variáveis de Ambiente:**
    *   Na raiz do projeto, crie um arquivo chamado `.env`.
    *   Copie o conteúdo abaixo para o seu arquivo `.env` e **substitua os valores pelos seus dados de configuração do MySQL local**:

        ```dotenv
        # .env
        DB_HOST=localhost
        DB_USER=seu_usuario_mysql
        DB_PASSWORD=sua_senha_mysql
        DB_NAME=db_transporte_opina # O mesmo nome do banco que você criou
        PORT=8800
        ```
    *   **Importante:** Adicione `.env` ao seu arquivo `.gitignore` para não enviar suas credenciais ao repositório.

## Rodando a Aplicação

1.  **Para iniciar o servidor em modo de desenvolvimento (com Nodemon, se configurado):**
    ```bash
    npm run dev
    ```
    *(Se você não configurou um script `dev` com Nodemon no seu `package.json`, use o comando abaixo.)*

2.  **Para iniciar o servidor normalmente:**
    ```bash
    npm start
    ```
    *(Ou `node app.js` se o script `start` não estiver definido como `node app.js` no `package.json`.)*

3.  A API estará disponível em `http://localhost:8800` (ou a porta que você definiu em `.env`).

## Endpoints da API

O prefixo base para todos os endpoints é `/api`.

*   **`POST /feedbacks`**: Cria um novo feedback.
    *   Corpo da requisição (JSON):
        ```json
        {
            "bus_number": "XYZ-123",
            "bus_line": "101 - Centro",
            "overall_rating": 4,
            "safety_rating": 5,
            "comment": "Boa viagem!",
            // ... outros campos opcionais
        }
        ```
*   **`GET /feedbacks`**: Lista todos os feedbacks.
*   **`GET /feedbacks/:id`**: Busca um feedback específico pelo seu ID.
*   **`PUT /feedbacks/:id`**: Atualiza um feedback existente pelo seu ID.
    *   Corpo da requisição (JSON) com os campos a serem atualizados.
*   **`DELETE /feedbacks/:id`**: Deleta um feedback específico pelo seu ID.

---

Sinta-se à vontade para adicionar mais seções como "Contribuição", "Licença", ou detalhes sobre validações específicas conforme seu projeto evolui. Este é um bom ponto de partida!