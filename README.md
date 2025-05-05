
# Spotify Clone

Clone de uma interface estilo Spotify feita em **Angular** (front-end) com API em **C#** (back-end) e SQL.

---

## 📋 Pré-requisitos

Antes de tudo, instale em sua máquina:

* **Node.js** (LTS) e **npm** (vem junto com o Node) — para rodar o front-end.
* **Angular CLI** globalmente:

  ```bash
  npm install -g @angular/cli
  ```
* **.NET SDK** (versão 6.0 ou superior) — para rodar o back-end.
* **SQL Server LocalDB** (ou qualquer instância SQL Server) — para o banco de dados.

---

## 🚀 Execução do Projeto

Será necessário subir a API e o front-end em portas distintas.

### 1. (Opcional) Banco de Dados

> **Observação**: o projeto front-end e back-end(em dev) estão prontos, mas a persistência real no banco ainda não está 100% implementada.

1. Abra o **SQL Server Management Studio** (ou `sqlcmd`).
2. Conecte-se à instância `(localdb)\\mssqllocaldb`.
3. Crie um banco de dados chamado `SpotifyCloneDb`.
4. (Opcional) Execute os scripts SQL em `database/init.sql` e `database/seed.sql` para criar tabelas e seed do usuário `Dev/dev`:

   ```bash
   sqlcmd -S (localdb)\\mssqllocaldb -i database/init.sql
   sqlcmd -S (localdb)\\mssqllocaldb -i database/seed.sql
   ```

### 2. Back-end (API C#)

1. Abra um terminal na pasta `backend/SpotifyBackend`:

   ```bash
   cd backend/SpotifyBackend
   ```
2. Restaure pacotes e configure EF Core:

   ```bash
   dotnet restore
   dotnet ef database update   # aplica migrações e cria banco
   ```
3. Inicie a WebAPI:

   ```bash
   dotnet run
   ```

   * A API estará escutando em `http://localhost:5007`.

### 3. Front-end (Angular)

1. Abra um terminal na pasta `front-end`:

   ```bash
   cd front-end
   ```
2. Instale dependências:

   ```bash
   npm install
   ```
3. Inicie o servidor dev (com proxy para a API):

   ```bash
   npm start
   # que executa: ng serve --proxy-config proxy.conf.json
   ```

   * A aplicação Angular estará em `http://localhost:4200`.

---

## 🎯 Testando o Front-end

1. Acesse `http://localhost:4200/login`.
2. Use as credenciais:

   * **Usuário:** `Dev`
   * **Senha:** `dev`
3. Ao logar, você será redirecionado para a **Home**:

   * Veja os **hero cards** fixos e o carrossel de recomendações.
   * Clique no ícone de **play** de qualquer card para contar um clique.
4. Confira o **Sidebar**:

   * O menu lateral mantém links de navegação.
   * Abaixo, exibe as **3 playlists mais clicadas** (Top 3) com mini-imagens.
5. Acesse `http://localhost:4200/insights`:

   * No topo, mostra a **playlist mais ouvida** e o total de cliques.
   * Gráfico de **pizza** para o Top 3.
   * Gráfico de **barra** para todos os cliques registrados.

> **Importante:** a parte de persistência em SQL ainda está em desenvolvimento. Atualmente, as contagens são armazenadas em memória e não sobrevivem a reinícios.

---

## 🔮 Próximos Passos

* Implementar autenticação real (JWT + refresh tokens).
* Persistir cliques no banco SQL com EF Core.
* Proteger rotas do Angular (Route Guards).
* Adicionar testes unitários e de integração.
* Implementar página de inscrição (sign-up).

---

📬 Qualquer dúvida, fique à vontade para abrir uma issue ou me contatar diretamente.

---

*Feito por Gabriel Paixao*
