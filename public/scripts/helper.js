// HELPER FUNCTIONS FOR APP.POST
// FXNS FOR BUTTONS

$(document).ready(function() {
  let clickCount=0;
  // ADD QUESTION
  $("#add-question").on("click", function(event) {
    event.preventDefault();
    clickCount ++;
    const $createquiz = $('#New_question_container');
    $createquiz.empty();
    const radios= [];
    const answers= [];
    const questions = [];
    const isRight =[];

    for(let i=1;i<=4;i++) {
      radios.push("a"+(clickCount*4+i));
      answers.push("answer"+(clickCount*4+i));
    }
    questions.push("questionName"+(clickCount+1));
    isRight.push("is_right"+(clickCount+1));

    let $newQuestion = `<h2 class="quiz-question"> Write your question here</h2>
   <div class="write-question">
     <input type="text" name=${questions[0]} placeholder="Type your question here">
   <!-- each div has a possible answer-->
   <h2 class="quiz-question"> Write the answers here</h2>
   <p> Check off the correct answer</p>



     <div class="possible-answer-container">
       <label for="answer1">${answers[0]}</label>
       <input type="text" name=${answers[0]}></input><input id=${radios[0]} type="radio" name=${isRight} value=${radios[0]}  ></input><br>
       <label for="answer1">${answers[1]}</label>
       <input type="text" name=${answers[1]}></input><input id=${radios[1]} type="radio" name=${isRight} value=${radios[1]}  ></input><br>
       <label for="answer1">${answers[2]}</label>
       <input type="text" name=${answers[2]}></input><input id=${radios[2]}   type="radio" name=${isRight} value=${radios[2]}  ></input><br>
       <label for="answer1">${answers[3]}</label>
       <input type="text" name=${answers[3]}></input><input id=${radios[3]} type="radio" name=${isRight} value=${radios[3]} ></input><br>
     </div>
     `;
    $('#create-quiz-container').append($newQuestion);

  });
});





