import React from 'react';
import './header.css'
const Header = () => {
  return (
    <header>
      {/* TOP HEADER */}
      <div id="top-header">
        <div className="container">
          <ul className="header-links pull-left">
            <li><a href="#"><i className="fa fa-phone"></i> 0899897394</a></li>
            <li><a href="#"><i className="fa fa-envelope-o"></i> longchau@student.hcmute.edu.vn</a></li>
            <li><a href="#"><i className="fa fa-map-marker"></i> Số 1 VVN</a></li>
          </ul>
          <ul className="header-links pull-right">
            <li><a href="#"><i className="fa fa-dollar"></i> USD</a></li>
            <li><a href="#"><i className="fa fa-user-o"></i> My Account</a></li>
          </ul>
        </div>
      </div>
      {/* /TOP HEADER */}

      {/* MAIN HEADER */}
      <div id="header">
        {/* container */}
        <div className="container">
          {/* row */}
          <div className="row">
            {/* LOGO */}
            <div className="col-md-3">
              <div className="header-logo">
                <a href="#" className="logo">
                  <img src="./img/logo.png" alt="" />
                </a>
              </div>
            </div>
            {/* /LOGO */}

            {/* SEARCH BAR */}
            <div className="col-md-6">
              <div className="header-search">
                <form>
                  <select className="input-select">
                    <option value="0">All Categories</option>
                    <option value="1">Category 01</option>
                    <option value="1">Category 02</option>
                  </select>
                  <input className="input" placeholder="Search here" />
                  <button className="search-btn">Search</button>
                </form>
              </div>
            </div>
            {/* /SEARCH BAR */}

            {/* ACCOUNT */}
            <div className="col-md-3 clearfix">
              <div className="header-ctn">
                {/* Wishlist */}
                <div>
                  <a href="#">
                    <i className="fa fa-heart-o"></i>
                    <span>Your Wishlist</span>
                    <div className="qty">2</div>
                  </a>
                </div>
                {/* /Wishlist */}

                {/* Cart */}
                <div className="dropdown">
                  <a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                    <i className="fa fa-shopping-cart"></i>
                    <span>Your Cart</span>
                    <div className="qty">3</div>
                  </a>
                  <div className="cart-dropdown">
                    <div className="cart-list">
                      <div className="product-widget">
                        <div className="product-img">
                          <img src="./img/product01.png" alt="" />
                        </div>
                        <div className="product-body">
                          <h3 className="product-name"><a href="#">product name goes here</a></h3>
                          <h4 className="product-price"><span className="qty">1x</span>$980.00</h4>
                        </div>
                        <button className="delete"><i className="fa fa-close"></i></button>
                      </div>

                      <div className="product-widget">
                        <div className="product-img">
                          <img src="./img/product02.png" alt="" />
                        </div>
                        <div className="product-body">
                          <h3 className="product-name"><a href="#">product name goes here</a></h3>
                          <h4 className="product-price"><span className="qty">3x</span>$980.00</h4>
                        </div>
                        <button className="delete"><i className="fa fa-close"></i></button>
                      </div>
                    </div>
                    <div className="cart-summary">
                      <small>3 Item(s) selected</small>
                      <h5>SUBTOTAL: $2940.00</h5>
                    </div>
                    <div className="cart-btns">
                      <a href="#">View Cart</a>
                      <a href="#">Checkout <i className="fa fa-arrow-circle-right"></i></a>
                    </div>
                  </div>
                </div>
                {/* /Cart */}

                {/* Menu Toggle */}
                <div className="menu-toggle">
                  <a href="#">
                    <i className="fa fa-bars"></i>
                    <span>Menu</span>
                  </a>
                </div>
                {/* /Menu Toggle */}
              </div>
            </div>
            {/* /ACCOUNT */}
          </div>
          {/* row */}
        </div>
        {/* container */}
      </div>
      {/* /MAIN HEADER */}
    </header>
  );
};

export default Header;
