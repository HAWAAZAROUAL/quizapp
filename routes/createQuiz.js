const express = require("express");
const router = express.Router();


module.exports = function(db) {

  // create/:user_id
  router.get("/", (req, res) => {

    const userId = req.session.user_id;

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
    const userId   = req.session.user_id;
    const quizName = req.body["quizName"];
    let isPrivate  = req.body["is_private"];
    const numberOfQuestions = Math.floor(Object.keys(req.body).length / 6);
    const questionName = [];
    const answers      = [];
    let answer        = [];
    let isRight1;
    let isRight2;
    let isRight3;
    let isRight4;
    isPrivate = false;
    if (isPrivate.checked) {
      isPrivate = true;
    }
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
        if (strIsRight === ("a"+(4*i+1))) {
          isRight1=JSON.parse(true);
          isRight2=JSON.parse(false);
          isRight3=JSON.parse(false);
          isRight4=JSON.parse(false);
        }
        if (strIsRight === ("a"+(4*i+2))) {
          isRight2=JSON.parse(true);
          isRight1=JSON.parse(false);
          isRight3=JSON.parse(false);
          isRight4=JSON.parse(false);
        }
        if (strIsRight === ("a"+(4*i+3))) {
          isRight3=JSON.parse(true);
          isRight1=JSON.parse(false);
          isRight2=JSON.parse(false);
          isRight4=JSON.parse(false);
        }
        if (strIsRight === ("a"+(4*i+4))) {
          isRight4=JSON.parse(true);
          isRight2=JSON.parse(false);
          isRight3=JSON.parse(false);
          isRight1=JSON.parse(false);
        }
      }
      answers[i] = answer;
      answer = [];
      }
    //1. insert quizName to quizzes table
    db.query(`INSERT INTO quizzes( user_id ,title, is_private) VALUES ($1,$2,$3) returning id;`, [userId, quizName, isPrivate])
      .then(data => {
        //get quizId from quiz
        const quizId = data.rows[0].id;

        let questionPromises = [];
        //2. Inserting into the Questions
        for (let i = 0; i < numberOfQuestions; i++) {
          questionPromises.push(db.query(`INSERT INTO questions(quiz_id,question) VALUES($1,$2) returning id;`, [`${quizId}`, questionName[i]]));
        }

        Promise.all(questionPromises)
          .then((result)=>{
          //3. Insert into the Options
            let questionAnswerPromises = [];
              // console.log('THIS IS RESULT: ', result);
            for (let i = 0; i < numberOfQuestions; i++) {

              let questionId = result[i].rows[0].id;
              questionAnswerPromises.push(db.query(`
              INSERT INTO answers(question_id,answer,is_right)
              VALUES($1,$2,$3),($1,$4,$5),($1,$6,$7),($1,$8,$9) returning *;`,
              [`${questionId}`, answers[i][0], isRight1, answers[i][1], isRight2, answers[i][2], isRight3, answers[i][3], isRight4]));
            }

            Promise.all(questionAnswerPromises)
              .then((result) => {
                res.redirect(`/myquiz/${userId}`);
              }); //Promise all for questionAnswerPromises
          }); //Promise all for questionPromises;
      }); //Db.Query insertion into the main quizz table
  });





  return router;
};




// router.post('/', (req, res) => {
//   const userId   = req.session.user_id;
//   const quizName = req.body["quizName"];
//   let isPrivate  = req.body["is_private"];
//   const numberOfQuestions = Math.floor(Object.keys(req.body).length / 6);
//   const questionName = [];
//   const answers      = [];
//   let answer        = [];
//   const isRight     = [];
//   let isRight1     = [];

//   isPrivate = false;
//   if (isPrivate.checked) {
//     isPrivate = true;
//   }
//   //loop through all the input field from html,add the contents to Arrays,then insert into tables
//   for (let i = 0; i < numberOfQuestions; i++) {
//     let strQuestionMame = req.body["questionName" + (i + 1)];
//     let strIsRight = req.body["is_right" + (i + 1)];
//     questionName.push(strQuestionMame);//questionName Array
//     for (let j = 0; j < 4; j++) {
//       let strAnswer = req.body["answer" + (4 * i + (j + 1))];
//       answer.push(strAnswer);        //answer Array
//       let strIsRightId = ("a" + (4 * i + (j + 1)));
//       console.log(strIsRight, strIsRightId);
//       if (strIsRight === strIsRightId) {
//         isRight1.push(true);
//       } else {
//         isRight1.push(false);
//       }
//     }
//     isRight[i] = isRight1;
//     answers[i] = answer;
//     isRight1 = [];
//     answer = [];
//   }
//   console.log(answers, isRight);

//   //1. insert quizName to quizzes table
//   db.query(`INSERT INTO quizzes( user_id ,title, is_private) VALUES ($1,$2,$3) returning id;`, [userId, quizName, isPrivate])
//     .then(data => {
//       //get quizId from quiz
//       const quizId = data.rows[0].id;

