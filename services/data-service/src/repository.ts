import { pool } from './db';

export const DataRepository = {
  // Save a new FAQ/Knowledge piece
  saveKnowledge: async (userId: string, question: string, answer: string) => {
    const query = 'INSERT INTO knowledge_base (user_id, question, answer) VALUES ($1, $2, $3) RETURNING *';
    const values = [userId, question, answer];
    const res = await pool.query(query, values);
    return res.rows[0];
  },

  // Get all knowledge for a specific user (Business Owner)
  getKnowledgeByUser: async (userId: string) => {
    const res = await pool.query('SELECT * FROM knowledge_base WHERE user_id = $1', [userId]);
    return res.rows;
  }
};