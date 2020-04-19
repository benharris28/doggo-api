const path = require('path')
const express = require('express')
const UserService = require('./user-service')

const userRouter = express.Router()
const jsonBodyParser = express.json()



userRouter
.post('/', jsonBodyParser, (req, res, next) => {
    const { email, password, first_name, last_name, user_type, dog_name } = req.body

    for (const field of ['first_name', 'last_name', 'email', 'password', 'user_type'])
        if (!req.body[field])
            return res.status(400).json({
                error: `Missing '${field}' in request body`
            })
    
    const passwordError = UserService.validatePassword(password)

    if (passwordError)
        return res.status(400).json({ error: passwordError })

    UserService.hasUserWithEmail(
        req.app.get('db'),
        email
    )
    .then(hasUserWithEmail => {
        if(hasUserWithEmail) 
            return res.status(400).json({ error: `Username already taken`})
        
            
    

    return UserService.hashPassword(password)
        .then(hashedPassword => {
            const newUser = {
                user_type,
                first_name,
                last_name,
                email,
                password: hashedPassword,
                dog_name,
                date_created: 'now()'
            }
        
    
    return UserService.insertUser(
        req.app.get('db'),
        newUser
    )
    .then(user => {
        console.log(user)
        res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${user.user_id}`))
            .json(UserService.serializeUser(user))
        }) 
    })
})
    .catch(next) 

})

userRouter
.route('/:user_id')
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
        res.json(res.user)
    )  
})
.patch(jsonBodyParser, (req, res, next) => {
    const { bio } = req.body 
    const updatedBio = { bio }

    UserService.patchBio(
        req.app.get('db'),
        req.params.user_id,
        updatedBio
    )
    .then(numRowsAffected => {
        res.status(204).end()
    })
    .catch(next)
})


module.exports = userRouter;