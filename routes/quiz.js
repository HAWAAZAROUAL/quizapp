const express = require("express");
const { Pool } = require("pg");
const myQuizzes = require("./myQuizzes");
const router = express.Router();

module.exports = function(db) {

  //localhost:8080/quiz/:userid/:quizid
  router.get("/:userid/:quizid", (req, res) => {
    db.query(`
    SELECT users.*, quizzes.*, questions.*, answers.*
    FROM quizzes
    JOIN users ON users.id = quizzes.user_id
    JOIN questions ON quizzes.id = questions.quiz_id
    JOIN answers ON questions.id = answers.question_id
    WHERE quizzes.id = $1
    `, [req.params.quizid])

      .then((data) => {
        let templateVars = {
          quizData: data.rows,
          userId: data.rows[0].id,

        };
        res.render("quizzes", templateVars);
        console.log('awefioahwoeifha', data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Submit Quiz: We are current at: 8080/quiz/:userid/:quizid
  router.post('/:userid/:quizid', (req, res) => {
    const question1Answer = req.body["checkAnswer0"];
    const question2Answer = req.body["checkAnswer4"];
    const question3Answer = req.body["checkAnswer8"];
    const question4Answer = req.body["checkAnswer12"];
    const question5Answer = req.body["checkAnswer16"];
    const userId = req.params.userid;
    const quizId = req.params.quizid;
    let score = 0;

    db.query(`
      SELECT questions.id questionId, answers.answer as rightAnswer FROM answers
      JOIN questions ON questions.id = answers.question_id
      JOIN quizzes ON quizzes.id = questions.quiz_id
      WHERE is_right = true AND quizzes.id = 1;
    `)
      .then(data => {
        if (question1Answer === data.rows[0].rightanswer) {
          score++;
        }
        if (question2Answer === data.rows[1].rightanswer) {
          score++;
        }
        if (question3Answer === data.rows[2].rightanswer) {
          score++;
        }
        if (question4Answer === data.rows[3].rightanswer) {
          score++;
        }
        if (question5Answer === data.rows[4].rightanswer) {
          score++;
        }
        console.log('this is your final score', score);
      })
      .then(data => {
        db.query(`
          INSERT INTO results(user_id, quiz_id, score)
          VALUES ($1, $2, $3)
        `, [userId, quizId, score]);

        res.redirect(`/results/${userId}/${quizId}`);
      });
  });



  return router;
};
