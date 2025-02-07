import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../../context/CartProvider";
import "./NewHeader.css";

const NewHeader = () => {
  const { cartItems } = useContext(CartContext);

  // localStorage'dan user objesini çek
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const navigate = useNavigate();

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

  // Kullanıcı adını kısaltma fonksiyonu (opsiyonel)
  const shortenUsername = (username, maxLength = 10) => {
    if (username.length > maxLength) {
      return username.substring(0, maxLength) + "...";
    }
    return username;
  };

  return (
    <>
      <header className="riot-header">
        {/* Navbar */}
        <nav className="riot-navbar">
          <div className="navbar-left">
            <Link to="/">
              <img
                src="/sds-Photoroom.png"
                alt="Site Logo"
                className="riot-logo"
              />
            </Link>
          </div>

          <div className="navbar-right">
            {/* Kullanıcı giriş yapmışsa */}
            {user ? (
              <>
                <div className="riot-user-info">
                  <div className="riot-avatar-placeholder">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="riot-user-greeting">
                    Hello, {shortenUsername(user.username)}!
                  </span>
                </div>

                {/* Siparişler sayfası */}
                <Link to="/orders" className="riot-nav-link">
                  <div className="riot-icon-with-label">
                    <i className="bi bi-cart-check"></i>
                    <span className="riot-icon-label">Order</span>
                  </div>
                </Link>

                {/* Eğer admin ise admin panel linki */}
                {user.role === "admin" && (
                  <Link to="/admin" className="riot-nav-link">
                    <i className="bi bi-tools"></i> Admin
                  </Link>
                )}

                {/* Sepet butonu */}
                <Link to="/cart" className="riot-nav-link riot-cart-button">
                  <div className="riot-icon-with-label">
                    <i className="bi bi-cart-fill"></i>
                    <span className="riot-icon-label">Cart</span>
                  </div>
                  <span className="cart-count">({cartItems.length})</span>
                </Link>

                {/* Çıkış butonu */}
                <button onClick={showLogoutModal} className="riot-logout-btn">
                  <i className="bi bi-box-arrow-right"></i>
                </button>
              </>
            ) : (
              /* Kullanıcı giriş yapmamışsa */
              <div className="riot-auth-links-container">
                <Link to="/auth?mode=login" className="riot-nav-link">
                  Login
                </Link>
                <Link to="/auth?mode=register" className="riot-nav-link">
                  Register
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Logout Confirmation Modal */}
      {isLogoutModalVisible && (
        <div className="riot-modal-overlay">
          <div className="riot-modal">
            <h2 className="riot-modal-title">Confirm Logout</h2>
            <p className="riot-modal-message">Are you sure you want to log out?</p>
            <div className="riot-modal-actions">
              <button className="riot-btn riot-confirm-btn" onClick={confirmLogout}>
                Yes, Log Out
              </button>
              <button className="riot-btn riot-cancel-btn" onClick={closeLogoutModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewHeader;
