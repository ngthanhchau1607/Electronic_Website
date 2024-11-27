const userService = require('../services/UserService')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {sendOtpEmail, generateOtp} = require('../services/UserService')
const createUser = async (req, res) => {
  const { full_name, email, password } = req.body;

  try {
    console.log('Received request data:', req.body);  // Thêm dòng này để kiểm tra dữ liệu nhận được từ client
    const result = await userService.registerUser({ full_name, email, password });
    res.status(200).json(result);
  } catch (error) {
    console.error('Error during user registration:', error);  // Đảm bảo có thông báo lỗi khi có lỗi phát sinh
    res.status(500).json({ message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.query;
  console.log('Received verification token:', token);  // Kiểm tra token nhận được

  try {
    // Tìm người dùng có token khớp với token trong query
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: 'Mã xác nhận không hợp lệ.' });
    }

    // Cập nhật trạng thái xác minh và xóa token
    user.isVerified = true;
    user.verificationToken = null;  // Đảm bảo xóa token sau khi xác nhận
    await user.save();

    res.status(200).json({ message: 'Xác nhận email thành công!' });
  } catch (error) {
    console.error('Lỗi khi xác nhận email:', error);  // Đảm bảo có thông báo lỗi khi có lỗi phát sinh
    res.status(500).json({ message: 'Có lỗi xảy ra khi xác nhận email.' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kiểm tra xem email và mật khẩu có được gửi hay không
    if (!email || !password) {
      return res.status(400).json({ message: 'Email và mật khẩu là bắt buộc.' });
    }

    console.log(`Đang cố gắng đăng nhập với email: ${email}`);

    // Bước 1: Kiểm tra xem email có tồn tại không
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Không tìm thấy người dùng với email:', email);
      return res.status(400).json({ message: 'Email không tồn tại.' });
    }

    console.log('Tìm thấy người dùng:', user.email);

    // Bước 2: Kiểm tra xem tài khoản có được xác thực chưa (isVerified)
    if (!user.isVerified) {
      console.log('Tài khoản chưa được xác thực:', user.email);
      return res.status(400).json({ message: 'Tài khoản chưa được xác thực.' });
    }

    // Bước 3: So sánh mật khẩu đã mã hóa với mật khẩu người dùng nhập vào
    console.log('So sánh mật khẩu...');
    const isMatch = await bcrypt.compare(password, user.password);  // So sánh mật khẩu
    if (!isMatch) {
      console.log('Mật khẩu không khớp cho người dùng:', email);
      return res.status(400).json({ message: 'Mật khẩu không đúng.' });
    }

    // Bước 4: Tạo token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,  // Mã bí mật JWT
      { expiresIn: '1h' }  // Token sẽ hết hạn sau 1 giờ
    );

    console.log('Đăng nhập thành công cho người dùng:', email);

    // Trả về kết quả đăng nhập thành công
    return res.status(200).json({
      message: 'Đăng nhập thành công!',
      token,  // Trả về token JWT
    });

  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);
    // Gửi thông báo lỗi chi tiết cho client
    return res.status(500).json({
      message: 'Lỗi server, vui lòng thử lại.',
      error: error.message, // Thêm thông tin lỗi chi tiết
    });
  }
};


const forgotPassword = async (req, res) => {
  const { email } = req.body;  // Lấy email từ request

  try {
    // Kiểm tra email có tồn tại trong hệ thống không
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email không tồn tại.' });
    }

    // Tạo mã OTP ngẫu nhiên (6 chữ số)
    const otp = generateOtp(); // Gọi hàm tạo mã OTP

    // Lưu mã OTP và thời gian hết hạn vào cơ sở dữ liệu (1 giờ)
    user.otp = otp;
    user.otpExpiration = Date.now() + 3600000;  // Hết hạn sau 1 giờ
    await user.save();

    // Gửi mã OTP qua email
    await sendOtpEmail(email, otp);

    res.status(200).json({ message: 'Mã OTP đã được gửi đến email của bạn!' });
  } catch (error) {
    console.error('Lỗi khi xử lý yêu cầu quên mật khẩu:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại.' });
  }
};


const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Tìm người dùng với email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email không tồn tại.' });
    }

    // Kiểm tra OTP
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Mã OTP không đúng.' });
    }

    // Kiểm tra thời gian hết hạn của OTP
    if (Date.now() > user.otpExpiration) {  // Dùng 'otpExpiration' thay vì 'otpExpiry'
      return res.status(400).json({ message: 'Mã OTP đã hết hạn.' });
    }

    // OTP hợp lệ, trả về thông báo thành công
    res.status(200).json({ message: 'OTP hợp lệ. Bạn có thể thay đổi mật khẩu.' });
  } catch (error) {
    console.error('Lỗi khi xác thực OTP:', error.message);
    res.status(500).json({ message: 'Có lỗi xảy ra khi xác thực OTP.' });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  console.log('Dữ liệu nhận được từ client:', req.body);  // In ra để kiểm tra

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: 'Thiếu thông tin yêu cầu: email, OTP hoặc mật khẩu mới.' });
  }

  try {
    // Kiểm tra người dùng
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email không tồn tại.' });
    }

    // Kiểm tra OTP
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Mã OTP không đúng.' });
    }

    // Kiểm tra thời gian hết hạn của OTP
    if (Date.now() > user.otpExpiration) {
      return res.status(400).json({ message: 'Mã OTP đã hết hạn.' });
    }

    // Mã hóa mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu mới và xóa OTP
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiration = null;
    await user.save();

    res.status(200).json({ message: 'Mật khẩu đã được thay đổi thành công!' });
  } catch (error) {
    console.error('Lỗi khi thay đổi mật khẩu:', error.message);
    res.status(500).json({ message: 'Có lỗi xảy ra khi thay đổi mật khẩu.' });
  }
};

module.exports = {
  createUser,
  verifyEmail,
  loginUser,
  forgotPassword,
  verifyOtp,
  resetPassword
};

