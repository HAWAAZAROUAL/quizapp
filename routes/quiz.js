const express = require("express");
const router = express.Router();

module.exports = function(db) {
  // Quiz + Questions   GET localhost:8080/quiz/:quizid
  // router.get("/:quizid", (req, res) => {
  //   const templateVars = { userId: req.params.user_id };
  //   res.render("quizzes", templateVars);
  // });

  //localhost:8080/quiz/:quizid
  router.get("/:quizid", (req, res) => {
    db.query(`
    SELECT users.*, quizzes.*, questions.*, answers.*
    FROM quizzes
    JOIN users ON users.id = quizzes.user_id
    JOIN questions ON quizzes.id = questions.quiz_id
    JOIN answers ON questions.id = answers.question_id
    WHERE quizzes.id = $1
    `, [req.params.quizid])

      .then((data) => {
        let quiz = data.rows;

        let templateVars = {
          quizData: quiz,
          // quizQuestion: data.rows[0].question,
          userId: data.rows[0].id,
          // quizTitle: data.rows[0].title
        };

        console.log('@@@@@@@@@@@@@@@@@@@', data.rows);
        res.render("quizzes", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};

