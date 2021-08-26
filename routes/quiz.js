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

// if (userAnswer === answerQ1)
//   console.log("this is correct");

// db.query(`
// Select answers.answer as allAnswers
// From answers
// where answers.is_right = true;
// `)
//   .then(data => {
//     let rightAnswers = data.rows[0].allAnswers;
//   });
//   const score = 0;

//   document.getElementById["checkAnswer"].onclick = function() {
//     let checkedCorrect = document.getElementById("checkAnswer").checked = true;

//     if (checkedCorrect && // compare is_right)
//     score++

//   };


//   db.query(`
//     INSERT INTO results (user_id, quiz_id, score)
//     VALUES ($1, $2, $3)
//     `, [req.params.userid, req.params.quizid, `${score}` ])
//     .then(data => {
//       // const userId = data.rows[0].userid;
//       const quizid = req.params.quizid;
//       const userid = req.params.userid;

//       //result/userid/quizid
//       res.redirect(`result/${userid}/${quizid}`);
//     })
//     .catch(error => {
//       res.status(500)
//         .json({ error: error.message });
//     });
// });








// score = count(is_right) AND quiz.id

//   let firstString = `INSERT INTO results (user_id, quiz_id, score) VALUES ($1, $2, $3) RETURNING *; `;

//   db.query(firstString, [req.params.user_id, req.params.quiz_id, ${score}]) // IF I CAN GET THE SCORE SOMEHOW
//     .then((data) => {
//       console.log("data:", data);
//       // res.redirect()
//     });

// });

//   let score=0;
// if (answers.answer = is_right) {
//   score ++
//   return score;
// }




//make a function in req.body that filters through the right answers.

// router.post('/', (req, res) => {

//   let isRight = req.body["is_right"]; // Boolean T/F
//   let score = 0;

//   document.getElementById("checkAnswer").onclick = function() {
//     let correctChecked = document.getElementById("checkAnswer").checked = true;

//     if (isRight && correctChecked) { // fix this (make it a boolean)
//       score++;
//     }
//   };
//   return score;
// });



// //hawaa's attempt
// let score = 0;
// document.getElementById("checkAnswer").onclick = function() {
//   let answer = document.getElementById("answer").value;
//   if (answer = ${is_right}) {
//     score++;
//     console.log(score);
//   }
//   document.getElementById("score").innerHTML = score;
// }
