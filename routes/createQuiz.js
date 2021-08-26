const express = require("express");
const router = express.Router();


module.exports = function(db) {

  // create/:user_id
  router.get("/", (req, res) => {

    const userId = req.session.user_id;
    console.log('THIS IS SESSION UESRID', userId);

    db.query(`
      SELECT users.name, users.id
      FROM users;
    `)
      .then((user) => {
        let templateVars = { userName: user.rows[0].name, userId: userId };
        res.render("create_quiz", templateVars);


      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });




  router.post('/', (req, res) => {
    const userId   = req.session.user_id; //MUST LOGIN FIRST
    const quizName = req.body["quizName"];
    let isPrivate  = req.body["is_private"];
    const numberOfQuestions = Math.floor(Object.keys(req.body).length / 6);
    const questionName = [];
    const answers      = [];
    let answer        = [];
    const isRight     = [];
    let isRight1     = [];

    isPrivate = false;
    if (isPrivate.checked) {
      isPrivate = true;
    }
    console.log('THIS IS THE BODY', req.body);

    //loop through all the input field from html,add the contents to Arrays,then insert into tables
    for (let i = 0; i < numberOfQuestions; i++) {
      let strQuestionMame = req.body["questionName" + (i + 1)];
      let strIsRight = req.body["is_right" + (i + 1)];
      questionName.push(strQuestionMame);//questionName Array
      for (let j = 0; j < 4; j++) {
        let strAnswer = req.body["answer" + (4 * i + (j + 1))];
        answer.push(strAnswer);        //answer Array
        let strIsRightId = ("a" + (4 * i + (j + 1)));
        console.log(strIsRight, strIsRightId);
        if (strIsRight === strIsRightId) {
          isRight1.push(true);
        } else {
          isRight1.push(false);
        }
      }
      isRight[i] = isRight1;
      answers[i] = answer;
      isRight1 = [];
      answer = [];
    }
    console.log(answers, isRight);
    //insert quizName to quizzes table
    db.query(`INSERT INTO quizzes( user_id ,title, is_private) VALUES ($1,$2,$3) returning id;`, [userId, quizName, isPrivate])
      .then(data => {
        //get quizId from quiz
        // console.log("THIS IS DATA", data.rows[0]);
        const quizId = data.rows[0].id;
        for (let i = 0; i < numberOfQuestions; i++) {

          createQuiz(userId, quizId, questionName[i], answers[i], isRight[i], res);
        }
      });
  });

  const createQuiz = function(userId, quizId, questionName, answers, isRight, res) {
    db.query(`INSERT INTO questions(quiz_id,question) VALUES($1,$2) returning id;`, [`${quizId}`, questionName])
      .then(data => {
        const questionId = data.rows[0].id;

        db.query(` INSERT INTO answers(question_id,answer,is_right) VALUES($1,$2,$3),($1,$4,$5),($1,$6,$7),($1,$8,$9)   returning *;`, [`${questionId}`, answers[0], isRight[0], answers[1], isRight[1], answers[2], isRight[2], answers[3], isRight[3]])
          .then(data => {
            res.redirect(`/myquiz/${userId}`);
          });
      });
  };







  return router;
};


