const pool = require('../server.js');

// CREATE all queries


const getAllQuizzes = function(user_id) {
  return pool
    .query(`
      SELECT quizzes.*
      FROM quizzes
      JOIN users ON users.id = user_id
      WHERE users.id = $1;
    `, [user_id])
    .then(res => res.rows)
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllQuizzes = getAllQuizzes;
