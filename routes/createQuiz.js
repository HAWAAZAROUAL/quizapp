const express = require("express");
const router = express.Router();

// refer to the page
// refer to the function for that page- MAKE FUNCTION getUserLogin

module.exports = function(db) {
  router.get("/:user_id", (req, res) => {
    db.query(
      `
      SELECT users.name, users.id
      FROM users
      WHERE users.id = $1;
    `,
      [req.params.user_id]
    )
      .then((user) => {
        let templateVars = { userName: user.rows[0], userId: user.rows[0].id };
        res.render("create_quiz", templateVars);

        console.log("###############", user.rows[0].name);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });






  // CREATE QUIZ BUTTON (router.post),ADD INPUTTED QUESTION AND ANSWER TO DATABASE,
  // INSERT INTO quizzes (user_id,title,is_private) VALUES ()
  // INSERT INTO questions (quizid, question) VALUES ()
  // INSERT INTO answers (questionid, answer, is_right) VALUES()

  router.post('/:user_id', (req, res) => {
    const userId = req.params.user_id;
    console.log('REQ DOT BODYYYYYY: ', req.body);

    const quizName = req.body["quizName"];
    const questionName = req.body["questionName"];
    const answer1 = req.body["answer1"];
    const answer2 = req.body["answer2"];
    const answer3 = req.body["answer3"];
    const answer4 = req.body["answer4"];
    const is_private = req.body["is_private"];
    const is_right = req.body["is_right"];

    //IF radio checked, is_private
    if (is_private) {
      is_private = true;
    }
    //IF radio checked, is_right (correct answer)
    if (is_right) {
      is_right = true;
    }

    const sql1 = `INSERT INTO quizzes(user_id, title, is_private) VALUES ($1,$2,$3}) returning *;`;
    const sql2 = `INSERT INTO questions(quiz_id, question) VALUES(sql1,$4) returning *;`;
    const sql3 = `SELECT id as questionid
                 FROM questions
                 ORDER BY questionid DESC
                LIMIT 1;`;
    db.query(sql1,[userId, quizName,is_private])
      .then(results => {
        console.log('THIS IS THE RESULTS: ', results);

      });
  });
  //    const sql2 =`SELECT id as quizid
  //     FROM quizzes
  //     ORDER BY quizid DESC
  //     LIMIT 1;`;

  //
  //
  // db.query()

  //
  //    `,[userId, quizName,questionName,questionName,answer1, answer2, answer3, answer4,is_private, answerCheck])

  //    .(error) => {
  //           if (error) {
  //              throw error
  //         }
  //




  return router;
};
