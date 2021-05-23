require('./config/config');
require('./models/db')
require('./config/passportConfig')

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const rtsIndex = require('./routes/index.router');
var memberController = require('./controllers/memberController.js')

var app = express();
const path = require('path');

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('',rtsIndex);

// error handler
app.use((err,req,res,next)=>{
    if (err.name === 'ValidationError'){
        var valErrors = [];
        Object.keys(err.error).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
})


app.use(express.static(path.join(__dirname,'dist/Serendipity-MK1')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/Serendipity-MK1/index.html'))
})


app.use('/members',memberController);

// start server
app.listen(process.env.PORT,  ()=> console.log(`Server started at port : ${process.env.PORT}`));
