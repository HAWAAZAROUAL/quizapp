const express = require('express');
const router  = express.Router();

module.exports = function(db) {
  // localhost:8080/results/:user_id
  router.get('/:user_id', (req, res) => {

    db.query(`
      SELECT quizzes.title, questions.question as question, questions.id as questionid, users.name as username, results.score as userscore
      FROM quizzes
      JOIN results ON quizzes.id = results.quiz_id
      JOIN questions ON quizzes.id = questions.quiz_id
      JOIN users ON users.id = quizzes.user_id
      WHERE users.id = $1;
    `, [req.params.user_id])
      .then(user => {
        let templateVars = {
          userName: user.rows[0]
        };
        res.render("results", templateVars);

        console.log("###############", user.rows);
      })
      .catch(error => {
        res.status(500)
          .json({ error: error.message });
      });
  });
  return router;
};

// db.query <%- %>
// attempt:
// SELECT count(results.*)
// JOIN users ON users.id = results.user_id
// WHERE user_id = 1;
