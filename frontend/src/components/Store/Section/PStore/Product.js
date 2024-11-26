import React from 'react';

const Product = ({ image, category, name, price, oldPrice, rating }) => {
    return (
        <div className="col-md-4 col-xs-6">
            <div className="product">
                <div className="product-img">
                    <img src={image} alt={name} />
                    <div className="product-label">
                        {oldPrice && <span className="sale">-30%</span>}
                        <span className="new">NEW</span>
                    </div>
                </div>
                <div className="product-body">
                    <p className="product-category">{category}</p>
                    <h3 className="product-name"><a href="#">{name}</a></h3>
                    <h4 className="product-price">{price} <del className="product-old-price">{oldPrice}</del></h4>
                    <div className="product-rating">
                        {Array.from({ length: 5 }, (_, i) => (
                            <i key={i} className={`fa fa-star${i < rating ? '' : '-o'}`} />
                        ))}
                    </div>
                    <div className="product-btns">
                        <button className="add-to-wishlist"><i className="fa fa-heart-o"></i></button>
                        <button className="add-to-compare"><i className="fa fa-exchange"></i></button>
                        <button className="quick-view"><i className="fa fa-eye"></i></button>
                    </div>
                </div>
                <div className="add-to-cart">
                    <button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default Product;
