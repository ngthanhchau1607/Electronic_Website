import React from 'react';

// Component hiển thị sản phẩm
function Product({ imgSrc, label, category, name, price, oldPrice, rating }) {
  return (
    <div className="col-md-3 col-xs-6">
      <div className="product">
        <div className="product-img">
          <img src={imgSrc} alt={name} />
          {label && <div className="product-label"><span className={label.type}>{label.text}</span></div>}
        </div>
        <div className="product-body">
          <p className="product-category">{category}</p>
          <h3 className="product-name"><a href="#">{name}</a></h3>
          <h4 className="product-price">
            {price} <del className="product-old-price">{oldPrice}</del>
          </h4>
          <div className="product-rating">
            {Array.from({ length: rating }, (_, index) => (
              <i key={index} className="fa fa-star"></i>
            ))}
            {Array.from({ length: 5 - rating }, (_, index) => (
              <i key={index + rating} className="fa fa-star-o"></i>
            ))}
          </div>
          <div className="product-btns">
            <button className="add-to-wishlist">
              <i className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span>
            </button>
            <button className="add-to-compare">
              <i className="fa fa-exchange"></i><span className="tooltipp">add to compare</span>
            </button>
            <button className="quick-view">
              <i className="fa fa-eye"></i><span className="tooltipp">quick view</span>
            </button>
          </div>
        </div>
        <div className="add-to-cart">
          <button className="add-to-cart-btn">
            <i className="fa fa-shopping-cart"></i> add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

// Component chính hiển thị các sản phẩm liên quan
function RelatedProducts() {
  const products = [
    {
      imgSrc: './img/product01.png',
      label: { type: 'sale', text: '-30%' },
      category: 'Category',
      name: 'Product 1',
      price: '$980.00',
      oldPrice: '$990.00',
      rating: 4,
    },
    {
      imgSrc: './img/product02.png',
      label: { type: 'new', text: 'NEW' },
      category: 'Category',
      name: 'Product 2',
      price: '$980.00',
      oldPrice: '$990.00',
      rating: 5,
    },
    {
      imgSrc: './img/product03.png',
      label: null,
      category: 'Category',
      name: 'Product 3',
      price: '$980.00',
      oldPrice: '$990.00',
      rating: 4,
    },
    {
      imgSrc: './img/product04.png',
      label: null,
      category: 'Category',
      name: 'Product 4',
      price: '$980.00',
      oldPrice: '$990.00',
      rating: 0,
    },
  ];

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-title text-center">
              <h3 className="title">Related Products</h3>
            </div>
          </div>

          {products.map((product, index) => (
            <Product
              key={index}
              imgSrc={product.imgSrc}
              label={product.label}
              category={product.category}
              name={product.name}
              price={product.price}
              oldPrice={product.oldPrice}
              rating={product.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RelatedProducts;
