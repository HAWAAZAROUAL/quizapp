const express = require('express');
const router  = express.Router();


// refer to the page
// refer to the function for that page- MAKE FUNCTION getUserLogin

module.exports = function(db) {

  router.get('/:user_id', (req, res) => {
    let templateVars = {
      userId: req.params.user_id,
    };
    res.render("create_quiz", templateVars);
  });



  return router;
};
