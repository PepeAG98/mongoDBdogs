const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const dogsRouter = require('./routes/dogs');

mongoose.connect('mongodb://127.0.0.1:27017/pets2DB',
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const app = express();

app.use(logger('dev'));
app.use(express.json());//convierte todo a json
app.use(express.urlencoded({ extended: false }));//convierte raiz url en datos validos para expres
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/dogs', dogsRouter);

app.use((error, req, res, next) => {
    if (error) {
        res.status(500).json({
            message: error.message,
            type: error.name
        })
    }
})

app.get('*', (req,res) => {
    res.status(404).send('Route not found');
});

module.exports = app;
