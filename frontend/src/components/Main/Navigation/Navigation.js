import React from 'react';
import './navigation.css'

function Navigation() {
  return (
    <nav id="navigation">
      {/* container */}
      <div className="container">
        {/* responsive-nav */}
        <div id="responsive-nav">
          {/* NAV */}
          <ul className="main-nav nav navbar-nav">
            <li className="active"><a href="/">Home</a></li>
            <li><a href="/store">Shop</a></li>
            <li><a href="/detail">Detail</a></li>
            <li><a href="/checkout">Check Out</a></li>
          </ul>
          {/* /NAV */}
        </div>
        {/* /responsive-nav */}
      </div>
      {/* /container */}
    </nav>
  );
}

export default Navigation;