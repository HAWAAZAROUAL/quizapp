SETTING UP MIDTERM PROJECT.

QUIZ APP.

DAILY SCHEDULE
 First meetup: 9:30 PST, 30-40 mins

 Second meetup: 1pm 30-40?? we'll see...

 Wrap-up: 7pm, keep it short

HOW WE WILL PROGRAM:
PAIR PROGRAM: work together through a file 
    - PP through weekend, adjust if needed by monday

Hawaa: 
  strengths: I'm more comfortable with html, css, and sql
  weaknesses: I suck at promises, and javscript is tricky sometimes for me. 

Brian: 
  strength: html, css, sql
  weakness: js

Amy:
strength: sql 
weakness: css html promise too


## Check the requirements 

## User Stories
- As a user, I can make quizzes, because I want to make study questions for my classes.
- As a user, I can share these quizzes with people who want to use them.
- As a non-user, I can take quizzes based off the link that was shared with me. 
- As a user I can make fun quizzes for my friends and I to have fun with.
- As a user I can save the quizzes I made.
- What if the user can update a quiz after it is made... aka add, delete, edit.
- As a user, I can make the quizzes unlisted and make it private but I can share the URL to public
- As a user I can see a list of public quizzes that's available to everybody
- As a user, I can attempt a quiz and either get it right or wrong 
- As a user, I will see my previous attempts and results 
- As a user, i can  see the results of the quiz.
- As a user, I can share the link of my quiz result
- As a user, I can know the detail of wrong or right answer


## Identify the nouns 
- CREATE TABLE 
  users: id (PK), username, email, password
  quizzes: id (PK), user_id (FK), title, 
  questions: id (PK), user_id (FK), quiz_id (FK), question, 
  answers: id (PK), question_id (FK), user_id (FK), answer, isRight(bool)
  results: id (PK), user_id(FK), score, right_answer
  attempts: id (PK), user_id (FK), quiz_id (FK), result_id (FK)
  <!-- urls (maybe- for each quiz a URL is assigned) -->
** ASK MENTOR ABOUT LOGIC ON FOREIGN KEY- IF ONE USES
  INSERT (1, question)
  INSERT (title)
  INSERT ('answer wefnewfwe', true)
  resut INSERT (1, 1, 0)


## Routes (middleman) - routes.md
- name out the resource to ex) menu-tems, maps, item ...

- Browse: GET   /resource
- Read:   GET   /resource/:id
- Edit:   POST  /resource/:id
- Add:    POST  /resource
- Delete: POST  /resource/:id/delete

- Browse
  HOME    GET localhost:8080/ -----------------------DONE
  CREATE  GET localhost:8080/create -----------------DONE
- Read
  HOME    GET localhost:8080/login/:id --------------DONE
  MyQuiz  GET localhost:8080/myquiz/:id -------------DONE
  Quiz    GET localhost:8080/:quizid ----------------DONE
  QuestionGET localhost:8080/:quizid/:question ------STRETCH
  Result  GET localhost:8080/:quizid/result/:id -----DONE
  
  



- IF AJAX:
  - Browse: GET        /resource
  - Read:   GET        /resource/:id
  - Edit:   PUT/PATCH  /resource/:id
  - Add:    POST       /resource
  - Delete: POST       /resource/:id/delete

## WIREFRAMES/MOCKUPS
- General layout 
- minimal, modern
- balsamiq, moqups, draw.io, pen/paper
- Steal the design

## Features
- If not going to demo, don't build it

## Git Merge
- branch merge to master: updating into the main
- master merge to branch: pulling other's updates to mine
- If there's a conflict, for example working together in a single file, 
- 2 options:
  1. merge locally, then push
  2. merge in the cloud, then pull
- general flow:
  1. checkout branch
  2. work on branch
  3. commit frequently
  - General flow
  4. checkout master 
  5. pull the latest master (to be up to date)
  6. merge my branch into master
  7. push to github
  - IF there's a master update while working: 
  4. checkout master
  5. pull master
  6. checkout my branch
  7. merge master into my branch 

## MVP
- Minimum Viable Product
- Minimum Viable Demo (5 min)

## User Login/registeration
- DON'T DO THIS
- Do this: 
```javascript
// ex) localhost:3000/login/7
app.get('/login/:id', (req, res) => {
  // session cookies
  req.session.user_id=req.params.id
  //cookie parse

  res.redirect('/');
})
```

## Tech Stack
- Front End: HTML/CSS/JS/jQuery/SCSS
- Back End: node/express/postgres

## multi-page
EJS files
- Create-quiz
- My-quizzes
- Homepage- login
- Homepage- Public quizzes
- Quiz-page
- Result page


## Splitting 
-edit quiz?up the work
1. Pair programming 

## Functions to make
- createQuiz : this will take the input from the question box, and answers inputted

