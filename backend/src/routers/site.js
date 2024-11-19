const express = require('express');
const route = express.Router();

const siteControlles = require('../app/controllers/SiteControllers');

route.post('/login', siteControlles.login);

route.post('/register', siteControlles.register);

route.get('/', siteControlles.index);

module.exports = route;
