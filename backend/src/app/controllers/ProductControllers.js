
const Product = require('../models/Product')
const Category = require('../models/Category')
const mongoose = require('mongoose');

// Hàm tạo product_id ngẫu nhiên
function generateProductId() {
    return Math.floor(1000 + Math.random() * 9000); // Tạo số ngẫu nhiên từ 1000 đến 9999
}

class ProductControllers {

    
    create(req, res, next) {
        const { name, price, stock, description, category } = req.body; // Đảm bảo nhận 'category' thay vì 'categoryId'
        const productImage = req.file; // File hình ảnh được xử lý qua middleware `upload`
    
        // In thông tin sản phẩm ra console để kiểm tra
        console.log('Creating new product:', {
            name,
            price,
            stock,
            description,
            category,  // category là ID từ frontend
            productImage: productImage ? productImage.originalname : 'No image uploaded'
        });
        
        // Kiểm tra xem category có phải là ObjectId hợp lệ không
        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        // Tìm category trong cơ sở dữ liệu bằng ID
        Category.findById(category)
            .then((categoryDoc) => {
                if (!categoryDoc) {
                    return res.status(404).json({ message: 'Category not found' });
                }
                
                // Tạo product_id ngẫu nhiên
                const randomProductId = generateProductId();
    
                // Tạo một đối tượng sản phẩm mới
                const newProduct = new Product({
                    product_id: randomProductId,
                    name,
                    price,
                    stock,
                    description,
                    category_id: categoryDoc._id, // Lưu _id của category vào sản phẩm
                    image: req.file ? req.file.path : null, // Lưu đường dẫn ảnh vào trường 'image' nếu có
                });
    
                // Lưu sản phẩm vào cơ sở dữ liệu
                return newProduct.save();
            })
            .then(product => {
                res.status(201).json({
                    message: 'Product created successfully!',
                    product: product
                });
            })
            .catch(err => next(err));
    }

    // Phương thức cập nhật sản phẩm
    async update(req, res, next) {
        try {
            const productId = req.params.id; // Lấy ID sản phẩm từ tham số URL
            const updatedData = req.body; // Dữ liệu sản phẩm mới từ yêu cầu
    
            // Kiểm tra nếu có tệp hình ảnh được tải lên, thêm vào `updatedData`
            if (req.file) {
                updatedData.image = req.file.path; // Đảm bảo sử dụng đúng trường để lưu đường dẫn hình ảnh
            }
    
            // Lấy sản phẩm hiện tại từ cơ sở dữ liệu
            const existingProduct = await Product.findById(productId);
            if (!existingProduct) {
                return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
            }
    
            // Kiểm tra nếu `category` có trong dữ liệu cập nhật
            if (updatedData.category) {
                // Kiểm tra nếu category mới không trùng với category_id hiện tại của sản phẩm
                if (existingProduct.category_id.toString() !== updatedData.category) {
                    // Nếu không trùng, cập nhật category của sản phẩm
                    updatedData.category_id = updatedData.category;
                    delete updatedData.category; // Xóa `category` để tránh lưu trùng
                }
            }
    
            // Cập nhật sản phẩm theo ID với dữ liệu mới
            const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, {
                new: true, // Trả về tài liệu mới sau khi cập nhật
            });
    
            // Trả về sản phẩm đã cập nhật
            res.status(200).json(updatedProduct);
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật sản phẩm', error });
        }
    }
    
        delete(req, res, next) {
            const { id } = req.params; // Lấy id từ params URL
            
            Product.findByIdAndDelete(id) // Tìm và xóa sản phẩm theo id
                .then((deletedProduct) => {
                    if (!deletedProduct) {
                        return res.status(404).json({ message: 'Product not found' });
                    }
                    res.status(200).json({
                        message: 'Product deleted successfully!',
                        product: deletedProduct
                    });
                })
                .catch(err => next(err));
        }

    index(req, res,next) {
        Product.find({}).lean()
        .then(products => {
            res.json(products);
        })
        .catch(err => {
            next(err); 
        });
    }
}

module.exports = new ProductControllers(); 
