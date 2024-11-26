// src/components/BrandFilter.js
import React from 'react';

function BrandFilter() {
  return (
    <div className="aside">
      <h3 className="aside-title">Brand</h3>
      <div className="checkbox-filter">
        {['SAMSUNG', 'LG', 'SONY'].map((brand, index) => (
          <div className="input-checkbox" key={index}>
            <input type="checkbox" id={`brand-${index + 1}`} />
            <label htmlFor={`brand-${index + 1}`}>
              <span></span>
              {brand} <small>({Math.floor(Math.random() * 1000)})</small>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandFilter;
