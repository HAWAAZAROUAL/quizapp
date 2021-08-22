const express = require('express');
const router  = express.Router();


// refer to the page
// refer to the function for that page- MAKE FUNCTION getUserLogin

module.exports = function(db) {

  router.get('/:user_id', (req, res) => {

    db.query(`
      SELECT users.name
      FROM users
      WHERE users.id = $1;
    `, [req.params.user_id])
      .then(user => {
        let templateVars = { userName: user.rows[0] };
        res.render("create_quiz", templateVars);

        console.log("###############", user.rows[0].name);
      })
      .catch(error => {
        res.status(500)
          .json({ error: error.message });
      });
  });
  return router;

};
