import PropTypes from "prop-types";
import { useContext } from "react";
import { message } from "antd"; // Ant Design'dan mesaj bileşeni
import { CartContext } from "../../context/CartProvider";
import { useNavigate } from "react-router-dom"; // Kullanıcı yönlendirmek için
import "./ProductItem.css";

const ProductItem = ({ productItem }) => {
  const { cartItems, addToCart } = useContext(CartContext);
  const navigate = useNavigate(); // useNavigate hook'u

  const originalPrice = productItem.price.current;
  const discountPercentage = productItem.price.discount;

  // İndirimli fiyatı hesaplama
  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;

  // Add to Cart butonuna tıklanınca çağrılır
  const handleAddToCart = () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      // Giriş yapılmamış
      message.warning("You must sign in or register to add items to your cart.");
      setTimeout(() => {
        navigate("/auth?mode=register"); // Register sayfasına yönlendir
      }, 1500); // Mesaj gösterildikten 1.5 saniye sonra yönlendirme
    } else if (productItem.stockStatus === "outOfStock") {
      // Stokta yok
      message.error(`${productItem.name} is currently out of stock.`);
    } else {
      // Stokta var -> sepete ekle
      addToCart(productItem);
      message.success(`${productItem.name} has been added to your cart.`);
    }
  };

  return (
    <div className="product-item">
      {/* İndirim Etiketi */}
      {productItem.price.discount > 0 && (
        <div className="discount-tag">-{productItem.price.discount}%</div>
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
          onClick={handleAddToCart}
          disabled={productItem.stockStatus === "outOfStock"}
        >
          {productItem.stockStatus === "outOfStock"
            ? "Out of Stock"
            : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  productItem: PropTypes.object.isRequired,
};

export default ProductItem;
