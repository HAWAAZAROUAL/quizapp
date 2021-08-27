# QuizWiz

QuizWiz is a multi-page app, where you can create, take, delete or share quizzes. When creating, you can make the quiz either public or private. Upon completion, you'll be able to see your results and share it with your friends. 

# Screenshots 

### Homepage
!["Home"](https://github.com/kolpp15/quizapp/blob/main/docs/QuizWiz-Home.png?raw=true)

### Public Quizzes
!["Public"](https://github.com/kolpp15/quizapp/blob/main/docs/QuizWiz-Public.png?raw=true)

### Create a Quiz
!["Create"](https://github.com/kolpp15/quizapp/blob/main/docs/QuizWiz-Create.png?raw=true)

### My Quizzes
!["MyQuiz"](https://github.com/kolpp15/quizapp/blob/main/docs/QuizWiz-MyQuiz.png?raw=true)

### Quiz
!["Quiz"](https://github.com/kolpp15/quizapp/blob/main/docs/QuizWiz-Quiz.png?raw=true)

### Results
!["Results"](https://github.com/kolpp15/quizapp/blob/main/docs/QuizWiz-Result.png?raw=true)


# Getting Started
1. Fork this repository, then clone your for of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at http://localhost:8080/.
4. Go to http://localhost:8080/ in your browser.
5. Pages
    1. Homepage: 
        - Create Quiz, My Quizzes redirect buttons.
        - List of all public quizzes with a shareable URL and start button.
    2. Create Quiz: 
        - Create a new quiz by adding a new set of questions and answers. 
        - Expand more sets by clicking `Add a new question button`.
    3. My Quiz: 
        - List of all the quizzes you created.
        - Start, Delete buttons. 
        - Shareable URL available. 
    4. Result:
        - Your name, Quiz Title, Total questions, Score, and a shareable result page

# Dependencies
- Express
- Node.js
- Body-parser
- Chalk
- Cookie-session
- Dotenv
- EJS
- Express
- Morgan
- Mode-sass-middleware
- pg
- pg-native
- Nodemon
