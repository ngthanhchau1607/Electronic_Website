const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Tạo thư mục nếu chưa tồn tại
const createDirectory = (dir) => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Thư mục lưu trữ tách biệt
const imageDir = 'uploads/images/';
const audioDir = 'uploads/audio/';

createDirectory(imageDir);
createDirectory(audioDir);

// Thiết lập nơi lưu trữ file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir;
        if (file.mimetype.startsWith('image/')) {
            dir = imageDir; // Thư mục lưu ảnh
        } else if (file.mimetype === 'audio/mpeg') {
            dir = audioDir; // Thư mục lưu mp3
        } else {
            dir = 'uploads/others/'; // Nếu không phải ảnh hoặc mp3, lưu vào thư mục khác
            createDirectory(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '_' + file.originalname;
        cb(null, uniqueSuffix);
    }
});

// Tạo middleware multer
const upload = multer({ storage: storage });

module.exports = upload;
