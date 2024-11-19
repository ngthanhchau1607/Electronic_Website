// routers/song.js
const express = require('express'); 
const route = express.Router();   
const upload = require('../utils/upload');
const songControllers = require('../app/controllers/SongControllers');

// Đường dẫn để tải lên cả file audio và hình ảnh
route.post('/create', upload.fields([
    { name: 'file_path', maxCount: 1 }, // file audio
    { name: 'song_image', maxCount: 1 } // file hình ảnh
]), songControllers.create); 

// Cập nhật bài hát
route.put('/update/:id', upload.fields([
    { name: 'file_path', maxCount: 1 },
    { name: 'song_image', maxCount: 1 }
]), songControllers.update);

route.get('/', songControllers.index);  

module.exports = route;
