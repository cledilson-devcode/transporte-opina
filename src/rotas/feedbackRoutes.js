// src/routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController'); // Importa o controller atualizado

// POST /api/feedbacks - Rota para criar um novo feedback
router.post('/feedbacks', feedbackController.criarNovoFeedback);

// GET /api/feedbacks - Rota para listar todos os feedbacks
router.get('/feedbacks', feedbackController.obterTodosFeedbacks);

// GET /api/feedbacks/:id - Rota para buscar um feedback por ID
router.get('/feedbacks/:id', feedbackController.obterFeedbackPorId);

// PUT /api/feedbacks/:id - Rota para atualizar um feedback (exemplo)
// router.put('/feedbacks/:id', feedbackController.atualizarUmFeedback);

// DELETE /api/feedbacks/:id - Rota para deletar um feedback (exemplo)
// router.delete('/feedbacks/:id', feedbackController.deletarUmFeedback);

module.exports = router;