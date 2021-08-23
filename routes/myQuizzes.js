const express = require('express');
const router  = express.Router();


// refer to the page
// refer to the function for that page- MAKE FUNCTION getUserLogin

module.exports = function(db) {

  // // MyQuiz  GET localhost:8080/myquiz/:id
  // router.get('/:id', (req, res) =>{
  //   const templateVars = {userId: req.params.user_id };
  //   res.render("my_quizzes", templateVars);
  // });

  router.get('/:id', (req, res) => {
    db.query(`
    SELECT quizzes.id as quizid, quizzes.title, quizzes.is_private, users.id as userid, users.name
    FROM quizzes
    JOIN users ON users.id = user_id
    WHERE users.id = $1;
    `, [req.params.id])
      .then(user => {
        let templateVars = {userData: user.rows};
        res.render("my_quizzes", templateVars);

        console.log("@@@@@@@@@@@@", user);
      })
      .catch(error => {
        res.status(500)
          .json({ error: error.message });
      });
  });


  return router;
};



