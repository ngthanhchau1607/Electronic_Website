import React from 'react';
import StoreFilter from './StoreFilter';
import ProductList from './ProductList';
import Pagination from './Pagination';
import Product from './Product';

const PStore = () => {
    return (
        <div className="col-md-9">
            {/* Filter */}
            <StoreFilter />

  

            {/* List of products */}
            <ProductList />

            {/* Pagination */}
            <Pagination />
        </div>
    );
};

export default PStore;
