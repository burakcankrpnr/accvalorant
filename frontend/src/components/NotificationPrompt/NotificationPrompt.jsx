import React, { useEffect, useState } from "react";
import { Modal, Button, Typography } from "antd";
import "./NotificationPrompt.css"; // Add your custom styles here

const { Title, Text } = Typography;

const NotificationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const hasPrompted = localStorage.getItem("notificationsAllowed");
    if (!hasPrompted) {
      setIsModalOpen(true); // Show the modal if the user hasn't made a decision
    }
  }, []);

  const handleAllowNotifications = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        localStorage.setItem("notificationsAllowed", "true");
        new Notification("Welcome to Valorant!", {
          body: "You will now receive the latest updates and notifications!",
          icon: "https://cdn.oneesports.gg/cdn-data/2023/01/Valorant_Lotus_Episode6ActI_Map-1024x576.jpg",
        });
      }
    }
    setIsModalOpen(false);
  };

  const handleDenyNotifications = () => {
    localStorage.setItem("notificationsAllowed", "false");
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen} // Use `open` instead of `visible`
      centered
      footer={null}
      closable={false}
      className="notification-modal"
    >
      <div className="modal-content">
        <img
          src="https://cdn.oneesports.gg/cdn-data/2023/01/Valorant_Lotus_Episode6ActI_Map-1024x576.jpg"
          alt="Valorant"
          className="modal-image"
        />
        <Title level={3} style={{ textAlign: "center", color: "#ff4655" }}>
          Enable Notifications for Valorant Updates!
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
