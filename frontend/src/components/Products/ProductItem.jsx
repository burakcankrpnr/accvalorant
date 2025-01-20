import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { message } from "antd";
import { CartContext } from "../../context/CartProvider";
import { useNavigate } from "react-router-dom";
import "./ProductItem.css";

const ProductItem = ({ productItem }) => {
  const { cartItems, addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const originalPrice = productItem.price?.current || 0;
  const discountPercentage = productItem.price?.discount || 0;
  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      message.warning("You must sign in or register to add items to your cart.");
      setTimeout(() => {
        navigate("/auth?mode=register"); // Giriş yapılmamışsa yönlendirme
      }, 1500);
      return; // İşlemi sonlandır
    }

    if (productItem.stockStatus === "outOfStock") {
      message.error(`${productItem.name} is currently out of stock.`);
    } else {
      addToCart({
        ...productItem,
        price: discountedPrice,
      });
      message.success(`${productItem.name} has been added to your cart.`);
      closeModal(); // Ürün sepete eklendikten sonra modalı kapat
    }
  };

  return (
    <>
      <div className="product-item" onClick={openModal}>
        {/* İndirim Etiketi */}
        {discountPercentage > 0 && (
          <div className="discount-tag">-{discountPercentage}%</div>
        )}

        {/* Best Seller Etiketi */}
        {productItem.bestSeller && (
          <div className="best-seller-tag">Best Seller</div>
        )}

        {/* Stok Bilgisi */}
        <div
          className={`stock-info ${
            productItem.stockStatus === "outOfStock" ? "out-of-stock" : "in-stock"
          }`}
        >
          {productItem.stockStatus === "inStock" ? "In Stock" : "Out of Stock"}
        </div>

        {/* Ürün Görseli */}
        <div className="product-image">
          <img src={productItem.img[0]} alt={productItem.name} />
        </div>

        {/* Ürün Bilgileri */}
        <div className="product-info">
          <h3 className="product-title">{productItem.name}</h3>
          <div className="product-prices">
            <strong className="new-price">${discountedPrice.toFixed(2)}</strong>
            {discountPercentage > 0 && (
              <span className="old-price">${originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            className="add-to-cart"
            onClick={(e) => handleAddToCart(e)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: "#FF4655" }}>{productItem.name}</h2>

            {/* Açıklamayı HTML olarak yerleştirme */}
            <div
              className="product-description"
              dangerouslySetInnerHTML={{ __html: productItem.description }}
            />

            <div className="modal-actions">
              <button onClick={closeModal}>Close</button>
              <button onClick={(e) => handleAddToCart(e)}>Add to Cart</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ProductItem.propTypes = {
  productItem: PropTypes.object.isRequired,
  setCartItems: PropTypes.func,
};

export default ProductItem;
