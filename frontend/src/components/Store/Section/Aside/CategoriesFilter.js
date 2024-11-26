// src/components/CategoriesFilter.js
import React from 'react';

function CategoriesFilter() {
  return (
    <div className="aside">
      <h3 className="aside-title">Categories</h3>
      <div className="checkbox-filter">
        {['Laptops', 'Smartphones', 'Cameras', 'Accessories'].map((category, index) => (
          <div className="input-checkbox" key={index}>
            <input type="checkbox" id={`category-${index + 1}`} />
            <label htmlFor={`category-${index + 1}`}>
              <span></span>
              {category} <small>({Math.floor(Math.random() * 1000)})</small>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesFilter;
