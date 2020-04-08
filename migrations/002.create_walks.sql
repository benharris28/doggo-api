CREATE TABLE walks (
    walk_id SERIAL PRIMARY KEY,
    walker_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
    user_firstname TEXT  NOT NULL,
    dog_name TEXT  NOT NULL,
    walker_firstname TEXT NOT NULL,
    request_time TIMESTAMP NOT NULL,
    walk_date TIMESTAMP NOT NULL,
    pickup_address_street_number INTEGER NOT NULL,
    pickup_address_street_name TEXT NOT NULL,
    pickup_address_city TEXT NOT NULL,
    pickup_address_province TEXT NOT NULL,
    pickup_address_postal_code TEXT NOT NULL,
    walk_status TEXT NOT NULL,
    rating INTEGER,
    comment TEXT

)