//       let questionPromises = [];
//       //2. Inserting into the Questions
//       for (let i = 0; i < numberOfQuestions; i++) {
//         questionPromises.push(db.query(`INSERT INTO questions(quiz_id,question) VALUES($1,$2) returning id;`, [`${quizId}`, questionName[i]]));
//       }

//       Promise.all(questionPromises)
//         .then((result)=>{
//         //3. Insert into the Options

//           let questionAnswerPromises = [];
//             // console.log('THIS IS RESULT: ', result);
//           for (let t = 1; t < result.length; t++) {

//             let questionId = result[t].rows[0].id;
//             //console.log("RKV ", result[t].rows[0].id);
//             // questionAnswerPromises.push(db.query(`INSERT INTO answers(question_id,answer,is_right) VALUES($1,$2,$3) returning *;`, [`${questionId}`, answers[t], false]));
//             questionAnswerPromises.push(db.query(`
//             INSERT INTO answers(question_id,answer,is_right)
//             VALUES($1,$2,$3),($1,$4,$5),($1,$6,$7),($1,$8,$9) returning *;`, [`${questionId}`, answers[0], isRight[0], answers[1], isRight[1], answers[2], isRight[2], answers[3], isRight[3]]));
//           }

//           Promise.all(questionAnswerPromises)
//             .then((result) => {

//               res.redirect(`/myquiz/${userId}`);
//             }); //Promise all for questionAnswerPromises
//         }); //Promise all for questionPromises;
//     }); //Db.Query insertion into the main quizz table
// });

// // for (let i = 0; i < numberOfQuestions; i++) {
// //   createQuiz(userId, quizId, questionName[i], answers[i], isRight[i], res);
// // }

// // const createQuiz = function (userId, quizId, questionName, answers, isRight, res) {



// //   db.query(`INSERT INTO questions(quiz_id,question) VALUES($1,$2) returning id;`, [`${quizId}`, questionName])
// //     .then(data => {
// //       const questionId = data.rows[0].id;
// //       db.query(` INSERT INTO answers(question_id,answer,is_right) VALUES($1,$2,$3),($1,$4,$5),($1,$6,$7),($1,$8,$9)   returning *;`, [`${questionId}`, answers[0], isRight[0], answers[1], isRight[1], answers[2], isRight[2], answers[3], isRight[3]])
// //         .then(data => {
// //         })
// //         .then(data => {
// //           res.redirect(`/`);
// //         });
// //     });
// // };










// router.post('/', (req, res) => {
//   const userId   = req.session.user_id; //MUST LOGIN FIRST
//   const quizName = req.body["quizName"];
//   let isPrivate  = req.body["is_private"];
//   const numberOfQuestions = Math.floor(Object.keys(req.body).length / 6);
//   const questionName = [];
//   const answers      = [];
//   let answer        = [];
//   const isRight     = [];
//   let isRight1     = [];

//   isPrivate = false;
//   if (isPrivate.checked) {
//     isPrivate = true;
//   }
//                 console.log('this is body', req.body);

//   //loop through all the input field from html,add the contents to Arrays,then insert into tables
//   for (let i = 0; i < numberOfQuestions; i++) {
//     let strQuestionMame = req.body["questionName" + (i + 1)];
//     let strIsRight = req.body["is_right" + (i + 1)];
//     questionName.push(strQuestionMame);//questionName Array
//     for (let j = 0; j < 4; j++) {
//       let strAnswer = req.body["answer" + (4 * i + (j + 1))];
//       answer.push(strAnswer);        //answer Array
//       let strIsRightId = ("a" + (4 * i + (j + 1)));
//       if (strIsRight === strIsRightId) {
//         isRight1.push(true);
//       } else {
//         isRight1.push(false);
//       }
//     }
//     isRight[i] = isRight1;
//     answers[i] = answer;
//     isRight1 = [];
//     answer = [];
//   }
//   //insert quizName to quizzes table
//               console.log('this is ANSWERS and questionName', answers, questionName);

//   db.query(`INSERT INTO quizzes( user_id ,title, is_private) VALUES ($1,$2,$3) returning id;`, [userId, quizName, isPrivate])
//     .then(data => {
//       //get quizId from quiz
//       const quizId = data.rows[0].id;
//       for (let i = 0; i < numberOfQuestions; i++) {


//         console.log('this is QUIZID:', quizId);


//         createQuiz(userId, quizId, questionName[i], answers[i], isRight[i], res);
//       }
//     });
// });
// const createQuiz = function(userId, quizId, questionName, answers, isRight, res) {
//   db.query(`INSERT INTO questions(quiz_id,question) VALUES($1,$2) returning id;`, [`${quizId}`, questionName])
//     .then(data => {
//       const questionId = data.rows[0].id;

//       db.query(` INSERT INTO answers(question_id,answer,is_right) VALUES($1,$2,$3),($1,$4,$5),($1,$6,$7),($1,$8,$9)   returning *;`, [`${questionId}`, answers[0], isRight[0], answers[1], isRight[1], answers[2], isRight[2], answers[3], isRight[3]])
//         .then(data => {
//           res.redirect(`/myquiz/${userId}`);
//         });
//     });
// };



