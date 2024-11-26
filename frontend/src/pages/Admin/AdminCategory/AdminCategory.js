import React, { useEffect, useState } from 'react';
import Admin from '..';
import '../UI/category.css';

function AdminCategory() {
  const [categories, setCategories] = useState([]); 
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    category_id: '',
    name: '',
    description: ''
  });
  const [editingCategoryId, setEditingCategoryId] = useState(null); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/category'); 
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error); 
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => { 
    setNewCategory({ 
      ...newCategory,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      if (editingCategoryId) {
        const response = await fetch(`http://localhost:3000/category/update/${editingCategoryId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newCategory) 
        });
        const updatedCategory = await response.json(); 
        setCategories(categories.map(category => category._id === editingCategoryId ? updatedCategory : category)); 
      } else {
        // If no category is being edited, create a new one
        const response = await fetch('http://localhost:3000/category/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newCategory)
        });
        const createdCategory = await response.json();
        setCategories([...categories, createdCategory]); // Add the new category to the list
      }
      closeModal();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setNewCategory({ 
      category_id: '',
      name: '',
      description: ''
    });
    setEditingCategoryId(null); 
  };

  const handleEdit = (category) => { 
    setNewCategory({ 
      category_id: category.category_id,
      name: category.name,
      description: category.description
    });
    setEditingCategoryId(category._id); 
    setShowModal(true); 
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/category/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCategories(categories.filter(category => category._id !== id)); // Xóa danh mục khỏi danh sách
      } else {
        console.error('Error deleting category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (  
    <div>
      <Admin>
        <div className="category-info">
          <h2>Category Information</h2>
          <button className="add-category-button" onClick={() => setShowModal(true)}>Thêm Danh Mục</button>
          <table className="category-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Category ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? ( 
                categories.map((category, index) => ( 
                  <tr key={category._id}>
                    <td>{index + 1}</td>
                    <td>{category.category_id || 'N/A'}</td>
                    <td>{category.name || 'N/A'}</td>
                    <td>{category.description || 'N/A'}</td>
                    <td>
                      <div className="button-group">
                        <button className="edit-button" onClick={() => handleEdit(category)}>Sửa</button>
                        <button className="delete-button" onClick={() => handleDelete(category._id)}>Xóa</button>
                      </div> 
                    </td>
                  </tr>
                ))
              ) : ( 
                <tr>
                  <td colSpan="5">No category data found.</td>
                </tr>
              )}
            </tbody>
          </table>
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <h3>{editingCategoryId ? 'Sửa Danh Mục' : 'Thêm Danh Mục Mới'}</h3>
                <label>
                  Category ID:
                  <input type="text" name="category_id" value={newCategory.category_id} onChange={handleChange} /> 
                </label>
                <label>
                  Name:
                  <input type="text" name="name" value={newCategory.name} onChange={handleChange} />
                </label>
                <label>
                  Description:
                  <input type="text" name="description" value={newCategory.description} onChange={handleChange} /> 
                </label>
                <button onClick={handleSave}>{editingCategoryId ? 'Cập nhật' : 'Lưu'}</button>
                <button onClick={closeModal}>Đóng</button>
              </div>
            </div>
          )}
        </div>
      </Admin>
    </div>
  );
}

export default AdminCategory;
