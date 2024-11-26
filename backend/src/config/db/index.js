const mongoose = require('mongoose');

function connect(){
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/tlcn')
        .then(() => console.log('Connected!'));
    } catch (error) {
        console.log('Connect that bai');
    }
}


module.exports = { connect };