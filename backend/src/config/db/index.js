const mongoose = require('mongoose');

function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Connected!'));
        
    } catch (error) {
        console.log('Connect that bai');
    }
}


module.exports = { connect };