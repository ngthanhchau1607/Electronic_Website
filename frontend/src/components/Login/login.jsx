import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault(); // Ngăn không cho form gửi dữ liệu

    setLoading(true); // Bắt đầu quá trình đăng nhập
    setMessage(""); // Reset thông báo

    // In thông tin email và password ra console
    console.log("Email:", formData.email);
    console.log("Password:", formData.password);

    try {
      // Gửi yêu cầu đăng nhập tới server
      const response = await axios.post("http://localhost:3000/user/login", {
        email: formData.email,
        password: formData.password,
      });

      // Xử lý phản hồi từ server
      if (response.status === 200) {
        setMessage("Đăng nhập thành công!");
        console.log("Thông tin đăng nhập:", response.data);
      } else {
        setMessage("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      setMessage("Đăng nhập không thành công. Vui lòng thử lại.");
    } finally {
      setLoading(false); // Kết thúc quá trình đăng nhập
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        height: "100vh", // Chiều cao toàn màn hình
        display: "flex", // Dùng flexbox để căn giữa
        justifyContent: "center", // Căn giữa theo chiều ngang
        alignItems: "center", // Căn giữa theo chiều dọc
        backgroundColor: "#f9f9f9", // Màu nền tùy chọn
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
          src="/img/logo1.jpg" // Đường dẫn ảnh
          alt="Logo"
          style={{ marginBottom: "20px", width: "200px", height: "150px" }} // Tăng kích thước ảnh
        />
        <h1 style={{ marginBottom: "20px" }}>Đăng nhập</h1>
        <form onSubmit={handleLogin} style={{ maxWidth: "300px", margin: "0 auto" }}>
          <input
            type="email"
            name="email"
            placeholder="Nhập email"
            value={formData.email}
            onChange={handleChange}
            style={{
              display: "block",
              width: "100%",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Nhập mật khẩu"
            value={formData.password}
            onChange={handleChange}
            style={{
              display: "block",
              width: "100%",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
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
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
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
          <a href="/forgotpass" style={{ color: "blue", textDecoration: "underline" }}>
            Quên mật khẩu?
          </a>
        </p>
        <p style={{ marginTop: "10px" }}>
          Bạn chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
