// app.js (na raiz do projeto)

const express = require('express'); // Importa o Express (usando require)
const cors = require('cors'); // Importa o CORS (usando require)
const feedbackRoutes = require('./src/routes/feedbackRoutes'); // Importa suas rotas de feedback
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

const app = express(); // Cria a instância do Express
const PORT = process.env.PORT || 8800; // Usa a porta do .env ou 8800 como padrão

// --- Middlewares Globais ---
app.use(cors()); // Habilita o CORS para todas as origens (pode ser configurado de forma mais restrita)
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições
app.use(express.urlencoded({ extended: true })); // Permite parsear dados de formulários URL-encoded

// --- Rotas da Aplicação ---
// Monta as rotas definidas em feedbackRoutes sob o prefixo '/api'
app.use('/api', feedbackRoutes);

// Rota de exemplo para a raiz
app.get('/', (req, res) => {
  res.send('API de Feedback está funcionando!');
});

// --- Iniciar o Servidor ---
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse em: http://localhost:${PORT}`);
});