const express = require('express')
const jsonBodyParser = express.json()

const authRouter = express.Router()
const AuthService = require('./auth-service')

authRouter
    .post('/login', jsonBodyParser, (req, res, next) => {
        const { email, password } = req.body 
        const loginUser = { email, password }

        for (const [key, value] of Object.entries(loginUser))
            if (value == null)
            return res.status(400).json({
                error: `Missing '${key}' in request body`
            })

            AuthService.getUserWithEmail(
                req.app.get('db'),
                loginUser.email
                
            )
            .then(dbUser => {
                console.log(loginUser.email)
                if (!dbUser)
                    return res.status(400).json({
                        error: 'Incorrect email or password',
                    })

                return AuthService.comparePasswords(loginUser.password, dbUser.password)
                    .then(compareMatch => {
                        console.log(dbUser.email)
                        if (!compareMatch)
                            return res.status(400).json({
                                error: 'Incorrect email or password'
                            })

                            const user = dbUser.user_id
                            console.log(user)
                            res.send.json({ 
                                user
                            })
                    })
            })
            .catch(next)
    })

    module.exports = authRouter