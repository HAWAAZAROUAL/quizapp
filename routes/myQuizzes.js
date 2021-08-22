const express = require('express');
const router  = express.Router();


// refer to the page
// refer to the function for that page- MAKE FUNCTION getUserLogin

module.exports = function(db) {

  // MyQuiz  GET localhost:8080/myquiz/:id
  router.get('/:id', (req, res) =>{
    const templateVars = {userId: req.params.user_id };
    res.render("my_quizzes", templateVars);
  });


  return router;
};



// router.get('/:id', (req, res) => {
//   db.query(`
//   SELECT *
//   FROM quizzes
//   JOIN users ON users.id = user_id
//   WHERE users.id = $1;
//   `, [req.params.id])
//     .then(user => {
//       let templateVars = {userData: user.rows, user_id: req.params.id};
//       res.render("my_quizzes", templateVars);
//     })
//     .catch(error => {
//       res.status(500)
//         .json({ error: error.message });
//     });
// });
