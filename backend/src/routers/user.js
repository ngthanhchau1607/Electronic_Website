const express = require('express'); 
const route = express.Router(); 

const userControlles = require('../app/controllers/UserControllers')

route.post('/create', userControlles.create);   
route.put('/update/:id', userControlles.update);
route.delete('/delete/:id', userControlles.delete);
route.get('/', userControlles.index);   

module.exports = route;
