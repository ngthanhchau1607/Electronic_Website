// src/components/Aside.js
import React from 'react';
import CategoriesFilter from './CategoriesFilter';
import PriceFilter from './PriceFilter';
import BrandFilter from './BrandFilter';
import TopSelling from './TopSelling';

function Aside() {
  return (
    <div id="aside" className="col-md-3">
      <CategoriesFilter />
      <PriceFilter />
      <BrandFilter />
      <TopSelling />
    </div>
  );
}

export default Aside;
