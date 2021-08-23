// HELPER FUNCTIONS FOR APP.POST
// FXNS FOR BUTTONS

// CREATE QUIZ BUTTON (router.post),ADD INPUTTED QUESTION AND ANSWER TO DATABASE,
// INSERT INTO quizzes (user_id,title,is_private) VALUES ()
// INSERT INTO questions (quizid, question) VALUES ()
// INSERT INTO answers (questionid, answer, is_right) VALUES()

// PUBLIC/PRIVATE BUTTONS (router.post),
// IS_RIGHT SELECTION (router.post)
// DELETE BUTTON: ON MYQUIZZES PAGE (router.post),
// START QUIZ BUTTON (router.post), ON THE HOMEPAGE FOR PUBLIC, AND ON MYQUIZZES,



// ANSWERS BUTTON: FOR EACH QUESTION WHEN A PERSON STARTS THE QUIZ ,



$(document).ready(function() {

  // ADD QUESTION
  $("#add-question").on("click", function() {
    event.preventDefault();

    let $newQuestion = `<h2 class="quiz-question"> Write your question here</h2>
    <div class="write-question">
      <input type="text" name="option" placeholder="Type your question here">
    <!-- each div has a possible answer-->
    <h2 class="quiz-question"> Write the answers here</h2>
    <p> Check off the correct answer</p>

    <form id="answers-form">

      <div class="possible-answer-container">
        <label for="answer1">Answer1</label>
        <input type="text"></input><input id="a5" type="radio" name="is_right"></input><br>
        <label for="answer1">Answer2</label>
        <input type="text"></input><input id="a6" type="radio" name="is_right"></input><br>
        <label for="answer1">Answer3</label>
        <input type="text"></input><input id="a7" type="radio" name="is_right"></input><br>
        <label for="answer1">Answer4</label>
        <input type="text"></input><input id="a8" type="radio" name="is_right"></input><br>
      </div>
      <div class="create-quiz-container"></div>
      </form>`;
    $('.create-quiz-container').append($newQuestion);
    console.log("HELLO WORRRRLD");
  });
});








