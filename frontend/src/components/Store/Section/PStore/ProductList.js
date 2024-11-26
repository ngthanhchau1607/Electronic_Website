import React from 'react';
import Product from './Product';

const ProductList = () => {
    // Giả sử bạn có một mảng dữ liệu sản phẩm như sau:
    const products = [
        {
            image: "./img/product01.png",
            category: "Category 1",
            name: "Product 1",
            price: "$980.00",
            oldPrice: "$990.00",
            rating: 5,
        },
        {
            image: "./img/product02.png",
            category: "Category 1",
            name: "Product 2",
            price: "$980.00",
            oldPrice: "$990.00",
            rating: 4,
        },
        {
            image: "./img/product03.png",
            category: "Category 2",
            name: "Product 3",
            price: "$750.00",
            oldPrice: "$800.00",
            rating: 3,
        },
        {
            image: "./img/product04.png",
            category: "Category 2",
            name: "Product 4",
            price: "$1500.00",
            oldPrice: "$1600.00",
            rating: 4,
        },
        {
            image: "./img/product05.png",
            category: "Category 3",
            name: "Product 5",
            price: "$499.00",
            oldPrice: "$550.00",
            rating: 2,
        },
        {
            image: "./img/product06.png",
            category: "Category 3",
            name: "Product 6",
            price: "$300.00",
            oldPrice: "$350.00",
            rating: 5,
        },
        {
            image: "./img/product07.png",
            category: "Category 4",
            name: "Product 7",
            price: "$650.00",
            oldPrice: "$700.00",
            rating: 3,
        },
        {
            image: "./img/product08.png",
            category: "Category 4",
            name: "Product 8",
            price: "$1150.00",
            oldPrice: "$1200.00",
            rating: 4,
        },
        {
            image: "./img/product09.png",
            category: "Category 5",
            name: "Product 9",
            price: "$1100.00",
            oldPrice: "$1150.00",
            rating: 5,
        },
    ];

    return (
        <div className="row">
            {products.map((product, index) => (
                <Product key={index} {...product} />
            ))}
        </div>
    );
};

export default ProductList;
