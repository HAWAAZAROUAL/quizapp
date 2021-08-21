const express = require('express');
const router  = express.Router();
const {getQuizzes}= require('../db/quiz-queries');

router.get("/", (req, res) => {
  getQuizzes()
  .then((quizzes)=>{
    res.json(quizzes);
  })
  .catch(error => console.error(error));
});
module.exports = router;
