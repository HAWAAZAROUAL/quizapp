// HELPER FUNCTIONS FOR APP.POST
// FXNS FOR BUTTONS

$(document).ready(function() {
  let clickCount = 0;
  // ADD QUESTION
  $("#add-question").on("click", function(event) {
    event.preventDefault();
    clickCount ++;
    const $createquiz = $('#empty-here');
    $createquiz.empty();
    const radios = [];
    const answers = [];
    const questions = [];
    const isRight = [];

    for (let i = 1; i <= 4; i++) {
      radios.push("a" + (clickCount * 4 + i));
      answers.push("answer" + (clickCount * 4 + i));
    }
    questions.push("questionName" + (clickCount + 1));
    isRight.push("is_right" + (clickCount + 1));

    let $newQuestion = `
    <div class="quiz-question-section">
    <h2 class="quiz-question"> Write your question here</h2>
    <input type="text" id="new-quiz-question" name=${questions[0]} placeholder="Type your question here">
    </div>



    <div class="quiz-answer-section">
    <h2 class="quiz-answer"> Write the answers here</h2>
    <p> *Check off the correct answer</p>

    <div class="possible-answer-container">
      <label id="answer1" for="answer1">${answers[0]}</label>
        <div class="answer-text-radio">
          <input class="answertext" type="text" name=${answers[0]}></input>
          <input id=${radios[0]} class="answer-radio" type="radio" name=${isRight} value=${radios[0]} ></input><br>
        </div>

      <label id="answer2" for="answer1">${answers[1]}</label>
        <div class="answer-text-radio">
          <input class="answertext" type="text" name=${answers[1]}></input>
          <input id=${radios[1]} class="answer-radio" type="radio" name=${isRight} value=${radios[1]}></input><br>
        </div>

      <label  id="answer3" for="answer1">${answers[2]}</label>
        <div class="answer-text-radio">
          <input class="answertext" type="text" name="answer3"></input>
          <input id=${radios[2]} class="answer-radio" type="radio" name=${isRight} value=${radios[2]}></input><br>
        </div>

      <label id="answer4" for="answer1">${answers[3]}</label>
        <div class="answer-text-radio">
          <input class="answertext" type="text" name="answer4"></input>
          <input id=${radios[3]} class="answer-radio" type="radio" name=${isRight} value=${radios[3]}></input><br>
        </div>
    </div>
    </div>
    `;
    $('#create-quiz-container').append($newQuestion);

  });
});
