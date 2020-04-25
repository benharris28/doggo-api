const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Protected endpoints', function() {
  let db

  const {
    testUsers,
    testWalks,
  } = helpers.makeWalkFixtures()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db.raw('TRUNCATE walks, users RESTART IDENTITY CASCADE'))

  afterEach('cleanup',() => db.raw('TRUNCATE walks, users RESTART IDENTITY CASCADE'))

  

  beforeEach('insert walks', () => {
    return db
      .into('users')
      .insert(testUsers)
      .then(() => {
        return db
          .into('walks')
          .insert(testWalks)
      })
  })

  const protectedEndpoints = [
    {
      name: 'GET /api/walk/:walk_id',
      path: '/api/walk/1',
      method: supertest(app).get,
    },
    {
        name: 'GET /api/user/:user_id',
        path: '/api/user/1',
        method: supertest(app).get,
      },
    
  ]

  protectedEndpoints.forEach(endpoint => {
    describe(endpoint.name, () => {
      it(`responds 401 'Missing bearer token' when no bearer token`, () => {
        return endpoint.method(endpoint.path)
          .expect(401, { error: `Missing bearer token` })
      })

      it(`responds 401 'Unauthorized request' when invalid JWT secret`, () => {
        const validUser = testUsers[0]
        const invalidSecret = 'bad-secret'
        return endpoint.method(endpoint.path)
          .set('Authorization', helpers.makeAuthHeader(validUser, invalidSecret))
          .expect(401, { error: `Unauthorized request` })
      })

      it(`responds 401 'Unauthorized request' when invalid sub in payload`, () => {
        const invalidUser = { email: 'user-not-existy', user_id: 1 }
        return endpoint.method(endpoint.path)
          .set('Authorization', helpers.makeAuthHeader(invalidUser))
          .expect(401, { error: `Unauthorized request` })
      })
    })
  })
})