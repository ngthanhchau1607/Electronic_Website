

const Song = require('../models/Song')
class NewsControllers {


    async create(req, res, next) {
        try {
            // Lấy đường dẫn file audio và hình ảnh từ req.files
            const filePath = req.files?.['file_path']?.[0]?.path; // Đường dẫn tới file audio
            const songImage = req.files?.['song_image']?.[0]?.path; // Đường dẫn tới hình ảnh
            
            // Kiểm tra nếu không có file_path hoặc song_image thì trả về lỗi
            if (!filePath || !songImage) {
                return res.status(400).json({ message: 'File audio hoặc hình ảnh không được cung cấp' });
            }
    
            // Kiểm tra sự tồn tại của các trường bắt buộc
            const { name, artist_id, genre_id, song_time } = req.body;
            if (!name || !artist_id || !genre_id || !song_time) {
                return res.status(400).json({ message: 'Thiếu thông tin bài hát cần thiết' });
            }
    
            // Tạo đối tượng bài hát mới
            const newSong = new Song({
                song_id: Date.now().toString(), // Tạo song_id tự động
                name: name,
                artist_id: artist_id, // Sử dụng artist_id từ request
                album_id: req.body.album_id || null, // album_id có thể bỏ trống
                genre_id: genre_id, // Sử dụng genre_id từ request
                file_path: filePath, // Đường dẫn file audio
                song_image: songImage, // Đường dẫn hình ảnh bài hát
                song_time: song_time,
            });
    
            // Lưu bài hát vào MongoDB
            const savedSong = await newSong.save();
            
            // Trả về phản hồi thành công
            res.status(201).json(savedSong);
        } catch (error) {
            console.error('Error saving song:', error);
            res.status(500).json({ message: 'Error saving song', error });
        }
    }
    
    async update(req, res, next) {
        try {
            // Lấy id bài hát từ params
            const songId = req.params.id;
    
            // Tìm bài hát trong cơ sở dữ liệu
            const existingSong = await Song.findById(songId);
            if (!existingSong) {
                return res.status(404).json({ message: 'Bài hát không tìm thấy' });
            }
    
            // Lấy đường dẫn file audio và hình ảnh từ req.files
            const filePath = req.files?.['file_path']?.[0]?.path || existingSong.file_path; // Sử dụng đường dẫn cũ nếu không có file mới
            const songImage = req.files?.['song_image']?.[0]?.path || existingSong.song_image; // Sử dụng đường dẫn cũ nếu không có hình ảnh mới
    
            // Kiểm tra sự tồn tại của các trường bắt buộc
            const { name, artist_id, genre_id, song_time } = req.body;
            if (!name || !artist_id || !genre_id || !song_time) {
                return res.status(400).json({ message: 'Thiếu thông tin bài hát cần thiết' });
            }
    
            // Cập nhật thông tin bài hát
            existingSong.name = name;
            existingSong.artist_id = artist_id;
            existingSong.genre_id = genre_id;
            existingSong.file_path = filePath; // Đường dẫn mới hoặc cũ
            existingSong.song_image = songImage; // Đường dẫn mới hoặc cũ
            existingSong.song_time = song_time;
    
            // Lưu bài hát đã cập nhật vào MongoDB
            const updatedSong = await existingSong.save();
    
            // Trả về phản hồi thành công
            res.status(200).json(updatedSong);
        } catch (error) {
            console.error('Error updating song:', error);
            res.status(500).json({ message: 'Error updating song', error });
        }
    }

    // [GET] /song
    index(req, res, next) {
        Song.find({})
            .populate('artist_id', 'artist_name') // Lấy artist_name từ artist_id
            .populate('genre_id', 'genre_name') // Lấy genre_name từ genre_id
            .lean()
            .then(songs => {
                res.json(songs);
            })
            .catch(err => {
                next(err); 
            });
    }
}

module.exports = new NewsControllers(); 
