const mongoose = require('mongoose');
const app = require('./app');

const DB_LOCAL = 'mongodb://localhost:27017/sauce'
mongoose.connect(DB_LOCAL, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Db connected...')
}).catch(err => console.log(err.message));

app.listen(4000, () => {
    console.log('app started on port 4000');
});
