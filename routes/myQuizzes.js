const express = require('express');
const users = require('./users');
const router  = express.Router();


// refer to the page
// refer to the function for that page- MAKE FUNCTION getUserLogin

module.exports = function(db) {
// /myquiz  ---- put user_id in body
  router.get('/:id', (req, res) => {
    db.query(`
    SELECT quizzes.id as quizid, quizzes.title, quizzes.is_private, users.id as userid, users.name
    FROM quizzes
    JOIN users ON users.id = user_id
    WHERE users.id = $1;
    `, [req.params.id])
      .then(user => {
        let templateVars = {userData: user.rows, userId: user.rows[0].userid, quizId: user.rows[0].quizid};
        res.render("my_quizzes", templateVars);
        console.log(user);

      })
      .catch(error => {
        res.status(500)
          .json({ error: error.message });
      });
  });




  // START button http://localhost:8080/quiz/2
  router.post('/:id/:quiz_id', (req, res) => {
    const quizId = req.params.quiz_id;
    const userId = req.params.id;
    console.log(quizId, userId);
    res.redirect(`/quiz/${quizId}`);
  });


  // delete button WE'RE currently at: /myquiz/1/
  router.post('/:id/:quiz_id', (req, res) => {

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


