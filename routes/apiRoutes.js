const express = require('express');
const router  = express.Router();

// refer to the page
// refer to the function for that page- MAKE FUNCTION getUserLogin

module.exports = function(db) {

  router.get('/myquiz', (req, res) => {
    if(req.session){
      //console.log("ylle");
      if(req.session.user_id) {
         // db.getAllQuizzes(userId)
          //   .then(quizzes => res.send({quizzes}))
          //   .catch(e => {
          //     console.error(e);
          //     res.send(e);
          //   });

        res.render("my_quizzes");
      } else {
        res.json({result: "You are not logged in. Please log in"});
      }

    }
      else {
      res.json({result: "You are not logged in. Please log in"});
    }


  });
  return router;
};

