const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
    return [
        {
            user_id: 1,
            user_type: "user",
            first_name: "User1",
            last_name: "User1",
            email: "testuser1@testy.com",
            password: "test",
            dog_name: "dog1",
            rating: null,
            postal_short: null,
            profile_photo: null,
            bio: "test bio",
            date_created: "2020-04-10 22:00:00"
        },
        {
            user_id: 2,
            user_type: "user",
            first_name: "User2",
            last_name: "User2",
            email: "testuser2@testy.com",
            password: "test",
            dog_name: "dog2",
            rating: null,
            postal_short: null,
            profile_photo: null,
            bio: "test bio 2",
            date_created: "2020-04-10 22:00:00"
        },
        {
            user_id: 3,
            user_type: "walker",
            first_name: "Walker 1",
            last_name: "Walker",
            email: "testwalker1@testy.com",
            password: "test",
            dog_name: "dog2",
            rating: null,
            postal_short: null,
            profile_photo: null,
            bio: "test walker bio 1",
            date_created: "2020-04-10 22:00:00"
        },
        {
            user_id: 4,
            user_type: "walker",
            first_name: "Walker 2",
            last_name: "Walker",
            email: "testwalker2@testy.com",
            password: "test",
            dog_name: "dog4",
            rating: null,
            postal_short: null,
            profile_photo: null,
            bio: "test walker bio 2",
            date_created: "2020-04-11 22:00:00"
        },
    ]
}

function makeWalksArray(users) {
    return [
        {
            walk_id: 1,
            walker_id: 3,
            user_id: 1,
            user_firstname: "User1",
            dog_name: "dog1",
            walker_firstname: "Walker 1",
            request_time: null,
            walk_date: "2020-04-28 10:00:00",
            pickup_address_street_number: 3,
            pickup_address_street_name: "Test Street",
            pickup_address_city: "Toronto",
            pickup_address_province: "Ontario",
            pickup_address_postal_code: "M6T4J9",
            walk_status: "requested",
            rating: null,
            comment: null

        },
        {
            walk_id: 2,
            walker_id: 3,
            user_id: 1,
            user_firstname: "User2",
            dog_name: "dog2",
            walker_firstname: "Walker 1",
            request_time: null,
            walk_date: "2020-04-30 10:00:00",
            pickup_address_street_number: 8,
            pickup_address_street_name: "Test Street",
            pickup_address_city: "Toronto",
            pickup_address_province: "Ontario",
            pickup_address_postal_code: "M6T4J9",
            walk_status: "complete",
            rating: 5,
            comment: null

        },
        {
            walk_id: 3,
            walker_id: 3,
            user_id: 1,
            user_firstname: "User2",
            dog_name: "dog2",
            walker_firstname: "Walker 1",
            request_time: null,
            walk_date: "2020-05-30 10:00:00",
            pickup_address_street_number: 12,
            pickup_address_street_name: "Test Street",
            pickup_address_city: "Toronto",
            pickup_address_province: "Ontario",
            pickup_address_postal_code: "M6T4J9",
            walk_status: "complete",
            rating: 5,
            comment: null

        }
    ]
}

function cleanTables(db) {
    return db.transaction(trx =>
      trx.raw(
        `TRUNCATE
          walks,
          users
        `
      )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE walks_walk_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE users_user_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('walks_walk_id_seq', 0)`),
          trx.raw(`SELECT setval('users_user_id_seq', 0)`),
        ])
      )
    )
  }

function makeWalkFixtures() {
    const testUsers = makeUsersArray()
    const testWalks = makeWalksArray()
    return { testUsers, testWalks}
}
module.exports = {
    makeUsersArray,
    makeWalksArray,
    makeWalkFixtures,
    cleanTables
}