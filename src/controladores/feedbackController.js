// src/controllers/feedbackController.js
const Feedback = require('../models/feedbackModel'); // Importa o Model atualizado

const feedbackController = {
  /**
   * Manipulador para criar um novo feedback.
   * Espera os dados no corpo da requisição (req.body) com os nomes de campo em inglês.
   */
  criarNovoFeedback: async (req, res) => {
    try {
      // Os dados em req.body devem vir com os nomes das colunas em inglês
      // (bus_number, bus_line, etc.)
      const feedbackData = req.body;

      // Validação básica (pode ser mais robusta)
      if (!feedbackData.bus_number || !feedbackData.bus_line) {
        return res.status(400).json({ message: 'Número e Linha do ônibus são obrigatórios.' });
      }

      const feedbackId = await Feedback.criarFeedback(feedbackData);
      res.status(201).json({ id: feedbackId, message: 'Feedback criado com sucesso!' });
    } catch (error) {
      // O erro já foi logado no Model, aqui apenas retornamos uma resposta genérica
      res.status(500).json({ message: 'Erro interno ao processar o feedback.' });
    }
  },

  /**
   * Manipulador para obter todos los feedbacks.
   */
  obterTodosFeedbacks: async (req, res) => {
    try {
      const feedbacks = await Feedback.listarFeedbacks();
      res.status(200).json(feedbacks); // Retorna o array de feedbacks
    } catch (error) {
      res.status(500).json({ message: 'Erro interno ao buscar feedbacks.' });
    }
  },

  /**
   * Manipulador para obter um feedback específico pelo ID.
   */
  obterFeedbackPorId: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10); // Pega o ID da URL
      if (isNaN(id)) {
          return res.status(400).json({ message: 'ID inválido.' });
      }

      const feedback = await Feedback.buscarFeedbackPorId(id);
      if (feedback) {
        res.status(200).json(feedback);
      } else {
        res.status(404).json({ message: 'Feedback não encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro interno ao buscar o feedback.' });
    }
  },

  // --- Outros manipuladores (se implementados no Model) ---
  /*
  atualizarUmFeedback: async (req, res) => {
    // Lógica para chamar Feedback.atualizarFeedback
  },

  deletarUmFeedback: async (req, res) => {
    // Lógica para chamar Feedback.deletarFeedback
  }
  */
};

module.exports = feedbackController;