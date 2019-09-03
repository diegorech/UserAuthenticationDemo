const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()
//Import routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

dotenv.config()

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT, 
    { useNewUrlParser: true },
    () => console.log( 'Connected to DB' ),
)

//Middleware
app.use(express.json())


//Routes Milddlewares
app.use('/api/posts', postRoute)
app.use('/api/user', authRoute)


app.listen(3000, () => console.log( 'Server UP' ))
