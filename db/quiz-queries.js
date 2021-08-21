const { response } = require('express');
const db = require('./db');

const getQuizzes=()=>{
   return  db.query(`SELECT * FROM quizzes;`)
      .then((response) => {

        return response.rows;
      })
      .catch((err) => err.message);
};
module.exports = { getQuizzes};
