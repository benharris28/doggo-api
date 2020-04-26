const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Walk Endpoints', function() {
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
      
      describe(`GET /api/walk`, () => {
        context(`Given no walks`, () => {
          it(`responds with 200 and an empty list`, () => {
            return supertest(app)
              .get('/api/walk')
              .expect(200, [])
          })
        })

        
            context('Given there are articles in the database', () => {
        
        
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
        
              it('responds with 200 and all of the walks', () => {
                return supertest(app)
                  .get('/api/walk')
                  .expect(200, testWalks)
              })
            })

            context(`Given an XSS attack walk`, () => {
                const testUsers = helpers.makeUsersArray();
                const { maliciousWalk, expectedWalk } = helpers.makeMaliciousWalk()
          
                beforeEach('insert malicious walk', () => {
                  return db
                    .into('users')
                    .insert(testUsers)
                    .then(() => {
                      return db
                        .into('walks')
                        .insert([ maliciousWalk ])
                    })
                })
          
                it('removes XSS attack content', () => {
                  return supertest(app)
                    .get(`/api/walk`)
                    .expect(200)
                    .expect(res => {
                      expect(res.body[0].user_firstname).to.eql(expectedWalk.user_firstname)
                      expect(res.body[0].dog_name).to.eql(expectedWalk.dog_name)
                    })
                })
        
      })
    })

    
})