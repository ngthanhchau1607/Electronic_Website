import React, { useEffect, useState } from 'react';
import Admin from '..';
import '../UI/product.css';

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
    category_id: '', // Sử dụng category_id để truyền đi
    image: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/product');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/category');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentProductId('');
    setNewProduct({
      name: '',
      price: '',
      stock: '',
      description: '',
      category_id: '', // Đặt lại category_id
      image: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct({
        ...newProduct,
        [e.target.name]: URL.createObjectURL(file)
      });
    }
  };
  
  
  const handleSave = async () => {
    console.log('Saving product:', {
      name: newProduct.name,
      price: newProduct.price,
      stock: newProduct.stock,
      description: newProduct.description,
      category: newProduct.category_id, // Sử dụng 'category' thay vì 'category_id'
      isEditing,
    });
    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('price', newProduct.price);
      formData.append('stock', newProduct.stock);
      formData.append('description', newProduct.description);
      formData.append('category', newProduct.category_id);
  
      const productImageInput = document.querySelector('input[name="image"]');
      if (productImageInput.files[0]) {
        formData.append('image', productImageInput.files[0]);
      } else if (!isEditing) {
        throw new Error('Product image is required');
      }
  
      let response;
      if (isEditing) {
        response = await fetch(`http://localhost:3000/product/update/${currentProductId}`, {
          method: 'PUT',
          body: formData
        });
      } else {
        response = await fetch('http://localhost:3000/product/create', {
          method: 'POST',
          body: formData
        });
      }
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error('Failed to save product');
      }
  
      const savedProduct = await response.json();
      if (isEditing) {
        setProducts((prevProducts) => prevProducts.map((product) => (product._id === currentProductId ? savedProduct : product)));
      } else {
        setProducts((prevProducts) => [...prevProducts, savedProduct]);
      }
      closeModal();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product) => {
    setNewProduct({
      name: product.name,
      price: product.price,
      stock: product.stock || '',
      description: product.description,
      category_id: product.category_id || '', // Đảm bảo category_id được gán đúng
      image: product.image
    });
    setCurrentProductId(product._id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (productId) => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:3000/product/delete/${productId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Hàm getCategoryName để lấy tên danh mục dựa trên category_id
  const getCategoryName = (category_id) => {
    const category = categories.find((cat) => cat._id === category_id);
    return category ? category.name : 'N/A';
  };
  

  return (
    <div>
      <Admin>
        <div className="user-info">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Product Information</h2>
            <button className="add-button" onClick={openModal}>Thêm</button>
          </div>
          <table className="user-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Name Product</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Description</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>{product.name || 'N/A'}</td>
                    <td>{product.price || 'N/A'}</td>
                    <td>{product.stock || 'N/A'}</td>
                    <td>{getCategoryName(product.category_id)}</td>
                    <td>{product.description || 'N/A'}</td>
                    <td>
                      {product.image ? (
                        <img src={`http://localhost:3000/${product.image}`} alt={product.name} className="product-image" />
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td>
                      <button className="edit-button" onClick={() => handleEdit(product)}>Sửa</button>
                      <button className="delete-button" onClick={() => handleDelete(product._id)}>Xóa</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No product data found.</td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>{isEditing ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h3>
              <label>
                Tên sản phẩm:
                <input type="text" name="name" value={newProduct.name} onChange={handleChange} />
              </label>
              <label>
                Giá:
                <input type="text" name="price" value={newProduct.price} onChange={handleChange} />
              </label>
              <label>
                Số lượng tồn kho:
                <input type="text" name="stock" value={newProduct.stock} onChange={handleChange} />
              </label>
              <label>
                Danh mục:
                <select name="category_id" value={newProduct.category_id} onChange={handleChange}>
                  <option value="">Chọn danh mục</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                  ))}
                </select>
              </label>
              <label>
                Mô tả:
                <textarea name="description" value={newProduct.description} onChange={handleChange} />
              </label>
              <label>
                Hình ảnh sản phẩm:
                <input type="file" name="image" onChange={handleFileChange} />
              </label>
              <button onClick={handleSave}>{isEditing ? 'Cập Nhật' : 'Lưu'}</button>
              <button onClick={closeModal}>Đóng</button>
            </div>
          </div>
        )}
      </Admin>
    </div>
  );
}

export default AdminProduct;
