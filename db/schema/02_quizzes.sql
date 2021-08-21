<<<<<<< HEAD
-- Drop and recreate Users table (Example)

=======
>>>>>>> 76e3c660d74d990314f8ddfc841c0cbf9c6e8958
DROP TABLE IF EXISTS quizzes CASCADE;
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title  VARCHAR(255) NOT NULL,
  is_private BOOLEAN NOT NULL
);
