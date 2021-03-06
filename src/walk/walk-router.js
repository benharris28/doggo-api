const express = require('express')
const path = require('path')
const WalkService = require('./walk-service')
const { requireAuth } = require('../middleware/jwt-auth')




const walkRouter = express.Router()
const jsonBodyParser = express.json()



walkRouter
.route('/')
.get((req, res, next) => {
    WalkService.getAllWalks(
        req.app.get('db'),

    )
    .then(walks => {
        res.json(walks.map(WalkService.serializeWalk))
    })
    .catch(next)
})
.post(jsonBodyParser, (req, res, next) => {
    const {
        walker_id,
        user_id,
        user_firstname,
        dog_name,
        walker_firstname,
        walk_date,
        pickup_address_street_number,
        pickup_address_street_name,
        pickup_address_city,
        pickup_address_province,
        pickup_address_postal_code,
        walk_status
    } = req.body
   
    const newWalk = {
        walker_id,
        user_id,
        user_firstname,
        dog_name,
        walker_firstname,
        walk_date,
        pickup_address_street_number,
        pickup_address_street_name,
        pickup_address_city,
        pickup_address_province,
        pickup_address_postal_code,
        walk_status
    };
    

    for (const [key, value] of Object.entries(newWalk))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })
    
    
    WalkService.createWalk(
        req.app.get('db'),
        newWalk
    )
    .then(walk => {
        res
            .status(201)
            .location(path.posix.join(req.originalUrl,`/${walk.walk_id}`))
            .json(WalkService.serializeWalk(walk))
            

    })
    .catch(next)
})

walkRouter
.route('/:walk_id')
.all(requireAuth)
.all(checkWalkExists)
.get((req, res) => {
   
    res.json(res.walk)
  })
.patch(jsonBodyParser, (req, res, next) => {
    const { walk_status, rating, comment } = req.body 
    const walkToUpdate = { walk_status, rating, comment }

    WalkService.updateWalk(
        req.app.get('db'),
        req.params.walk_id,
        walkToUpdate
    )
    .then(numRowsAffected => {
        res.status(204).end()
    })
    .catch(next)
})


  walkRouter
  .route('/all/user/:user_id')
  .all(requireAuth)
  .get((req, res, next) => {
      WalkService.getAllWalksForUserId(
          req.app.get('db'),
          req.params.user_id
      )
      .then(walks => {
          res.json(walks)
      })
     .catch(next)

    })

walkRouter
  .route('/all/walker/:user_id')
  .get((req, res, next) => {
      WalkService.getAllWalksForWalkerId(
          req.app.get('db'),
          req.params.user_id
      )
      .then(walks => {
          res.json(walks)
      })
     .catch(next)

    })



async function checkWalkExists(req, res, next) {
    try {
      const walk = await WalkService.getWalkById(
        req.app.get('db'),
        req.params.walk_id
      )
  
      if (!walk)
        return res.status(404).json({
          error: `Walk doesn't exist`
        })
  
      res.walk = walk
      next()
    } catch (error) {
      next(error)
    }
  }

module.exports = walkRouter