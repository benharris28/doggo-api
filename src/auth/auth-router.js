const express = require('express')
const jsonBodyParser = express.json()

const authRouter = express.Router()
const AuthService = require('./auth-service')

authRouter
    .post('/login', jsonBodyParser, (req, res, next) => {
        console.log(res)
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
                        
                        if (!compareMatch)
                            return res.status(400).json({
                                error: 'Incorrect email or password'
                            })

                            const sub = dbUser.email
                            const payload = { user_id: dbUser.user_id }
                            
                            res.send({ 
                                authToken: AuthService.createJwt(sub, payload),
                                dbUser
                            })
                    })
            })
            .catch(next)
    })

    module.exports = authRouter