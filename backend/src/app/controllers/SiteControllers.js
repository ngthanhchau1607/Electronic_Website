
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
class SiteControllers {


    // [POST] /login
    async login(req, res, next) {
        const { username, password } = req.body;
    
        try {
          // Tìm user với username
          const user = await User.findOne({ username });
          if (!user) {
            return res.status(400).json({ message: 'Tên đăng nhập không tồn tại!' });
          }
    
          // Kiểm tra xem mật khẩu có phải là bcrypt hash hay không
          const isBcryptHash = user.password.startsWith('$2b$');
          
          if (isBcryptHash) {
            // Mật khẩu đã mã hóa bằng bcrypt
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
              return res.status(400).json({ message: 'Mật khẩu sai!' });
            }
          } else {
            // Mật khẩu chưa mã hóa, kiểm tra với mật khẩu thô
            if (password !== user.password) {
              return res.status(400).json({ message: 'Mật khẩu sai!' });
            }
    
            // Nếu mật khẩu đúng, mã hóa lại mật khẩu bằng bcrypt
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
            await user.save();  // Lưu mật khẩu mới đã mã hóa vào cơ sở dữ liệu
          }
    
          // Tạo JWT token
          const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' });
    
          res.json({ token });
        } catch (error) {
          next(error);
        }
      }
    
    // [POST] /register
    async register(req, res, next) {
      try {
          console.log('Dữ liệu nhận được từ form:', req.body); // Dữ liệu nhận được từ form
          const { username, fullName, password, confirmPassword, gender } = req.body;
  
          // Kiểm tra mật khẩu có trùng khớp không
          if (password !== confirmPassword) {
              console.log('Mật khẩu không trùng khớp'); // Thông báo lỗi
              return res.status(400).json({ message: 'Mật khẩu không trùng khớp' });
          }
  
          // Kiểm tra tên người dùng l đã tồn tại
          const existingUser = await User.findOne({ username });
          if (existingUser) {
              console.log('Tên người dùng đã tồn tại'); // Thông báo lỗi
              return res.status(400).json({ message: 'Tên người dùng  đã tồn tại' });
          }
  
          // Mã hóa mật khẩu
          const hashedPassword = await bcrypt.hash(password, 10);
  
          // Tạo người dùng mới
          const newUser = new User({
              username,
              full_name: fullName,
              password: hashedPassword,
              gender,
          });
  
          // Lưu người dùng vào cơ sở dữ liệu
          await newUser.save();
          console.log('Tạo tài khoản thành công:', newUser.username); // Thông báo thành công
          res.status(201).json({ message: 'Đăng ký thành công' });
      } catch (error) {
          console.error('Lỗi trong quá trình đăng ký:', error); // Thông báo lỗi
          res.status(500).json({ message: 'Lỗi trong quá trình đăng ký', error });
      }
  }

    //[GET]  /Home
    index(req, res,next) {
        User.find({}).lean()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            next(err); // Chuyển lỗi cho middleware xử lý lỗi
        });
    }
}

module.exports = new SiteControllers(); 