import React from "react";
import '../ProductTab/producttab.css'; 

const products = [
  {
    id: 1,
    imgSrc: './img/product01.png',
    category: 'Category',
    name: 'Product 1',
    price: 980.00,
    oldPrice: 990.00,
    isNew: false,
    sale: '-30%',
    rating: 5
  },
  {
    id: 2,
    imgSrc: './img/product02.png',
    category: 'Category',
    name: 'Product 2',
    price: 980.00,
    oldPrice: 990.00,
    isNew: false,
    sale: '-25%',
    rating: 4.5
  },
  {
    id: 3,
    imgSrc: './img/product03.png',
    category: 'Category',
    name: 'Product 3',
    price: 980.00,
    oldPrice: 990.00,
    isNew: false,
    sale: '-20%',
    rating: 4.5
  },
  {
    id: 4,
    imgSrc: './img/product04.png',
    category: 'Category',
    name: 'Product 4',
    price: 980.00,
    oldPrice: 990.00,
    isNew: false,
    sale: '-40%',
    rating: 5
  },
];

export default function ProductList() {
  return (  
    <div className="col-md-12">
      <div className="section-title">
        <h3 className="title">Sell Products</h3>
        <div className="section-nav">
                <ul className="section-tab-nav tab-nav">
                  <li className="active"><a data-toggle="tab" href="#tab2">Laptops</a></li>
                  <li><a data-toggle="tab" href="#tab2">Smartphones</a></li>
                  <li><a data-toggle="tab" href="#tab2">Cameras</a></li>
                  <li><a data-toggle="tab" href="#tab2">Accessories</a></li>
                </ul>
        </div>
      </div>

      <div className="tab-content">
        <div className="tab-pane active" id="tab1">
          <div className="products-row">
            {products.map((product) => (
              <div key={product.id} className="product">
                <div className="product-img">
                  <img src={product.imgSrc} alt={product.name} />
                  <div className="product-label">
                    {product.sale && <span className="sale">{product.sale}</span>}
                    {product.isNew && <span className="new">NEW</span>}
                  </div>
                </div>
                <div className="product-body">
                  <p className="product-category">{product.category}</p>
                  <h3 className="product-name"><a href="#">{product.name}</a></h3>
                  <h4 className="product-price">${product.price.toFixed(2)} <del className="product-old-price">${product.oldPrice.toFixed(2)}</del></h4>
                  <div className="product-rating">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`fa ${i < product.rating ? 'fa-star' : 'fa-star-o'}`}></i>
                    ))}
                  </div>
                  <div className="product-btns">
                    <button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span></button>
                    <button className="add-to-compare"><i className="fa fa-exchange"></i><span className="tooltipp">add to compare</span></button>
                    <button className="quick-view"><i className="fa fa-eye"></i><span className="tooltipp">quick view</span></button>
                  </div>
                </div>
                <div className="add-to-cart">
                  <button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> add to cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
