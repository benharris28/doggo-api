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
            password: "TestUser1!",
            dog_name: "dog1",
            rating: null,
            postal_short: null,
            profile_photo: null,
            bio: "test bio",
            date_created: '2020-01-22T16:28:32.615Z'
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
            date_created: '2020-01-22T16:28:32.615Z'
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
            date_created: '2020-02-22T16:28:32.615Z'
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
            date_created: '2020-02-22T16:28:32.615Z'
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
            request_time: "10:00:00",
            walk_date: '2020-06-22T16:28:32.615Z',
            pickup_address_street_number: 3,
            pickup_address_street_name: "Test Street",
            pickup_address_city: "Toronto",
            pickup_address_province: "Ontario",
            pickup_address_postal_code: "M6T4J9",
            walk_status: "requested",
            rating: 5,
            comment: "test"

        },
        {
            walk_id: 2,
            walker_id: 3,
            user_id: 1,
            user_firstname: "User2",
            dog_name: "dog2",
            walker_firstname: "Walker 1",
            request_time: "10:00:00",
            walk_date: '2020-03-22T16:28:32.615Z',
            pickup_address_street_number: 8,
            pickup_address_street_name: "Test Street",
            pickup_address_city: "Toronto",
            pickup_address_province: "Ontario",
            pickup_address_postal_code: "M6T4J9",
            walk_status: "complete",
            rating: 5,
            comment: "test"

        },
        {
            walk_id: 3,
            walker_id: 3,
            user_id: 1,
            user_firstname: "User2",
            dog_name: "dog2",
            walker_firstname: "Walker 1",
            request_time: "10:00:00",
            walk_date: '2020-02-24T16:28:32.615Z',
            pickup_address_street_number: 12,
            pickup_address_street_name: "Test Street",
            pickup_address_city: "Toronto",
            pickup_address_province: "Ontario",
            pickup_address_postal_code: "M6T4J9",
            walk_status: "complete",
            rating: 4,
            comment: "test"

        }
    ]
}

function makeExpectedUser(userId) {
  
   const selectUser = makeUsersArray()
   const user = selectUser.find(u => u.user_id === userId)
  
  return {
    user_id: user.user_id,
    user_type: user.user_type,
    first_name: user.first_name,
    last_name: user.last_name,
    password: user.password,
    email: user.email,
    dog_name: user.dog_name,
    rating: user.rating,
    postal_short: user.postal_short,
    profile_photo: user.profile_photo,
    bio: user.bio,
    date_created: user.date_created
  }
}

function makeExpectedWalk(users, walk) {
   
  
    return {
        walk_id: walk.walk_id,
        walker_id: walk.walker_id,
        user_id: walk.user_id,
        user_firstname: walk.user_firstname,
        dog_name: walk.dog_name,
        walker_firstname: walk.walker_firstname,
        walk_date: walk.walk_date,
        pickup_address_street_number: walk.pickup_address_street_number,
        pickup_address_street_name: walk.pickup_address_street_name,
        pickup_address_city: walk.pickup_address_city,
        pickup_address_province: walk.pickup_address_province,
        pickup_address_postal_code: walk.pickup_address_postal_code,
        walk_status: walk.walk_status
    }
  }

  function makeMaliciousWalk() {
    const maliciousWalk = {
      walk_id: 911,
      walker_id: 2,
      user_id: 1,
      user_firstname: 'Naughty naughty very naughty <script>alert("xss");</script>',
      dog_name: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
      walker_firstname: 'Jim',
      request_time: null,
      walk_date: new Date().toISOString(),
      pickup_address_street_number: 3,
      pickup_address_street_name: "test",
      pickup_address_city: 'Toronto',
      pickup_address_province: 'test',
      pickup_address_postal_code: 'test',
      walk_status: 'requested',
      rating: null,
      comment: null,
    }
    const expectedWalk = {
      ...maliciousWalk,
      user_firsname: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
      dog_name: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
    }
    return {
      maliciousWalk,
      expectedWalk,
    }
  }

function makeWalkFixtures() {
    const testUsers = makeUsersArray()
    const testWalks = makeWalksArray()
    return { testUsers, testWalks}
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('users').insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('users_id_seq', ?)`,
        [users[users.length - 1].user_id],
      )
    )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.user_id }, secret, {
    subject: user.email,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

  /*
  function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
      ...user,
      password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('users').insert(preppedUsers)
      .then(() =>
        // update the auto sequence to stay in sync
        db.raw(
          `SELECT setval('users_user_id_seq', ?)`,
          [users[users.length - 1].id],
        )
      )
  }

  */

  /*

  function seedWalksTables(db, users, walks) {
     use a transaction to group the queries and auto rollback on any failure
    return db.transaction(async trx => {
      await seedUsers(trx, users)
      await trx.into('walks').insert(walks)
       update the auto sequence to match the forced id values
      await trx.raw(
        `SELECT setval('walks_walk_id_seq', ?)`,
        [walks[walks.length - 1].walk_id],
      )
      
     
    })
  }

  */



  

module.exports = {
    makeUsersArray,
    makeWalksArray,
    makeMaliciousWalk,
    makeExpectedUser,
    seedUsers,
   
   
    
    makeAuthHeader,
    makeWalkFixtures,
   
   
}