require('dotenv').config()

const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const productRoutes = require('./routes/product')

//express app
const app = express()

app.use(cors());
//middleware
app.use(express.json())

app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})


//routes
app.use('/api/product', productRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        app.listen(process.env.PORT, () => {
            console.log('Listening in port', process.env.PORT)
        })
    })
    .catch((error) =>{
        console.log(error)
    })



