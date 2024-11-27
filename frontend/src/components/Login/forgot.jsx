import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1); // 1: nhập email, 2: nhập OTP, 3: nhập mật khẩu mới

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault(); // Ngăn không cho form gửi dữ liệu
    setLoading(true);
    setMessage(""); // Reset thông báo
  
    try {
      if (step === 1) {
        // Gửi email cho người dùng để yêu cầu mã OTP
        const response = await axios.post("http://localhost:3000/user/forgot-password", {
          email: email,
        });
  
        if (response.status === 200) {
          setMessage("Mã OTP đã được gửi đến email của bạn!");
          setStep(2); // Chuyển sang bước nhập OTP
        } else {
          setMessage("Không thể xử lý yêu cầu, vui lòng thử lại.");
        }
      } else if (step === 2) {
        // Kiểm tra OTP nhập vào
        const response = await axios.post("http://localhost:3000/user/verify-otp", {
          email: email,
          otp: otp,
        });
  
        if (response.status === 200) {
          setMessage("OTP hợp lệ. Bạn có thể thay đổi mật khẩu.");
          setStep(3); // Chuyển sang bước nhập mật khẩu mới
        } else {
          setMessage("Mã OTP không đúng.");
        }
      } else if (step === 3) {
        // Gửi mật khẩu mới để thay đổi
        const response = await axios.post("http://localhost:3000/user/reset-password", {
          email: email,
          otp: otp,  // Thêm otp vào đây
          newPassword: newPassword,
        });
  
        if (response.status === 200) {
          setMessage("Mật khẩu đã được thay đổi thành công!");
        } else {
          setMessage("Không thể thay đổi mật khẩu. Vui lòng thử lại.");
        }
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Lỗi khi xử lý:", error);
      setMessage("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      // Kết thúc quá trình gửi yêu cầu
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          background: "#fff",
        }}
      >
        <img
          src="/img/logo1.jpg"
          alt="Logo"
          style={{ marginBottom: "20px", width: "200px", height: "150px" }}
        />
        <h1 style={{ marginBottom: "20px" }}>
          {step === 1
            ? "Quên mật khẩu"
            : step === 2
            ? "Nhập mã OTP"
            : "Thay đổi mật khẩu"}
        </h1>
        <form onSubmit={handleForgotPassword} style={{ maxWidth: "300px", margin: "0 auto" }}>
          {step === 1 && (
            <>
              <input
                type="email"
                name="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={handleEmailChange}
                style={{
                  display: "block",
                  width: "100%",
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </>
          )}
          {step === 2 && (
            <>
              <input
                type="text"
                name="otp"
                placeholder="Nhập mã OTP"
                value={otp}
                onChange={handleOtpChange}
                style={{
                  display: "block",
                  width: "100%",
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </>
          )}
          {step === 3 && (
            <>
              <input
                type="password"
                name="newPassword"
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={handleNewPasswordChange}
                style={{
                  display: "block",
                  width: "100%",
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </>
          )}

          <button
            type="submit"
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              width: "100%",
              cursor: "pointer",
            }}
            disabled={loading}
          >
            {loading
              ? "Đang gửi..."
              : step === 1
              ? "Gửi yêu cầu OTP"
              : step === 2
              ? "Xác thực OTP"
              : "Đổi mật khẩu"}
          </button>
        </form>

        {/* Hiển thị thông báo kết quả */}
        {message && (
          <p
            style={{
              marginTop: "10px",
              color: message.includes("thành công") ? "green" : "red",
            }}
          >
            {message}
          </p>
        )}

        <p style={{ marginTop: "10px" }}>
          Quay lại trang đăng nhập? <a href="/login">Đăng nhập</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
