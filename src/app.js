require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const userRouter = require('./user/user-router');
const authRouter = require('./auth/auth-router')
const walkRouter = require('./walk/walk-router')
const walkerRouter = require('./walker/walker-router')
const photoRouter = require('./photo-upload/photo-router')

const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
    skip: () => NODE_ENV === 'test',
  }))
  app.use(cors())
  app.use(helmet())


app.use('/api/user', userRouter)
app.use('/api/photo', photoRouter)
app.use('/api/auth', authRouter)
app.use('/api/walk', walkRouter)
app.use('/api/walker', walkerRouter)


app.use(function errorHandler(error, req, res, next ) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' }}
    } else {
        
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app