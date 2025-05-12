// src/models/feedbackModel.js
const dbConnection = require('../config/database'); // Importa a conexão

const Feedback = {
  /**
   * Cria um novo registro de feedback no banco de dados.
   * @param {object} newFeedbackData - Objeto contendo os dados do feedback.
   * @returns {Promise<number>} - Retorna o ID do feedback inserido.
   */
  criarFeedback: async (newFeedbackData) => {
    // Desestrutura o objeto para pegar os dados esperados (use os nomes em inglês)
    const {
      bus_number, bus_line, excessive_delay, bus_overcrowded,
      lack_of_accessibility, air_conditioning_broken, driver_misconduct,
      route_change, vehicle_poor_condition, comment, boarding_point,
      occurrence_location, overall_rating, safety_rating, improvement_suggestions
    } = newFeedbackData;

    // Query SQL com os nomes de tabela e colunas atualizados
    const sql = `INSERT INTO feedback_users (
                    bus_number, bus_line, excessive_delay, bus_overcrowded,
                    lack_of_accessibility, air_conditioning_broken, driver_misconduct,
                    route_change, vehicle_poor_condition, comment, boarding_point,
                    occurrence_location, overall_rating, safety_rating, improvement_suggestions
                 ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Array de valores na ordem correta das colunas na query
    const values = [
      bus_number, bus_line, excessive_delay, bus_overcrowded,
      lack_of_accessibility, air_conditioning_broken, driver_misconduct,
      route_change, vehicle_poor_condition, comment, boarding_point,
      occurrence_location, overall_rating, safety_rating, improvement_suggestions
    ];

    try {
      // Executa a query usando a conexão do pool (com async/await)
      const [result] = await dbConnection.promise().query(sql, values);
      return result.insertId; // Retorna o ID da linha inserida
    } catch (error) {
      console.error("Erro ao inserir feedback no banco de dados:", error);
      throw error; // Re-lança o erro para ser tratado pelo controller
    }
  },

  /**
   * Lista todos os feedbacks registrados no banco de dados.
   * @returns {Promise<Array<object>>} - Retorna um array com todos os feedbacks.
   */
  listarFeedbacks: async () => {
    // Query SQL atualizada para a nova tabela
    const sql = "SELECT * FROM feedback_users ORDER BY submission_datetime DESC"; // Ordena pelos mais recentes

    try {
      const [rows] = await dbConnection.promise().query(sql);
      return rows; // Retorna o array de resultados
    } catch (error) {
      console.error("Erro ao listar feedbacks do banco de dados:", error);
      throw error;
    }
  },

  /**
   * Busca um feedback específico pelo seu ID.
   * @param {number} id - O ID do feedback a ser buscado.
   * @returns {Promise<object|null>} - Retorna o objeto do feedback ou null se não encontrado.
   */
  buscarFeedbackPorId: async (id) => {
    // Query SQL atualizada com o nome correto da PK e tabela
    const sql = "SELECT * FROM feedback_users WHERE id_feedback = ?";
    try {
      const [rows] = await dbConnection.promise().query(sql, [id]);
      return rows.length > 0 ? rows[0] : null; // Retorna o primeiro resultado ou null
    } catch (error) {
      console.error("Erro ao buscar feedback por ID:", error);
      throw error;
    }
  },

  // --- Métodos Adicionais (Exemplos - precisam ser implementados se necessários) ---

  /*
  atualizarFeedback: async (id, dadosAtualizados) => {
    // Implementar a lógica de UPDATE
    // Exemplo: UPDATE feedback_users SET comment = ?, overall_rating = ? WHERE id_feedback = ?
    // Cuidado ao construir a query dinamicamente para evitar SQL Injection se não usar placeholders
  },

  deletarFeedback: async (id) => {
    // Implementar a lógica de DELETE
    // Exemplo: DELETE FROM feedback_users WHERE id_feedback = ?
  }
  */

};

module.exports = Feedback;