// Main.js
import React from 'react';
import Header from './Header/Header';
import Navigation from './Navigation/Navigation';
import Section1 from './Section1/Section1';
import ProductList from './ProductTab/ProductTab';
import SellProduct from './SellProduct/SellProduct';
import HotDeal from './HotDeal/HotDeal';
import ContactBanner from './Contact/Contact';
import Footer from './Footer/Footer';

function Main() {
  return (
    <div>
      <Header />
      <Navigation />
      <Section1/>
      <ProductList/>
      <HotDeal/>
      <SellProduct/>
      <ContactBanner/>
      <Footer/>
    </div>
  );
}

export default Main;