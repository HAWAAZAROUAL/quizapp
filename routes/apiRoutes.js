const express = require('express');
const router  = express.Router();

const { getAllQuizzes } = require("../db/queries/get-my-quizzes");

// refer to the page
// refer to the function for that page- MAKE FUNCTION getUserLogin

module.exports = function(db) {

  router.get('/', (req, res) => {
    if (req.session) {
      const userId = req.session.user_id;
      if (userId) {
        db.getAllQuizzes(userId)
          .then(quizzes => {
            res.send(quizzes);
          })
          .catch(e => {
            console.error(e);
            res.send(e);
          });
        res.render("my_quizzes");
      } else {
        res.json({result: "You are not logged in. Please log in"});
      }

    } else {
      res.json({result: "You are not logged in. Please log in"});
    }


  });
  return router;
};

