import React from 'react';
import './section.css'

function Section1() {
  return (
    <div className="section">
      <div className="container">
        <div className="row">
          {/* Shop 1 */}
          <div className="col-md-4 col-xs-6">
            <div className="shop">
              <div className="shop-img">
                <img src="./img/shop01.png" alt="" />
              </div>
              <div className="shop-body">
                <h3>Laptop<br />Collection</h3>
                <a href="#" className="cta-btn">
                  Shop now <i className="fa fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
          </div>
          
          {/* Shop 2 */}
          <div className="col-md-4 col-xs-6">
            <div className="shop">
              <div className="shop-img">
                <img src="./img/shop03.png" alt="" />
              </div>
              <div className="shop-body">
                <h3>Accessories<br />Collection</h3>
                <a href="#" className="cta-btn">
                  Shop now <i className="fa fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Shop 3 */}
          <div className="col-md-4 col-xs-6">
            <div className="shop">
              <div className="shop-img">
                <img src="./img/shop02.png" alt="" />
              </div>
              <div className="shop-body">
                <h3>Cameras<br />Collection</h3>
                <a href="#" className="cta-btn">
                  Shop now <i className="fa fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section1;
