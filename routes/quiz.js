const express = require('express');
const router  = express.Router();

module.exports = function(db) {

  // Quiz + Questions   GET localhost:8080/:quizid
  router.get('/:quizid', (req, res) =>{
    const templateVars = {userId: req.params.user_id };
    res.render("quizzes", templateVars);
  });

  // Result  GET localhost:8080/:quizid/result/:id
  router.get('/:quizid/result/:id', (req, res) =>{
    const templateVars = {userId: req.params.user_id };
    res.render("results", templateVars);
  });

  return router;
};

// router.get('/:quiz', (req, res) => {
//   db.query(`
//   SELECT *
//   FROM quizzes
//   JOIN users ON users.id = user_id
//   WHERE users.id = $1;
//   `, [req.params.id])
//     .then(user => {
//       let templateVars = {userData: user.rows, user_id: req.params.id};
//       res.render("quiz", templateVars);
//     })
//     .catch(error => {
//       res.status(500)
//         .json({ error: error.message });
//     });
// });
