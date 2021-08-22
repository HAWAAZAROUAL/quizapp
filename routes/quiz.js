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
    SELECT questions.id, quiz_id, quizzes.title, answers.id, questions.question, answers.answer, answers.is_right,questions.question
    FROM questions
    JOIN quizzes ON quizzes.id= questions.quiz_id
    JOIN answers  ON answers.question_id = questions.id
    WHERE quiz_id = $1
    GROUP BY quiz_id, questions.id, quizzes.title, answers.id, questions.question, answers.answer
    ORDER BY questions.id;
    `,
    [req.params.quizid]
    )
      .then((data) => {
        const quiz = data.rows;
        console.log("@@@@@@@@@@", req.params.quizid)
        for (const obj of quiz)
        console.log('----------', obj, `\n objID = ${obj.id} \n objTITLE = ${obj.title}`);
        let templateVars = {
          userId: req.params.user_id, // not working
          questionId: quiz.question_id, // not working
          questionTitle: quiz.question, // not working
          answerId: quiz.answer_id, // not working
          quizId: req.params.quizid
        };
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

// sidebar: all questions based on quizID
// When a person presses start, it should show question title, all questions and their answers on one page. quizid, questionid, answerid, ?userid?

