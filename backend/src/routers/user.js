const express = require('express'); 
const route = express.Router(); 

const userControlles = require('../app/controllers/UserControllers')


route.post('/create', userControlles.createUser);
route.get('/verify-email', userControlles.verifyEmail);
route.post('/login', userControlles.loginUser); 
route.post('/forgot-password', userControlles.forgotPassword);
route.post('/verify-otp', userControlles.verifyOtp);
route.post('/reset-password', userControlles.resetPassword);

module.exports = route;
