import React, { useState } from 'react';

function ProductTabNav({ activeTab, onTabChange }) {
  return (
    <ul className="tab-nav">
      <li className={activeTab === 'tab1' ? 'active' : ''}>
        <a onClick={() => onTabChange('tab1')} href="#tab1">Description</a>
      </li>
      <li className={activeTab === 'tab2' ? 'active' : ''}>
        <a onClick={() => onTabChange('tab2')} href="#tab2">Details</a>
      </li>
      <li className={activeTab === 'tab3' ? 'active' : ''}>
        <a onClick={() => onTabChange('tab3')} href="#tab3">Reviews (3)</a>
      </li>
    </ul>
  );
}

function ProductTabContent({ activeTab }) {
  return (
    <div className="tab-content">
      <div id="tab1" className={`tab-pane fade ${activeTab === 'tab1' ? 'in active' : ''}`}>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
      </div>
      <div id="tab2" className={`tab-pane fade ${activeTab === 'tab2' ? 'in active' : ''}`}>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
      </div>
      <div id="tab3" className={`tab-pane fade ${activeTab === 'tab3' ? 'in active' : ''}`}>
        <div className="row">
          {/* Rating */}
          <div className="col-md-3">
            {/* Rating content */}
          </div>
          {/* Reviews */}
          <div className="col-md-6">
            {/* Reviews content */}
          </div>
          {/* Review Form */}
          <div className="col-md-3">
            <ReviewForm />
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewForm() {
  return (
    <div id="review-form">
      <form className="review-form">
        <input className="input" type="text" placeholder="Your Name" />
        <input className="input" type="email" placeholder="Your Email" />
        <textarea className="input" placeholder="Your Review"></textarea>
        <div className="input-rating">
          <span>Your Rating: </span>
          <div className="stars">
            <input id="star5" name="rating" value="5" type="radio" /><label htmlFor="star5"></label>
            <input id="star4" name="rating" value="4" type="radio" /><label htmlFor="star4"></label>
            <input id="star3" name="rating" value="3" type="radio" /><label htmlFor="star3"></label>
            <input id="star2" name="rating" value="2" type="radio" /><label htmlFor="star2"></label>
            <input id="star1" name="rating" value="1" type="radio" /><label htmlFor="star1"></label>
          </div>
        </div>
        <button className="primary-btn">Submit</button>
      </form>
    </div>
  );
}

function ProductTabs() {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="col-md-12">
      <div id="product-tab">
        <ProductTabNav activeTab={activeTab} onTabChange={handleTabChange} />
        <ProductTabContent activeTab={activeTab} />
      </div>
    </div>
  );
}

export { ProductTabNav, ProductTabContent, ReviewForm, ProductTabs };
