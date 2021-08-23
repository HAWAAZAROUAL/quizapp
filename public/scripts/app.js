$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
});

// $.ajax({
//   method: "POST",
//   url: "/create",

// }).done((quizzes) => {
//   for(quiz of quizzes) {
//     $("<div>").text(quiz.title).appendTo($("body"));
//   }
// });

// $("#frtweet").submit(function (event) {
//   event.preventDefault();

//     $.post('/tweets', serializedData, () => {
//       $("text").text("");
//       $(".container").toggle("slow");

//       loadTweets();
//     });
//   }
// });
// function insert(form_name){
//   const serializedData = $(this).serialize();
//   $( "#results" ).text( str );
//   $.ajax({
//     type: "POST",
//     url: "/public/quizzes",
//     data: serializedData,
//     success : function(res){
//   //  console.log(res); }
//   });
// }
