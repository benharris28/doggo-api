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
          connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
      })
    
      after('disconnect from db', () => db.destroy())
    
      before('cleanup', () => db('walks').truncate())
    
      afterEach('cleanup', () => helpers.cleanTables(db))
      
      describe(`GET /api/walk`, () => {
        context(`Given no walks`, () => {
          it(`responds with 200 and an empty list`, () => {
            return supertest(app)
              .get('/api/walk')
              .expect(200, [])
          })
        })

        context('Given there are walks in the database', () => {
            beforeEach('insert walks', () =>
              helpers.seedArticlesTables(
                db,
                testUsers,
                testArticles,
                testComments,
              )
            )
              })
      })

})