
import React from 'react';
import Header from '../Main/Header/Header';
import Navigation from '../Main/Navigation/Navigation';
import Breadcrumb from './Breadcrumb/Breadcrumb';
import Section from './Section/section';
import Footer from '../Main/Footer/Footer';
import Aside from './Section/Aside/Aside';
import PStore from './Section/PStore/pstore';

function Store() {
  return (
    <div>
      <Header />
      <Navigation />
      <Breadcrumb/>
      <Section>
        <Aside/>
        <PStore/>
      </Section>
      <Footer/>
    </div>
  );
}

export default Store;