// src/components/TopSelling.js
import React from 'react';

function TopSelling() {
  const products = [
    { name: 'Product 1', price: '$980.00', oldPrice: '$990.00', image: './img/product01.png' },
    { name: 'Product 2', price: '$980.00', oldPrice: '$990.00', image: './img/product02.png' },
    { name: 'Product 3', price: '$980.00', oldPrice: '$990.00', image: './img/product03.png' }
  ];

  return (
    <div className="aside">
      <h3 className="aside-title">Top selling</h3>
      {products.map((product, index) => (
        <div className="product-widget" key={index}>
          <div className="product-img">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-body">
            <p className="product-category">Category</p>
            <h3 className="product-name"><a href="#">{product.name}</a></h3>
            <h4 className="product-price">
              {product.price} <del className="product-old-price">{product.oldPrice}</del>
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopSelling;
