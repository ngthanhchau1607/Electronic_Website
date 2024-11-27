const bcrypt = require('bcryptjs');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Cấu hình nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Dịch vụ email bạn đang sử dụng (ví dụ: Gmail)
  auth: {
    user: '21110816@student.hcmute.edu.vn',  // Địa chỉ email của bạn
    pass: 'chau115az',  // Mật khẩu email của bạn hoặc mật khẩu ứng dụng nếu bạn sử dụng xác thực hai yếu tố
  },
});

// Đoạn mã gửi email với xử lý lỗi chi tiết
const sendVerificationEmail = async (email, verificationUrl) => {
  const mailOptions = {
    from: '21110816@student.hcmute.edu.vn',  // Địa chỉ email của bạn
    to: email,  // Email của người nhận
    subject: 'Xác nhận email của bạn',  // Tiêu đề email
    text: `Vui lòng nhấp vào liên kết sau để xác nhận email của bạn: ${verificationUrl}`,  // Nội dung email
  };

  try {
    // Gửi email
    await transporter.sendMail(mailOptions);
    console.log('Email xác nhận đã được gửi thành công!');
  } catch (error) {
    // In ra chi tiết lỗi khi gửi email
    console.error('Lỗi khi gửi email:', error);
    if (error.code === 'EAUTH') {
      // Lỗi xác thực
      throw new Error('Xác thực email không thành công. Kiểm tra lại tài khoản và mật khẩu.');
    } else if (error.code === 'ECONNREFUSED') {
      // Lỗi kết nối
      throw new Error('Không thể kết nối đến máy chủ email. Kiểm tra lại kết nối mạng.');
    } else if (error.code === 'ENOTFOUND') {
      // Lỗi không tìm thấy máy chủ
      throw new Error('Máy chủ email không tìm thấy. Kiểm tra lại dịch vụ bạn đang sử dụng.');
    } else {
      // Lỗi chung
      throw new Error(`Lỗi không xác định: ${error.message}`);
    }
  }
};

// Sử dụng hàm này trong quá trình đăng ký người dùng
const registerUser = async ({ full_name, email, password }) => {
  // Kiểm tra email đã tồn tại
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email đã được sử dụng.');
  }

  // Mã hóa mật khẩu
  const hashedPassword = await bcrypt.hash(password, 10);

  // Tạo mã xác nhận email
  const verificationToken = crypto.randomBytes(20).toString('hex');

  // Lưu thông tin người dùng mới vào cơ sở dữ liệu
  const newUser = new User({
    full_name,
    email,
    password: hashedPassword,
    verificationToken,
  });

  await newUser.save();

  // Tạo URL xác nhận
  const verificationUrl = `http://localhost:3000/user/verify-email?token=${verificationToken}`;

  // Gửi email xác nhận
  try {
    await sendVerificationEmail(email, verificationUrl);
  } catch (error) {
    console.error('Gửi email xác nhận thất bại:', error.message);
    throw new Error('Gửi email xác nhận không thành công.');
  }

  return { message: 'Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.' };
};


// Hàm gửi mã OTP qua email
const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: '21110816@student.hcmute.edu.vn',  // Địa chỉ email của bạn
    to: email,  // Email của người nhận
    subject: 'Xác nhận yêu cầu quên mật khẩu',  // Tiêu đề email
    text: `Mã OTP của bạn là: ${otp}. Mã này sẽ hết hạn sau 1 giờ.`,  // Nội dung email
  };

  try {
    // Gửi email
    await transporter.sendMail(mailOptions);
    console.log('Mã OTP đã được gửi thành công đến email!');
  } catch (error) {
    // In ra chi tiết lỗi khi gửi email
    console.error('Lỗi khi gửi email:', error);
    if (error.code === 'EAUTH') {
      // Lỗi xác thực
      throw new Error('Xác thực email không thành công. Kiểm tra lại tài khoản và mật khẩu.');
    } else if (error.code === 'ECONNREFUSED') {
      // Lỗi kết nối
      throw new Error('Không thể kết nối đến máy chủ email. Kiểm tra lại kết nối mạng.');
    } else if (error.code === 'ENOTFOUND') {
      // Lỗi không tìm thấy máy chủ
      throw new Error('Máy chủ email không tìm thấy. Kiểm tra lại dịch vụ bạn đang sử dụng.');
    } else {
      // Lỗi chung
      throw new Error(`Lỗi không xác định: ${error.message}`);
    }
  }
};

// Hàm tạo mã OTP ngẫu nhiên (6 chữ số)
const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();  // Tạo OTP ngẫu nhiên từ 100000 đến 999999
};

module.exports = {
  registerUser,
  sendOtpEmail,
  generateOtp

};