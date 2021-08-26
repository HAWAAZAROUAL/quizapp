const express = require('express');
const router  = express.Router();

module.exports = function(db) {
  // localhost:8080/results/:user_id/:quiz_id
  router.get('/:user_id/:quiz_id', (req, res) => {

    db.query(`
      SELECT quizzes.title, questions.question as question, questions.id as questionid, users.name as username, results.score as userscore, users.id as userId, quizzes.id as quizid
      FROM quizzes
      JOIN results ON quizzes.id = results.quiz_id
      JOIN questions ON quizzes.id = questions.quiz_id
      JOIN users ON users.id = quizzes.user_id
      WHERE users.id = $1;
    `, [req.params.user_id])
      .then(result => {
        for (const data of result.rows) {
          let templateVars = {
            userData: result.rows,
            userName: data.username,
            userId: data.userid,
            quizId: data.quizid,
            quizTitle: data.title,
            quizScore: data.userscore
          };
          res.render("results", templateVars);

        }
      })
      .catch(error => {
        res.status(500)
          .json({ error: error.message });
      });
  });

  return router;
};








// for the query above
// GROUP BY quiz_id, questions.id, quizzes.title, answers.id, questions.question, answers.answer


// db.query <%- %>
// attempt:
// SELECT count(results.*)
// JOIN users ON users.id = results.user_id
// WHERE user_id = 1;
