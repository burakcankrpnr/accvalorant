import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartProvider";
import { message } from "antd";
import { loadStripe } from "@stripe/stripe-js";
import "./Cart.css";

const Cart = () => {
  const { cartItems, setCartItems, removeFromCart } = useContext(CartContext);
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false); // Kupon kontrolü için durum

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const stripePublicKey = import.meta.env.VITE_API_STRIPE_PUBLIC_KEY;

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const applyCoupon = async () => {
    if (isCouponApplied) {
      return message.error("You have already applied a coupon code!");
    }

    if (couponCode.trim().length === 0) {
      return message.warning("Coupon code cannot be empty.");
    }

    try {
      const res = await fetch(`${apiUrl}/api/coupons/code/${couponCode}`);

      if (!res.ok) {
        return message.warning("The coupon code you entered is invalid!");
      }

      const data = await res.json();
      const discountPercent = data.discountPercent;

      const updatedCartItems = cartItems.map((item) => {
        const updatedPrice = item.price * (1 - discountPercent / 100);
        return { ...item, price: updatedPrice };
      });

      setCartItems(updatedCartItems);
      setIsCouponApplied(true); // Kupon uygulandı olarak işaretle
      message.success(`${couponCode} coupon code applied successfully.`);
    } catch (error) {
      console.error(error);
      message.error("An error occurred while applying the coupon.");
    }
  };

  const handlePayment = async () => {
    if (!user) {
      return message.info("You must be logged in to make a payment!");
    }

    const body = {
      products: cartItems,
      user: user,
    };

    try {
      const stripe = await loadStripe(stripePublicKey);

      const res = await fetch(`${apiUrl}/api/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Payment process failed.");
      }

      const session = await res.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred during the payment process.");
    }
  };

  const cartItemTotals = cartItems.map((item) => item.price * item.quantity);
  const subTotal = cartItemTotals.reduce((prev, current) => prev + current, 0);

  const cartTotal = subTotal.toFixed(2);

  return (
    <section className="cart-page">
      <div className="cart-container">
        {cartItems.length > 0 ? (
          <div className="cart-page-wrapper">
            <form className="cart-form">
              <table className="shop-table">
                <thead>
                  <tr>
                    <th className="product-remove">&nbsp;</th>
                    <th className="product-thumbnail">&nbsp;</th>
                    <th className="product-name">Product</th>
                    <th className="product-price">Price</th>
                    <th className="product-quantity">Quantity</th>
                    <th className="product-subtotal">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="cart-item">
                      <td className="product-remove">
                        <button
                          className="remove-product"
                          onClick={() => removeFromCart(item._id)}
                          aria-label="Remove product"
                        >
                          <i className="bi bi-x"></i>
                        </button>
                      </td>
                      <td className="product-thumbnail">
                        <img
                          src={
                            item.img && item.img[0]
                              ? item.img[0]
                              : "/placeholder.jpg"
                          }
                          alt={item.name}
                        />
                      </td>
                      <td className="product-name">{item.name}</td>
                      <td className="product-price">
                        {parseFloat(item.price).toFixed(2)} $
                      </td>
                      <td className="product-quantity">
                        {parseInt(item.quantity)}
                      </td>
                      <td className="product-subtotal">
                        {(item.price * item.quantity).toFixed(2)} $
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="actions-wrapper">
                <div className="coupon">
                  <input
                    type="text"
                    className="input-text"
                    placeholder="Enter Coupon Code"
                    onChange={(e) => setCouponCode(e.target.value)}
                    value={couponCode}
                  />
                  <button className="btn" type="button" onClick={applyCoupon}>
                    Apply Coupon
                  </button>
                </div>

                <div className="update-cart">
                  <button className="btn" type="button">
                    Update Cart
                  </button>
                </div>
              </div>
            </form>

            <div className="cart-collaterals">
              <div className="cart-totals">
                <h2>
                  <i className="bi bi-cart-fill"></i> Cart Totals
                </h2>
                <table>
                  <tbody>
                    <tr className="order-total">
                      <th>Total</th>
                      <td>
                        <strong id="cart-total">{cartTotal} $</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="checkout">
                  <button className="btn btn-lg" onClick={handlePayment}>
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <i className="bi bi-cart-x"></i>
            <h2>Your cart is empty!</h2>
            <p>Start shopping now and discover unique Valorant products.</p>
            <a href="/" className="btn">
              Start Shopping
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
