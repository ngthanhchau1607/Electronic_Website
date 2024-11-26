// src/components/PriceFilter.js
import React from 'react';

function PriceFilter() {
  return (
    <div className="aside">
      <h3 className="aside-title">Price</h3>
      <div className="price-filter">
        <div id="price-slider"></div>
        <div className="input-number price-min">
          <input id="price-min" type="number" />
          <span className="qty-up">+</span>
          <span className="qty-down">-</span>
        </div>
        <span>-</span>
        <div className="input-number price-max">
          <input id="price-max" type="number" />
          <span className="qty-up">+</span>
          <span className="qty-down">-</span>
        </div>
      </div>
    </div>
  );
}

export default PriceFilter;
