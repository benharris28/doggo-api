BEGIN;

TRUNCATE
  users,
  walks
  RESTART IDENTITY CASCADE;

  INSERT INTO users (user_type, first_name, last_name, email, password, dog_name, rating, postal_short, profile_photo, bio)

    VALUES
        ('user', 'user1', 'user', 'testuser1@testy.com', 'test', 'dog1', 4.8, 'M5P', 'https://www.w3schools.com/bootstrap4/img_avatar6.png', 'Test 1 bio'),
        ('walker', 'walker1', 'walker', 'testwalker1@testy.com', 'test', 'dog1', 4.7, 'M2P', 'https://www.w3schools.com/bootstrap4/img_avatar6.png', 'Test 2 bio'),
        ('walker', 'walker2', 'walker', 'testwalker2@testy.com', 'test', 'dog2', 4.5, 'M3P', 'https://www.w3schools.com/bootstrap4/img_avatar6.png', 'Test 3 bio'),
        ('walker', 'walker3', 'walker', 'testwalker3@testy.com', 'test', 'dog3', 4.4, 'M1P', 'https://www.w3schools.com/bootstrap4/img_avatar6.png', 'Test 4 bio'),
        ('user', 'user2', 'user', 'testuser2@testy.com', 'test', 'dog5', 4.9, 'M1P', 'https://www.w3schools.com/bootstrap4/img_avatar6.png', 'Test 4 bio');

    INSERT INTO walks (
        walker_id,
        user_id,
        user_firstname,
        dog_name,
        walker_firstname,
        request_time,
        walk_date,
        pickup_address_street_number,
        pickup_address_street_name,
        pickup_address_city,
        pickup_address_province,
        pickup_address_postal_code,
        walk_status,
        rating,
        comment
    )

    VALUES
        (2, 1, 'user1', 'Dog 1', 'walker1', '03-01-2020', '03-02-2020', 25, 'Fake street', 'Toronto', 'Ontario', 'M2P1Z6', 'complete', 4.8, 'Great walk'),
        (2, 1, 'user1', 'Dog 1', 'walker1', '03-02-2020', '05-02-2020', 25, 'Fake street', 'Toronto', 'Ontario', 'M2P1Z6', 'requested', null, null),
        (2, 2, 'user2', 'Dog 2', 'walker1', '03-05-2020', '06-02-2020', 289, 'Fake street', 'Toronto', 'Ontario', 'M2P1Z6', 'requested', null, null),
        (2, 2, 'user2', 'Dog 2', 'walker1', '03-05-2020', '06-02-2020', 289, 'Fake street', 'Toronto', 'Ontario', 'M2P1Z6', 'accepted', null, null);
    
    COMMIT;