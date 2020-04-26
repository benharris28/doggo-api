const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('User endpoints', function() {
  let db

  const {
    testUsers,
    testWalks,
  } = helpers.makeWalkFixtures()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db.raw('TRUNCATE walks, users RESTART IDENTITY CASCADE'))

  afterEach('cleanup',() => db.raw('TRUNCATE walks, users RESTART IDENTITY CASCADE'))

  
  describe(`GET /api/user/:user_id`, () => {
   
context('Given there are users in the database', () => {
  beforeEach('insert users and walks', () => {
    return db
      .into('users')
      .insert(testUsers)
      .then(() => {
        return db
          .into('walks')
          .insert(testWalks)
      })

    
  })

  it('responds with 200 and the specified user page', () => {
    const userId = 2
    const expectedUser = helpers.makeExpectedUser(
      userId
    )

    return supertest(app)
      .get(`/api/user/${userId}`)
      .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
      .expect(200, expectedUser)
  })

})

  })
})
