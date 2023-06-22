require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("uploads"));

//databse connection

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})

.then(() => {
    console.log("MongoDb Connected")
})

.catch(err => console.log(err))

const Route = require('./routes/route.js');
  app.use('/api/post', Route)

app.listen(3000, () => {
    console.log("listenning at port 3000")
})
