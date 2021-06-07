require('dotenv').config();
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;


db.once('open', () => {
    console.log(`Connect to mongoDDB at ${db.host}: ${db.port}`)
}); 


db.on('error', (error)=> {
    console.log(`Database error`, errror);
})


//import alll of your models
const User = require('./User');

// export all the models fro this file
module.exports = {
    User, 
}