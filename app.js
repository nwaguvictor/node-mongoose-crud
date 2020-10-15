const express = require('express');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', require('./routes/userRoutes'));

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        status: 'fail',
        message: 'something went wrong'
    })
}) 


module.exports = app;