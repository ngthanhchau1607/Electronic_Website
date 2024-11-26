const express = require('express');
const route = express.Router();

const categoryControlles = require('../app/controllers/CategoryControllers');

route.post('/create', categoryControlles.create);
route.delete('/delete/:id', categoryControlles.delete);
route.put('/update/:id', categoryControlles.update);
route.get('/', categoryControlles.index);

module.exports = route;
