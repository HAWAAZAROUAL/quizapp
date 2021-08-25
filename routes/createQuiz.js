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

        // console.log("###############", user.rows[0].name);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });

  router.post('/:user_id', (req, res) => {
    const userId = req.params.user_id;
    // console.log('REQ DOT BODYYYYYY: ', req.body);

    const quizName     = req.body["quizName"];
    const questionName = req.body["questionName"];
    const answer1      = req.body["answer1"];
    const answer2      = req.body["answer2"];
    const answer3      = req.body["answer3"];
    const answer4      = req.body["answer4"];
    let  isPrivate   = req.body["is_private"];
    let isRight    = req.body["is_right"];

    //IF radio checked, is_private
    if (isPrivate) {
      isPrivate = true;
    }
    //IF radio checked, is_right (correct answer)
    if (isRight) {
      isRight = true;
    }

    db.query(`INSERT INTO quizzes( user_id ,title, is_private) VALUES ($1,$2,$3) returning id;`,[userId, quizName,isPrivate])
      .then(data=>{
        const quizId = data.rows[0].id;
        db.query(`INSERT INTO questions(quiz_id,question) VALUES(id,$1) returning id;`,[`${quizId}`,questionName])
          .then(data=>{
            const questionId = data.rows[0].id;
            db.query(` INSERT INTO answers(question_id,answer,is_right)
                   VALUES($1,$2,$3),
                   VALUES($4,$5,$6),
                   VALUES($7,$8,$9),
                   VALUES($10,$11,$12) returning *;`,[`${questionId}`,answer1,isRight,`${questionId}`,answer2,isRight,`${questionId}`,answer3,isRight,`${questionId}`,answer4,isRight])
              .then(data=>{
                console.log(data.row[0]);

              })
              .catch((err) => err.message);
          })
          .catch((err) => err.message);
      });
  });
  return router;
};



// router.get("/:user_id", (req, res) => {
//   db.query(
//     `
//     SELECT users.name, users.id
//     FROM users
//     WHERE users.id = $1;
//   `,
//     [req.params.user_id]
//   )
//     .then((user) => {
//       let templateVars = { userName: user.rows[0], userId: user.rows[0].id };
//       res.render("create_quiz", templateVars);

//       console.log("###############", user.rows[0].name);
//     })
//     .catch((error) => {
//       res.status(500).json({ error: error.message });
//     });
// });


// CREATE QUIZ BUTTON (router.post),ADD INPUTTED QUESTION AND ANSWER TO DATABASE,
// INSERT INTO quizzes (user_id,title,is_private) VALUES ()
// INSERT INTO questions (quizid, question) VALUES ()
// INSERT INTO answers (questionid, answer, is_right) VALUES()
