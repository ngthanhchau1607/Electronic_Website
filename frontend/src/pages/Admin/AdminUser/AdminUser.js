  import React, { useEffect, useState } from 'react';
  import Admin from '..';
  import '../UI/admin_children.css'

  function AdminUser() {
    const [users, setUsers] = useState([]); 
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState({
      username: '',
      full_name: '',
      email: '',
      phone_number: ''
    });
    const [editingUserId, setEditingUserId] = useState(null); 

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch('http://localhost:3000/user'); 
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error('Error fetching users:', error); 
        }
      };

      fetchUsers();
    }, []);

    const handleChange = (e) => { 
      setNewUser({ 
        ...newUser,
        [e.target.name]: e.target.value
      });
    };

    const handleSave = async () => {
      try {
        if (editingUserId) {
          const response = await fetch(`http://localhost:3000/user/update/${editingUserId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser) 
          });
          const updatedUser = await response.json(); 
          setUsers(users.map(user => user._id === editingUserId ? updatedUser : user)); 
        } 
        closeModal();
        }
       catch (error) {
        console.error('Error saving user:', error);
      }
    };

    const closeModal = () => {
      setShowModal(false);
      setNewUser({ 
        username: '',
        full_name: '',
        email: '',
        phone_number: ''
      });
      setEditingUserId(null); 
    };

    const handleEdit = (user) => { 
      setNewUser({ 
        username: user.username,
        full_name: user.full_name,
        email: user.email,
        phone_number: user.phone_number
      });
      setEditingUserId(user._id); 
      setShowModal(true); 
    };

    const handleDelete = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/user/delete/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setUsers(users.filter(user => user._id !== id)); // Xóa người dùng khỏi danh sách
    } else {
      console.error('Error deleting user');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

    return (  
      <div>
        <Admin>
          <div className="user-info">
              <h2>User Information</h2>
            <table className="user-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Name</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? ( 
                  users.map((user, index) => ( 
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.username || 'N/A'}</td>
                      <td>{user.full_name || 'N/A'}</td>
                      <td>{user.email || 'N/A'}</td>
                      <td>{user.phone_number || 'N/A'}</td>
                      <td>
                        <button className="edit-button" onClick={() => handleEdit(user)}>Sửa</button>
                        <button className="delete-button" onClick={() => handleDelete(user._id)}>Xóa</button>
                      </td>
                    </tr>
                  ))
                ) : ( 
                  <tr>
                    <td colSpan="6">No user data found.</td>
                  </tr>
                )}
              </tbody>
            </table>
            {showModal && (
              <div className="modal">
                <div className="modal-content">
                  <h3>{editingUserId ? 'Sửa Người Dùng' : 'Thêm Người Dùng Mới'}</h3>
                  <label>
                    Tên đăng nhập:
                    <input type="text" name="username" value={newUser.username} onChange={handleChange} /> 
                  </label>
                  <label>
                    Họ và tên:
                    <input type="text" name="full_name" value={newUser.full_name} onChange={handleChange} />
                  </label>
                  <label>
                    Email:
                    <input type="email" name="email" value={newUser.email} onChange={handleChange} /> 
                  </label>
                  <label>
                    Số điện thoại:
                    <input type="text" name="phone_number" value={newUser.phone_number} onChange={handleChange} /> 
                  </label>
                  <button onClick={handleSave}>{editingUserId ? 'Cập nhật' : 'Lưu'}</button>
                  <button onClick={closeModal}>Đóng</button>
                </div>
              </div>
            )}
          </div>
        </Admin>
      </div>
    );
  }

  export default AdminUser;
