const express = require('express');
const router  = express.Router();

module.exports = function(db) {
  // localhost:8080/results/:user_id/:quiz_id
  router.get('/:user_id/:quiz_id', (req, res) => {



    db.query(`
    SELECT users.name as username, users.id as userid, quizzes.id as quizid, quizzes.title as quiztitle, results.score as score, count(questions.id) as totalQuestions
    FROM users
    JOIN results ON users.id = results.user_id
    JOIN quizzes ON users.id = quizzes.user_id
    JOIN questions ON quizzes.id = questions.quiz_id
    JOIN answers ON questions.id = answers.question_id
    WHERE users.id = $1
    GROUP BY users.name, users.id, quizzes.id, results.score, questions.id
    HAVING quizzes.id = $2;
    `, [req.params.user_id, req.params.quiz_id])
      .then(result => {

        let templateVars = {
          totalData: result.rows,
          userName: result.rows[0].username,
          userId: result.rows[0].userid,
          quizId: result.rows[0].quizid,
          quizTitle: result.rows[0].quiztitle,
          userScore: result.rows[0].score,
          // we need totalquestions count...
        };
        console.log('THIS IS THE DATA: ', result.rows);
        res.render("results", templateVars);

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
