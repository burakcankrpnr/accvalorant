import React, { useEffect, useState } from "react";
import { Modal, Button, Typography } from "antd";
import "./NotificationPrompt.css"; // Add your custom styles here

const { Title, Text } = Typography;

const NotificationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem("notificationLastShown");
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    if (lastShown !== today) {
      setIsModalOpen(true); // Show the modal if it hasn't been shown today
    }
  }, []);

  const handleAllowNotifications = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        new Notification("Welcome to Valorant!", {
          body: "You will now receive the latest updates and notifications!",
          icon: "https://cdn.oneesports.gg/cdn-data/2023/01/Valorant_Lotus_Episode6ActI_Map-1024x576.jpg",
        });
      }
    }
    closeModal();
  };

  const handleDenyNotifications = () => {
    closeModal();
  };

  const closeModal = () => {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem("notificationLastShown", today); // Store today's date
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      centered
      footer={null}
      closable={false}
      className="notification-modal"
      onCancel={closeModal} // Close modal when clicking outside
    >
      <div className="modal-content">
        <img
          src="https://cdn.oneesports.gg/cdn-data/2023/01/Valorant_Lotus_Episode6ActI_Map-1024x576.jpg"
          alt="Valorant"
          className="modal-image"
        />
        <Title level={3} style={{ textAlign: "center", color: "#ff4655" }}>
          Enable Notifications for AccValorant.Shop !
        </Title>
        <Text style={{ textAlign: "center", display: "block", marginBottom: 20 }}>
          Stay ahead with the latest updates, event reminders, and exclusive offers.
        </Text>
        <div className="modal-buttons">
          <Button type="primary" onClick={handleAllowNotifications}>
            Enable Notifications
          </Button>
          <Button onClick={handleDenyNotifications} style={{ marginLeft: 10 }}>
            No Thanks
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NotificationModal;
