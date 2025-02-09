import React, { useState } from "react";
import "./Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
// Twitter simgesini kaldırdık
import { FaDiscord } from "react-icons/fa"; // Discord simgesini ekledik

const Footer = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  // Dummy data for policies (if you need to handle them in-state)
  const policyData = {
    privacy: {
      title: "Privacy Policy",
      content: "Your privacy policy content..."
    },
    terms: {
      title: "Terms & Conditions",
      content: "Your terms and conditions content..."
    },
    refund: {
      title: "Refund Policy",
      content: "Your refund policy content..."
    },
  };

  // Function to handle opening the modal with specific policy content
  const handleModalOpen = (policyKey) => {
    const policy = policyData[policyKey];
    setModalTitle(policy.title);
    setModalContent(policy.content);
    setModalOpen(true);
  };

  // Function to close modal
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <footer className="footer">
      {/* Top Section: Widgets */}
      <div className="widgets-row">
        <div className="container footer-widgets">
          <div className="brand-info">
            <img
              src="/sds-Photoroom.png"
              alt="AccValorant Logo"
              className="logo"
            />
            <p className="footer-desc">
              AccValo.Shop, provides gaming accounts and products. This website
              is not affiliated with Riot Games or Valorant.
            </p>
            <p className="footer-contact">
              <strong>Email: </strong>
              <a href="mailto:accvalorantshop@gmail.com" className="email-link">
                accvalorantshop@gmail.com
              </a>
            </p>
          </div>

          <div className="widget-nav-menu">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/auth?mode=login">Login</a>
              </li>
              <li>
                <a href="/auth?mode=register">Register</a>
              </li>
            </ul>
          </div>

          <div className="widget-nav-menu">
            <h4>Policies</h4>
            <ul>
              <li>
                <button
                  onClick={() => (window.location.href = "/privacy-policy")}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => (window.location.href = "/terms-conditions")}
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => (window.location.href = "/agreements")}>
                  Agreements
                </button>
              </li>
              <li>
                <button
                  onClick={() => (window.location.href = "/copyright-policy")}
                >
                  Copyright Policy
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-contact-bottom">
            <h4>Follow Us</h4>
            <div className="social-links">
              {/* Discord simgesi eklendi */}
              
              <a href="https://www.instagram.com/accvalorant.shop/" className="social-icon">
                <InstagramIcon />
              </a>
              <a href="https://discord.gg/aKydKfy4Hn" className="social-icon">
                <FaDiscord size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="copyright-row">
        <div className="container">
          <div className="footer-copyright">
            <div className="site-copyright">
              <p>
                © 2025 AccValo.Shop, This website is not affiliated with Riot
                Games or Valorant.
              </p>
            </div>

            {/* Payment Methods Section */}
            <div className="payment-methods">
              {/* Replace these paths with wherever your images are stored */}
              <img
                src="/cards.png"
                alt="Visa"
                className="payment-logo"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{modalTitle}</h2>
            <div className="modal-text">{modalContent}</div>
            <button className="modal-close-button" onClick={handleModalClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
