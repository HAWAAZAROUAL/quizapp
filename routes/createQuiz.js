const express = require("express");
const router = express.Router();


module.exports = function(db) {

  // create/:user_id
  router.get("/", (req, res) => {

    db.query(`
      SELECT users.name, users.id
      FROM users;
    `)
      .then((user) => {
        let templateVars = { userName: user.rows[0].name, userId: user.rows[0].id };
        res.render("create_quiz", templateVars);


      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });

  // should be /create --- put userid in the BODY - check source of userId
  router.post('/', (req, res) => {

    const quizName     = req.body["quizName"];
    const questionName = req.body["questionName"];
    const answer1      = req.body["answer1"];
    const answer2      = req.body["answer2"];
    const answer3      = req.body["answer3"];
    const answer4      = req.body["answer4"];
    const userId       = req.body["user_id"]; // DOUBLE CHECK
    let  isPrivate     = req.body["is_private"];
    let isRight        = req.body["is_right"];

    //IF radio checked, is_private
    if (isPrivate) {
      isPrivate = true;
    }
    //IF radio checked, is_right (correct answer)
    if (isRight) {
      isRight = true;
    }
    db.query(`INSERT INTO quizzes( user_id ,title, is_private) VALUES ($1,$2,$3) returning id;`,[userId, quizName,isPrivate])
      .then(data => {
        const quizId = data.rows[0].id;
        db.query(`INSERT INTO questions(quiz_id,question) VALUES($1,$2) returning id;`,[`${quizId}`,questionName])
          .then(data => {
            const questionId = data.rows[0].id;
            db.query(` INSERT INTO answers(question_id,answer,is_right)   VALUES($1,$2,$3),($4,$5,$6),($7,$8,$9),($10,$11,$12)   returning *;`,[`${questionId}`,answer1,isRight,`${questionId}`,answer2,isRight,`${questionId}`,answer3,isRight,`${questionId}`,answer4,isRight])
              .then(data => {
                res.redirect(`/myquiz/${userId}`);
              });
          });
      });
  });

  return router;
};

