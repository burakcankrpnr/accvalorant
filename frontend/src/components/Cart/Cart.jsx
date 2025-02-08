import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/CartProvider";
import { message, Spin } from "antd";
import "./Cart.css";

const Cart = () => {
  const { cartItems, setCartItems, removeFromCart } = useContext(CartContext);
  const [couponCode, setCouponCode] = useState("");
  // localStorage üzerinden kupon uygulanıp uygulanmadığını kontrol ediyoruz.
  const [isCouponApplied, setIsCouponApplied] = useState(() => {
    const applied = localStorage.getItem("couponApplied");
    return applied ? JSON.parse(applied) : false;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  // Kupon uygulama fonksiyonu
  const applyCoupon = async () => {
    // Eğer kupon kodu zaten uygulanmışsa, warning mesajı gösteriyoruz.
    if (isCouponApplied) {
      return message.warning("A coupon code has already been applied!");
    }

    if (couponCode.trim().length === 0) {
      return message.warning("Coupon code cannot be empty.");
    }

    try {
      const res = await fetch(`${apiUrl}/api/coupons/code/${couponCode}`);

      if (res.status === 404) {
        return message.warning("Invalid coupon code. Please try again.");
      }

      if (!res.ok) {
        return message.error("An error occurred while validating the coupon.");
      }

      const data = await res.json();
      const discountPercent = data.discountPercent;

      const updatedCartItems = cartItems.map((item) => {
        const updatedPrice = item.price * (1 - discountPercent / 100);
        return { ...item, price: updatedPrice };
      });

      setCartItems(updatedCartItems);
      setIsCouponApplied(true);
      // Kuponun uygulandığını localStorage'a kaydediyoruz
      localStorage.setItem("couponApplied", JSON.stringify(true));
      message.success(`${couponCode} coupon code applied successfully.`);
    } catch (error) {
      console.error(error);
      message.error("An error occurred while applying the coupon.");
    }
  };

  // Ödeme işlemi (Shopier entegrasyonu)
  const handlePayment = async () => {
    if (!user) {
      return message.info("You must be logged in to make a payment!");
    }

    const body = {
      products: cartItems,
      user: user,
      cargoFee: 0,
    };

    try {
      setIsLoading(true);
      const res = await fetch(`${apiUrl}/api/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Payment process failed.");
      }

      const response = await res.json();
      const { shopierUrl, shopierData } = response;

      if (!shopierData) {
        console.error("Shopier data is missing in the response:", response);
        return message.error("An unexpected error occurred during the payment process.");
      }

      // Shopier'e dinamik form gönderimi
      const form = document.createElement("form");
      form.method = "POST";
      form.action = shopierUrl;

      Object.keys(shopierData).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = shopierData[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error(error);
      message.error("An error occurred during the payment process.");
    } finally {
      setIsLoading(false);
    }
  };

  // Toplam fiyat hesaplama
  useEffect(() => {
    const newCartTotal = cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
    setCartTotal(newCartTotal);
  }, [cartItems]);

  return (
    <section className="cart-page">
      {isLoading && (
        <div className="loading-overlay">
          <Spin size="large" />
        </div>
      )}
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
                  {cartItems.map((item, index) => (
                    <tr key={`${item._id}-${index}`} className="cart-item">
                      <td className="product-remove">
                        <button
                          className="remove-product"
                          onClick={() => removeFromCart(item._id)}
                          aria-label="Remove product"
                          type="button"
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
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const newQuantity = parseInt(e.target.value, 10);
                            if (newQuantity < 1) {
                              removeFromCart(item._id);
                              message.info("Item removed from the cart.");
                            } else {
                              setCartItems((prevItems) =>
                                prevItems.map((cartItem) =>
                                  cartItem._id === item._id
                                    ? { ...cartItem, quantity: newQuantity }
                                    : cartItem
                                )
                              );
                            }
                          }}
                        />
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
                    disabled={isCouponApplied}
                  />
                  <button
                    className="btn"
                    type="button"
                    onClick={applyCoupon}
                    disabled={isCouponApplied}
                  >
                    Apply Coupon
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
            <p>Start shopping now and discover unique products.</p>
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
