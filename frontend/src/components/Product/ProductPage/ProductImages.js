import React from 'react';

function ProductImages() {
  return (
    <div className="col-md-5 col-md-push-2">
      <div id="product-main-img">
        <div className="product-preview">
          <img src="./img/product01.png" alt=""/>
        </div>
        <div className="product-preview">
          <img src="./img/product03.png" alt=""/>
        </div>
        <div className="product-preview">
          <img src="./img/product06.png" alt=""/>
        </div>
        <div className="product-preview">
          <img src="./img/product08.png" alt=""/>
        </div>
      </div>
    </div>
  );
}

function ProductThumbs() {
  return (
    <div className="col-md-2 col-md-pull-5">
      <div id="product-imgs">
        <div className="product-preview">
          <img src="./img/product01.png" alt=""/>
        </div>
        <div className="product-preview">
          <img src="./img/product03.png" alt=""/>
        </div>
        <div className="product-preview">
          <img src="./img/product06.png" alt=""/>
        </div>
        <div className="product-preview">
          <img src="./img/product08.png" alt=""/>
        </div>
      </div>
    </div>
  );
}

function ProductDetails() {
  return (
    <div className="col-md-5">
      <div className="product-details">
        <h2 className="product-name">Product name goes here</h2>
        <div>
          <div className="product-rating">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star-o"></i>
          </div>
          <a className="review-link" href="#">10 Review(s) | Add your review</a>
        </div>
        <div>
          <h3 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h3>
          <span className="product-available">In Stock</span>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
        
        <div className="product-options">
          <label>
            Size
            <select className="input-select">
              <option value="0">X</option>
            </select>
          </label>
          <label>
            Color
            <select className="input-select">
              <option value="0">Red</option>
            </select>
          </label>
        </div>

        <div className="add-to-cart">
          <div className="qty-label">
            Qty
            <div className="input-number">
              <input type="number" />
              <span className="qty-up">+</span>
              <span className="qty-down">-</span>
            </div>
          </div>
          <button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> Add to Cart</button>
        </div>

        <ul className="product-btns">
          <li><a href="#"><i className="fa fa-heart-o"></i> Add to Wishlist</a></li>
          <li><a href="#"><i className="fa fa-exchange"></i> Add to Compare</a></li>
        </ul>

        <ul className="product-links">
          <li>Category:</li>
          <li><a href="#">Headphones</a></li>
          <li><a href="#">Accessories</a></li>
        </ul>

        <ul className="product-links">
          <li>Share:</li>
          <li><a href="#"><i className="fa fa-facebook"></i></a></li>
          <li><a href="#"><i className="fa fa-twitter"></i></a></li>
          <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
          <li><a href="#"><i className="fa fa-envelope"></i></a></li>
        </ul>
      </div>
    </div>
  );
}

export { ProductImages, ProductThumbs, ProductDetails };
