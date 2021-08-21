$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
  $.ajax({
    method: "GET",
    url: "/api/quizzes"
  }).done((quizzes) => {
    for(quiz of quizzes) {
      $("<div>").text(quiz.title).appendTo($("body"));
    }
  });
});
