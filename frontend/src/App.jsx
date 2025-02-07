import { Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import NotFoundPage from "./pages/NotFoundPage"; 
import UserPage from "./pages/Admin/UserPage";
import CategoryPage from "./pages/Admin/Categories/CategoryPage";
import UpdateCategoryPage from "./pages/Admin/Categories/UpdateCategoryPage";
import CreateCategoryPage from "./pages/Admin/Categories/CreateCategoryPage";
import CreateProductPage from "./pages/Admin/Products/CreateProductPage";
import ProductPage from "./pages/Admin/Products/ProductPage";
import UpdateProductPage from "./pages/Admin/Products/UpdateProductPage";
import CouponPage from "./pages/Admin/Coupons/CouponPage";
import CreateCouponPage from "./pages/Admin/Coupons/CreateCouponPage";
import UpdateCouponPage from "./pages/Admin/Coupons/UpdateCouponPage";
import Success from "./pages/Success";
import OrderPage from "./pages/Admin/OrderPage";
import DashboardPage from "./pages/Admin/DashboardPage";
import NotificationPrompt from "./components/NotificationPrompt/NotificationPrompt";
import MusteriSepet from "./pages/MüsteriSepet";
import PrivatePolicy from "./pages/Privacy Policy/Privacy Policy";
import FAQ from "./components/Layout/F.A.Q/FAQ";
import Header from "./components/Layout/Header/Header";
import Products from "./components/Products/Products";
import Footer from "./components/Layout/Footer/Footer";  
import TermsAndConditions from "./pages/Terms & Conditions/Terms & Conditions";
import Agreements from "./pages/Agreements/Agreements";
import CopyrightPolicy from "./pages/CopyrightPolicy/CopyrightPolicy";
import Header2 from "./components/Layout/NewHeader/NewHeader";
import NewHeader from "./components/Layout/NewHeader/NewHeader";


function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NotificationPrompt />
            <Header />
            <Products />
            <FAQ />
            <Footer />
          </>}
      />
      <Route
        path="/terms-conditions"
        element={
          <>
          <NewHeader />
            <TermsAndConditions/>
            <Footer />
          </>}
      />

<Route
        path="/agreements"
        element={
          <>
          <NewHeader />
          <Agreements />
          <Footer />
          </>}
      />
      <Route
        path="/copyright-policy"
        element={
          <>
          <NewHeader />
          <CopyrightPolicy/>
            <Footer />
          </>}
      />
      <Route 
        path="/cart" 
        element={<CartPage />} />
      <Route 
        path="/auth" 
        element={<AuthPage />} />
      <Route 
        path="/privacy-policy" 
        element={<>
        <NewHeader />
        <PrivatePolicy />
        <Footer />
        </>} />
        <Route 
        path="/orders" 
        element={<>
        <MusteriSepet />
        <Footer />
        </>} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/success" element={<Success />} />
      <Route path="/admin/*">
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<UserPage />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="categories/create" element={<CreateCategoryPage />} />
        <Route path="categories/update/:id" element={<UpdateCategoryPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="products/create" element={<CreateProductPage />} />
        <Route path="products/update/:id" element={<UpdateProductPage />} />
        <Route path="coupons" element={<CouponPage />} />
        <Route path="coupons/create" element={<CreateCouponPage />} />
        <Route path="coupons/update/:id" element={<UpdateCouponPage />} />
        <Route path="orders" element={<OrderPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} /> 
    </Routes>
  );
}

export default App;