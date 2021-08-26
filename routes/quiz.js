const express = require("express");
const { Pool } = require("pg");
const myQuizzes = require("./myQuizzes");
const router = express.Router();

module.exports = function(db) {
  // Quiz + Questions   GET localhost:8080/quiz/:quizid
  // router.get("/:quizid", (req, res) => {
  //   const templateVars = { userId: req.params.user_id };
  //   res.render("quizzes", templateVars);
  // });

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
        // console.log('THIS IS THE DATA: ' , data);

        let templateVars = {
          quizData: data.rows,
          // quizQuestion: data.rows[0].question,
          userId: data.rows[0].id,

          // quizTitle: data.rows[0].title
        };


        res.render("quizzes", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });



  // Submit Quiz: We are current at: 8080/quiz/:userid/:quizid
  router.post('/:userid/:quizid', (req, res) => {


    db.query(`
    Select answers.answer as allAnswers From answers where Answers.is_right = true;
    `)
      .then(data => {
        let rightAnswers = data.rows[0].allAnswers;
      });

  });
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






  return router;
};

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
