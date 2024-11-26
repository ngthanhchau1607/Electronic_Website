const express = require('express'); 
const route = express.Router(); 
const upload = require('../utils/upload');

const productControlles = require('../app/controllers/ProductControllers')

route.post('/create', upload.single('image'), productControlles.create);
route.delete('/delete/:id', productControlles.delete);   
route.put('/update/:id',upload.single('image'), productControlles.update);   
route.get('/', productControlles.index);   

module.exports = route;
