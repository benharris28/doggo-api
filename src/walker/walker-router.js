const express = require('express')
const WalkerService = require('./walker-service')

const walkerRouter = express.Router()
const jsonBodyParser = express.json()

const user_type = "walker"

walkerRouter
.route('/')
.get((req, res, next) => {
    WalkerService.getAllWalkers(
        req.app.get('db'),
        user_type

    )
    .then(walkers => {
        res.json(walkers)
    })
    .catch(next)
})

module.exports = walkerRouter