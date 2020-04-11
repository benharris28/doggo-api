const express = require('express')
const WalkService = require('./walk-service')
//const { requireAuth } = require('../middleware/jwt-auth')

const walkRouter = express.Router()

//const serializeWalk = walk => ({
    //id: note.id,
    //name: xss(note.name),
    //modified: note.modified,
    //folderid: xss(note.folderid),
    //content: xss(note.content)

//})

walkRouter
.route('/:walk_id')
.all(checkWalkExists)
.get((req, res) => {
   
    res.json(res.walk)
  })


  walkRouter
  .route('/all/:user_id')
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