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

        console.log("@@@@@@@@@@@@", templateVars);
      })
      .catch(error => {
        res.status(500)
          .json({ error: error.message });
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


  // delete button
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
