import { Spin, Table, message, Modal, Button } from "antd";
import { useEffect, useState } from "react";
import "./MüsteriSepet.css"; // Profesyonel görünüme uygun CSS dosyası

const MusteriSepet = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  if (!loggedInUser || !loggedInUser.email) {
    message.error("Please log in.");
    return null;
  }

  const maskEmail = (email) => {
    const [name, domain] = email.split("@");
    return `${name.slice(0, 3)}***@${domain}`;
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "id",
      render: (id) => `${id.slice(0, 6)}...${id.slice(-4)}`,
    },
    {
      title: "Customer Email",
      dataIndex: "user",
      key: "customer_email",
      render: (user) => (user.email ? maskEmail(user.email) : "Email not provided"),
    },
    {
      title: "Total Amount",
      key: "total_amount",
      render: (text, record) => {
        const total = record.products.reduce((sum, item) => {
          const productPrice = item.product.price ? parseFloat(item.product.price) : 0;
          return sum + productPrice * item.quantity;
        }, 0);
        return total.toFixed(2) + " $";
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span className={status === "completed" ? "status-paid" : "status-unpaid"}>
          {status}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleRowClick(record)}>
          View Details
        </Button>
      ),
    },
  ];

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders`
      );
      if (response.ok) {
        const result = await response.json();
        // Sadece giriş yapan kullanıcının siparişlerini filtreleme
        const userOrders = result.orders.filter(
          (order) => order.user && order.user.email === loggedInUser.email
        );
        setDataSource(userOrders);
      } else {
        message.error("Failed to fetch order details.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      message.error("An error occurred while fetching order details.");
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (record) => {
    setSelectedOrder(record);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="valorant-theme order-page-container">
      <h1 className="valorant-title page-title">My Orders</h1>
      <Spin spinning={loading} className="spinner-container">
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey={(record, index) => `${record._id}-${index}`}
          loading={loading}
          className="order-table valorant-table"
          locale={{
            emptyText: "You have no orders yet.",
          }}
        />
      </Spin>

      <Modal
        title={<span className="valorant-modal-title">Order Details</span>}
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        className="order-modal valorant-modal"
      >
        {selectedOrder && (
          <div className="order-modal-content">
            <p>
              <strong>Order ID:</strong>{" "}
              {selectedOrder._id.slice(0, 6)}...{selectedOrder._id.slice(-4)}
            </p>
            <p>
              <strong>Customer Email:</strong> {maskEmail(selectedOrder.user.email)}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <p>
              <strong>Created At:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}
            </p>
            <h4>Order Items:</h4>
            <ul className="order-items">
              {selectedOrder.products.map((item, index) => (
                <li key={`${item._id}-${index}`} className="order-item">
                  {item.product.name} - {item.quantity} x{" "}
                  {(item.product.price ? parseFloat(item.product.price).toFixed(2) : "0.00")} $
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default MusteriSepet;
