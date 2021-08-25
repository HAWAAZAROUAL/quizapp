const express = require('express');
const router  = express.Router();


// refer to the page
// refer to the function for that page- MAKE FUNCTION getUserLogin

module.exports = function(db) {

  router.get('/:id', (req, res) => {
    db.query(`
    SELECT quizzes.id as quizid, quizzes.title, quizzes.is_private, users.id as userid, users.name
    FROM quizzes
    JOIN users ON users.id = user_id
    WHERE users.id = $1;
    `, [req.params.id])
      .then(user => {
        let templateVars = {userData: user.rows, userId: req.params.id};
        res.render("my_quizzes", templateVars);

        console.log("@@@@@@@@@@@@", user.rows);
      })
      .catch(error => {
        res.status(500)
          .json({ error: error.message });
      });
  });

  router.post('/:userid', (req, res) => {
    const userId = req.params.userid;
    const quizName     = req.body["quizName"];
    const questionName = req.body["questionName"];
    const answer1      = req.body["answer1"];
    const answer2      = req.body["answer2"];
    const answer3      = req.body["answer3"];
    const answer4      = req.body["answer4"];
    let   isPrivate    = req.body["is_private"];
    let   isRight      = req.body["is_right"];

    //IF radio checked, is_private
    if (isPrivate.checked) {
      isPrivate = true;
    }
    //IF radio checked, is_right (correct answer)
    if (isRight.checked) {
      isRight = true;
    }

    db.query(`INSERT INTO quizzes( user_id ,title, is_private) VALUES ($1,$2,$3) returning id;`,[userId, quizName,isPrivate])
      .then(data=>{
        const quizId = data.rows[0].id;
        db.query(`INSERT INTO questions(quiz_id,question) VALUES($1,$2) returning id;`,[`${quizId}`,questionName])
          .then(data=>{
            const questionId = data.rows[0].id;
            console.log(questionId);
            db.query(` INSERT INTO answers(question_id,answer,is_right)   VALUES($1,$2,$3),($4,$5,$6),($7,$8,$9),($10,$11,$12)   returning *;`,[`${questionId}`,answer1,isRight,`${questionId}`,answer2,isRight,`${questionId}`,answer3,isRight,`${questionId}`,answer4,isRight])
              .then(data=>{
                res.redirect(`/myquiz/${userId}`);
              });
          });
      });
  });

  // START button http://localhost:8080/quiz/2
  // myquiz/2/2
  router.post('/:id/:quiz_id', (req, res) => {
    const quizId = req.params.quiz_id;
    const userId = req.params.id;
    console.log(quizId, userId);
    res.redirect(`/quiz/${quizId}`);
  });


  // delete button WE'RE currently at: /myquiz/1/
  router.post('/:id/:quiz_id', (req, res) => {
    console.log('#################');
    db.query(`
      DELETE FROM quizzes
      WHERE quizzes.id=$1
      `, [req.params.quiz_id])
      .then(data => {
        const userId = req.params.id;
        res.redirect(`/myquiz/${userId}`);

      })
      .catch(error => {
        res.status(500)
          .json({ error: error.message });
      });
  });
  return router;

};
