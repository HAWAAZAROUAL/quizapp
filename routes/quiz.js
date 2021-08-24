const express = require("express");
const router = express.Router();

module.exports = function(db) {
  // Quiz + Questions   GET localhost:8080/quiz/:quizid
  // router.get("/:quizid", (req, res) => {
  //   const templateVars = { userId: req.params.user_id };
  //   res.render("quizzes", templateVars);
  // });

  router.get("/:quizid", (req, res) => {
    db.query(`
    SELECT questions.id as questionid, quiz_id as quizid, quizzes.title, answers.id as answerid, answers.answer, answers.is_right,questions.question, quizzes.id
    FROM questions
    JOIN quizzes ON quizzes.id= questions.quiz_id
    JOIN answers  ON answers.question_id = questions.id
    WHERE questions.quiz_id = $1

    ORDER BY questions.id;
    `, [req.params.quizid])

      .then((data) => {
        let quiz = data.rows;

        let templateVars = {
          quizData: quiz,
          quizQuestion: data.rows[0].question,
          userId: data.rows[0].id,
          quizTitle: data.rows[0].title
        };

        console.log('@@@@@@@@@@@@@@@@@@@', data.rows);
        res.render("quizzes", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Result  GET localhost:8080/quiz/:quizid/result/:id
  router.get("/:quizid/result/:id", (req, res) => {
    const templateVars = { userId: req.params.user_id };
    res.render("results", templateVars);
  });

  return router;
};

// router.post("/:quiz_id/questions", (req, res) => {
//   db.query(`
//     INSERT INTO questions (quiz_id, question)
//     VALUES ($1, $2) RETURNING * ;
//   `, [req.params.user_id, req.body.question])

//     .then(user => {
//       const userId = user.rows[0].id;
//       res.redirect(`/myquiz/:${userId}`);
//     })
//     .catch(error => {
//       res.status(500)
//         .json({ error: error.message });
//     });
// });



// for the query above
// GROUP BY quiz_id, questions.id, quizzes.title, answers.id, questions.question, answers.answer
