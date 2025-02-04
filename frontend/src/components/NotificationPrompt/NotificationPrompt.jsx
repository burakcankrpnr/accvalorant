import React, { useEffect, useState } from "react";
import { Modal, Button, Typography, message } from "antd";
import "./NotificationPrompt.css";

const NotificationPrompt = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const lastSeenTimestamp = localStorage.getItem("lastCouponTimestamp");
    const isNewUser = !localStorage.getItem("isReturningUser");
    const currentTime = Date.now();

    // Kullanıcının sayfa gezme sayısını al
    let pageViews = parseInt(localStorage.getItem("pageViews") || "0", 10);

    // Eğer kullanıcı yeni ise veya 12 saat geçtiyse göster
    if (isNewUser || !lastSeenTimestamp || currentTime - lastSeenTimestamp >= 43200000) {
      setIsModalOpen(true);
      localStorage.setItem("isReturningUser", "true");
    }

    // Sayfa görüntüleme sayısını artır
    pageViews++;
    localStorage.setItem("pageViews", pageViews);

    // Eğer kullanıcı 3 farklı sayfa gezdiyse kuponu aç
    if (pageViews >= 5) {
      setIsModalOpen(true);
      localStorage.setItem("pageViews", "0"); // Sayaç sıfırlanır
    }

    // Kullanıcı 30 saniyeden fazla sitede kalırsa kuponu göster
    const timeout = setTimeout(() => {
      setIsModalOpen(true);
    }, 30000); // 30 saniye = 30000 ms

    return () => clearTimeout(timeout); // Sayfa değiştiğinde temizlenir
  }, []);

  const closeModal = () => {
    localStorage.setItem("lastCouponTimestamp", Date.now());
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
