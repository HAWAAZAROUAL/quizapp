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

// //for create page
// $.ajax({
//   method: "POST",
//   url: "/create",

// }).done((quizzes) => {
//   for(quiz of quizzes) {
//     $("<div>").text(quiz.title).appendTo($("body"));
//   }
// });

// $.ajax({
//   url: 'http://www.yoururl.com/script.php',
//   type: 'POST',
//   cache: false,
//   data: $('#form1').serialize() + '&yournewvar=yournewvalue',
//   success: function(msg) {
//       location.reload();
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
