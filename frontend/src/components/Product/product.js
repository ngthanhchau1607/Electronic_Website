
import React from 'react';
import Header from '../Main/Header/Header';
import Navigation from '../Main/Navigation/Navigation';
import Breadcrumb from './Breadcrumb/Breadcrumb';
import Footer from '../Main/Footer/Footer';
import ProductPage from './ProductPage/ProductPage';
import { ProductImages ,ProductThumbs,ProductDetails} from './ProductPage/ProductImages';
import { ProductTabs } from './ProductPage/ProductTabNav';
import RelatedProducts from './RelatedProducts';


function Product() {
  return (
    <div>
      <Header />
      <Navigation />
      <Breadcrumb/>
      <ProductPage>
        <ProductImages/>
        <ProductThumbs/>
        <ProductDetails/>
        <ProductTabs/>
      </ProductPage>
      <RelatedProducts/>
      <Footer/>
    </div>
  );
}

export default Product;