const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const app = express()
const PORT = 5000
const SECRET = 'SECRET'


//Config
const config = require('./confing')
config(app, express, mongoose)


//Router
const router = require('./routes/main')
app.use(router)


//App start
app.listen(PORT, () => console.log(`app running on port ${PORT}`))