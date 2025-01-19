import React from "react";
import Products from "../components/Products/Products";
import FAQ from "../components/Layout/F.A.Q/FAQ";
import Header from "../../src/components/Layout/Header/Header"; 
import Footer from "../../src/components/Layout/Footer/Footer";
import NotificationPrompt from "../components/NotificationPrompt/NotificationPrompt"; 

const HomePage = () => {
  return (
    
    <React.Fragment>
      <NotificationPrompt />  
      <Header />
      <Products />
      <FAQ />
      <Footer />
    </React.Fragment>
  );
};

export default HomePage;