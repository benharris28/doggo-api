const express = require('express')
const UserService = require('./user-service')

const userRouter = express.Router()
const jsonBodyParser = express.json()

userRouter
.route('/user')


userRouter
.route('/user/:user_id')
.all((req, res, next) => {
    UserService.getById(
        req.app.get('db'),
        req.params.user_id
    )
    .then(user => {
        if(!user) {
            return res.status(404).json({
                error: { message: 'User does not exist'}
            })
        }
        res.user = user
        next()
    })
    .catch(next)
})
.get((req, res, next) => {
    UserService.getById(
        res.json(UserService.serializeUser(res.user))
    )  
})


module.exports = userRouter;