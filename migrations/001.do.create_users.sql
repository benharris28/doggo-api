CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_type TEXT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    dog_name TEXT,
    rating INTEGER,
    postal_short TEXT,
    profile_photo TEXT,
    bio TEXT,
    date_created TIMESTAMP NOT NULL DEFAULT now()


)