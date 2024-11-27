import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Xử lý thay đổi input form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Kiểm tra các điều kiện trước khi gửi yêu cầu
  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      return "Tất cả các ô đều phải được điền đầy đủ.";
    }
    if (formData.password.length < 6) {
      return "Mật khẩu phải có ít nhất 6 ký tự.";
    }
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage(""); // Reset message before request

    // Kiểm tra form
    const validationMessage = validateForm();
    if (validationMessage) {
      setLoading(false);
      setMessage(validationMessage);
      return;
    }

    try {
      // Gửi dữ liệu đến API backend
      const response = await axios.post("http://localhost:3000/user/create", {
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      // Xử lý kết quả trả về
      if (response.status === 200) {
        setMessage("Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đăng ký:", error);
      setMessage("Đăng ký không thành công. Vui lòng thử lại.");
    } finally {
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
        <h1 style={{ marginBottom: "20px" }}>Đăng ký</h1>
        <form onSubmit={handleSubmit} style={{ maxWidth: "300px", margin: "0 auto" }}>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              name="fullName"
              placeholder="Họ và tên"
              value={formData.fullName}
              onChange={handleChange}
              style={{
                display: "block",
                width: "100%",
                marginBottom: "5px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={{
                display: "block",
                width: "100%",
                marginBottom: "5px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              style={{
                display: "block",
                width: "100%",
                marginBottom: "5px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              width: "100%",
              cursor: "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        {/* Hiển thị thông báo kết quả */}
        {message && (
          <p style={{ marginTop: "10px", color: message.includes("thành công") ? "green" : "red" }}>
            {message}
          </p>
        )}

        <p style={{ marginTop: "10px" }}>
          Bạn đã có tài khoản? <a href="/login">Đăng nhập ngay</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
