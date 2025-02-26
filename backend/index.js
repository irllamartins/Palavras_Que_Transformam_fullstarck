const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const { mongoose } = require('mongoose')

const app = express()

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log("Database not connected", err))

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const port = process.env.PORT

app.use("/", require('./routes/authRoutes'))
app.use("/",require('./routes/textRoutes'))   
app.use("/",require('./routes/rankingRoutes')) 

app.listen(port, () => console.log(`Server is running on port ${port}... `))