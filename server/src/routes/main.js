const express = require('express')
const userRoutes = require('./userRouter')


const router = express.Router()
    .use('/user', userRoutes)


module.exports = router