const express = require("express");
const myQuizzes = require("./myQuizzes");
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
        // console.log('THIS IS THE DATA: ' , data);
        let quiz = data.rows;

        let templateVars = {
          quizData: quiz,
          // quizQuestion: data.rows[0].question,
          userId: data.rows[0].id,
          // quizTitle: data.rows[0].title
          show: function(word) {
            console.log(word);
          }
        };

        // console.log('@@@@@@@@@@@@@@@@@@@', data.rows);
        res.render("quizzes", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });



  // Submit Quiz: We are current at: 8080/quiz/:quizid
  router.post('/:quiz_id', (req, res) => {
    console.log('*CHECKING POST ROUTE**');
    db.query(`
      DELETE FROM quizzes
      WHERE quizzes.id=$1
      `, [req.params.quiz_id])
      .then(data => {
        const userId = req.params.id;
        res.redirect(`/results/${userId}/${quizid}`);
      })
      .catch(error => {
        res.status(500)
          .json({ error: error.message });
      });

  });
  return router;

};

// quiz./results/1/1
// router.post("/results/:user_id/:quiz_id", (req, res) => {

// let checkscore = `
// SELECT users.id as userId, quizzes.id as quiz, count(answers.is_right) as score
// FROM users
// JOIN answers ON users.id = user_id;
// WHERE users.id = 1 AND quizzes.id = 1;`;

// let score = 0;
// if (is_right) {
//   score++;
//   return score;
// }
// console.log(score);
// let checkScore = `
// SELECT count(answers.is_right) as rightanswer, users.id as userid
// FROM users
// JOIN quizzes ON users.id = quizzes.user_id
// JOIN questions ON quizzes.id = questions.quiz_id
// JOIN answers ON questions.id = answers.question_id
// WHERE answers.is_right = true AND users.id = 1 AND quizzes.id = 1
// GROUP BY users.id;
// `;

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

// //instead of the function above make a select
// `SELECT COUNT(is_right)
// FROM
// JOIN
// JOIN
// JOIN
// WHERE answer IS is_right`

// is_right = answers (if correct)
// answers.is_right
// count(answers.is_right) = score

// INSERT INTO answers (answer, is_right) VALUES ('testestest', radiobutton)







// score = count(is_right) based on the quizzes.id


// // adding the score- total correct.
// let score = 0;
//   if (is_right) {
//   score ++;
//   return score;
//   }


//make a function in req.body that filters through the right answers.
