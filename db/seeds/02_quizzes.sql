--EACH USER HAS 3 SET OF QUIZZES
INSERT INTO quizzes (user_id,title,is_private) VALUES (1,'Alice Quiz Title 1',false);
INSERT INTO quizzes (user_id,title,is_private) VALUES (2,'Kira Quiz Title 1',false);
INSERT INTO quizzes (user_id,title,is_private) VALUES (3,'Amy Quiz Title 1',false);

INSERT INTO quizzes (user_id,title,is_private) VALUES (1,'Alice Quiz Title 2',false);

-- BELOW QUIZZES DO NOT HAVE ANY QUESTIONS / ANSWERS SEEDS
INSERT INTO quizzes (user_id,title,is_private) VALUES (2,'Kira Quiz Title 2',false);
INSERT INTO quizzes (user_id,title,is_private) VALUES (3,'Amy Quiz Title 2',true);

INSERT INTO quizzes (user_id,title,is_private) VALUES (1,'Alice Quiz Title 3',false);
INSERT INTO quizzes (user_id,title,is_private) VALUES (2,'Kira Quiz Title 3',false);
INSERT INTO quizzes (user_id,title,is_private) VALUES (3,'Amy Quiz Title 3',false);

