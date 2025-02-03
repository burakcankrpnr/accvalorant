import React, { useEffect, useState } from "react";
import { Modal, Button, Typography, message } from "antd";
import "./NotificationPrompt.css"; // Don't forget your CSS file

const { Title, Text } = Typography;

const NotificationPrompt = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    const hasSeenCoupon = localStorage.getItem("hasSeenCoupon");
    if (!hasSeenCoupon) {
      setIsModalOpen(true);
    }
  }, []);

  const closeModal = () => {
    localStorage.setItem("hasSeenCoupon", "true");
    setIsModalOpen(false);
  };

  const copyCouponCode = () => {
    navigator.clipboard.writeText("WELCOME10");
    message.success("Coupon code copied successfully!");
  };

  return (
    <Modal
      open={isModalOpen}
      centered
      footer={null}
      closable={false}
      className="notification-modal"
      onCancel={closeModal}
    >
      <div className="notification-modal-content">
        <img
          src="annocument.jpg"
          alt="Valorant Discount Offer"
          className="notification-modal-image"
        />
        <Button 
          className="notification-modal-button" 
          onClick={copyCouponCode}
          style={{ background: "linear-gradient(135deg, #ff4655 0%, #d83c4b 100%)", color: "white", fontWeight: "bold", fontSize: "16px", borderRadius: "8px", border: "none", padding: "12px", transition: "0.3s" }}
        >
          WELCOME10
        </Button>
        <Button 
          className="notification-modal-close" 
          onClick={closeModal}
          style={{ background: "black", color: "white", fontWeight: "bold", fontSize: "14px", borderRadius: "8px", border: "1px solid #ff4655", padding: "10px", transition: "0.3s" }}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default NotificationPrompt;