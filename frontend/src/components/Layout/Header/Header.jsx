import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../../context/CartProvider";
import Loading from "../../Loading/Loading";
import "./Header.css";

const Header = () => {
  const { cartItems } = useContext(CartContext);

  // localStorage'dan user objesini çek
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false); // Yükleme durumu
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false); // Logout modal state
  const navigate = useNavigate();

  // Mouse hareketi
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePosition({
      x: (clientX / window.innerWidth) * 2 - 1,
      y: (clientY / window.innerHeight) * 2 - 1,
    });
  };

  // Sayfa yükleme simülasyonu
  const simulatePageLoad = (path) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate(path);
    }, 2000); // 2 saniye yükleme
  };

  // Çıkış işlemi
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // Logout modal actions
  const showLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalVisible(false);
  };

  const confirmLogout = () => {
    closeLogoutModal();
    handleLogout();
  };

  // Kullanıcı adını kısaltma fonksiyonu (örneğin 10 karakterden uzun ise)
  const shortenUsername = (username, maxLength = 10) => {
    if (username.length > maxLength) {
      return username.substring(0, maxLength) + '...';
    }
    return username;
  };

  return (
    <>
      {isLoading && <Loading />}
      <header className="valorant-header" onMouseMove={handleMouseMove}>
        {/* Navbar */}
        <nav className="valorant-navbar">
          <div className="navbar-left">
            <Link to="/">
              <img src="/sds-Photoroom.png" alt="AccValorant Logo" className="logo" />
            </Link>
          </div>

          <div className="navbar-right">
            {/* Kullanıcı giriş yapmışsa */}
            {user ? (
              <>
                <div className="user-info">
                  {/* Avatar: Eğer karakter resmi varsa onu, yoksa kullanıcı adının ilk harfini göster */}
                  {user.characterImage ? (
                    <img
                      src={user.characterImage}
                      alt="Valorant Character"
                      className="valorant-avatar"
                    />
                  ) : (
                    <div className="avatar-placeholder">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span
                    className="user-greeting"
                    style={{ color: "#fff", marginLeft: "5px" }}
                  >
                    Hello, {shortenUsername(user.username)}!
                  </span>
                </div>

                {/* Order Icon with Label */}
                <Link to="/orders" className="nav-link">
                  <div className="icon-with-label">
                    <i className="bi bi-cart-check"></i>
                    <span className="icon-label"> Order</span>
                  </div>
                </Link>

                {/* Eğer admin ise admin panel linki */}
                {user.role === "admin" && (
                  <Link to="/admin" className="nav-link">
                    <i className="bi bi-tools"></i> Admin
                  </Link>
                )}

                {/* My Cart linki with Label */}
                <button
                  className="nav-link cart-button"
                  onClick={() => simulatePageLoad("/cart")}
                >
                  <div className="icon-with-label">
                    <i className="bi bi-cart-fill"></i>
                    <span className="icon-label"> Cart</span>
                  </div>
                  <span className="cart-count">({cartItems.length})</span>
                </button>

                {/* Logout Icon */}
                <button onClick={showLogoutModal} className="logout-btn">
                  <i className="bi bi-box-arrow-right"></i>
                </button>
              </>
            ) : (
              /* Kullanıcı giriş yapmamışsa */
              <div className="auth-links-container">
                <button
                  className="nav-link"
                  onClick={() => simulatePageLoad("/auth?mode=login")}
                >
                  Login
                </button>
                <button
                  className="nav-link"
                  onClick={() => simulatePageLoad("/auth?mode=register")}
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <div className="valorant-hero">
          <div className="container hero-content">
            <div className="hero-text">
              <h1>Buy Cheap Valorant Account with Instant Delivery</h1>
              <p>
                Get your Valorant account now with secure and fast delivery.
                Trusted by thousands of gamers around the world.
              </p>
              {/* Eğer user varsa sepet linki "hero-btn" içinde gözükebilir */}
              <a
                href={user ? "/cart" : "/auth?mode=register"} // Eğer kullanıcı varsa "/cart", yoksa "/register"
                className="hero-btn"
              >
                Buy Now!
              </a>
            </div>

            {/* Hero Image: Mouse hareketiyle dinamik parallax */}
            <div
              className="hero-image"
              style={{
                transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <img 
                src="/character_valo2.png" 
                alt="Valorant Character"  
                className="hero-image2" 
              />
            </div>
          </div>
        </div>
              
        {/* Logout Confirmation Modal */}
        {isLogoutModalVisible && (
          <div className="modal-overlay">
            <div className="valorant-modal">
              <h2 className="modal-title">Confirm Logout</h2>
              <p className="modal-message">Are you sure you want to log out?</p>
              <div className="modal-actions2">
                <button className="valorant-btn confirm-btn" onClick={confirmLogout}>
                  Yes, Log Out
                </button>
                <button className="valorant-btn cancel-btn" onClick={closeLogoutModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="valorant-features container">
          <div className="feature-box">
            <div className="feature-icon">
              <i className="bi bi-fire" />
            </div>
            <h3>Secure Delivery</h3>
            <p>
              Account information will be delivered to the e-mail address after
              being manually checked.
            </p>
          </div>
          <div className="feature-box">
            <div className="feature-icon">
              <i className="bi bi-emoji-smile" />
            </div>
            <h3>Trusted</h3>
            <p>
              We work fully secure with the largest Payment Gateway companies.
              Your information is protected with 256bit SSL. You can pay with any card.
            </p>
          </div>
          <div className="feature-box">
            <div className="feature-icon">
              <i className="bi bi-hand-thumbs-up" />
            </div>
            <h3>Warranty</h3>
            <p>
              All our products have a lifetime warranty. We can replace any account
              if a problem occurs.
            </p>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
