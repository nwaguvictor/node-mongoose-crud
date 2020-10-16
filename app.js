const express = require('express');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', require('./routes/userRoutes'));

app.use((err, req, res, next) => {
    err.message = err.message || 'something went wrong';
    console.log(err.message);
    res.status(500).json({
        status: 'fail',
        message: err.message
    })
}) 


module.exports = app;