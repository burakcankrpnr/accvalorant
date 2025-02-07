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

  const MY_STRIPE_SECRET_KEY = import.meta.env.VITE_API_STRIPE_SECRET_KEY;

  const maskEmail = (email) => {
    const [name, domain] = email.split("@");
    return `${name.slice(0, 3)}***@${domain}`;
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      className: "order-column-id",
      render: (id) => `${id.slice(0, 6)}...${id.slice(-4)}`, // Kısaltma
    },
    {
      title: "Customer Email",
      dataIndex: "customer_email",
      key: "customer_email",
      render: (email) => maskEmail(email), // E-posta maskeleme
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      key: "total_amount",
      render: (amount, record) =>
        `${(amount / 100).toFixed(2)} ${record.currency.toUpperCase()}`,
    },
    {
      title: "Status",
      dataIndex: "payment_status",
      key: "payment_status",
      render: (status) => (
        <span className={status === "paid" ? "status-paid" : "status-unpaid"}>
          {status}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
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
        `https://api.stripe.com/v1/checkout/sessions`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${MY_STRIPE_SECRET_KEY}`,
          },
        }
      );

      if (response.ok) {
        const { data } = await response.json();

        const userOrders = data.filter(
          (session) => session.customer_email === loggedInUser.email
        );

        const detailedData = await Promise.all(
          userOrders.map(async (session) => {
            const lineItemsResponse = await fetch(
              `https://api.stripe.com/v1/checkout/sessions/${session.id}/line_items`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${MY_STRIPE_SECRET_KEY}`,
                },
              }
            );
            const lineItems = lineItemsResponse.ok
              ? await lineItemsResponse.json()
              : { data: [] };

            return {
              id: session.id,
              customer_email: session.customer_email || "Email not provided",
              total_amount: session.amount_total,
              currency: session.currency,
              payment_status: session.payment_status,
              line_items: lineItems.data,
            };
          })
        );

        setDataSource(detailedData);
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
          rowKey={(record) => record.id}
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
              {selectedOrder.id.slice(0, 6)}...{selectedOrder.id.slice(-4)}
            </p>
            <p>
              <strong>Customer Email:</strong> {maskEmail(selectedOrder.customer_email)}
            </p>
            <p>
              <strong>Total Amount:</strong>{" "}
              {(selectedOrder.total_amount / 100).toFixed(2)}{" "}
              {selectedOrder.currency.toUpperCase()}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.payment_status}
            </p>
            <h4>Order Items:</h4>
            <ul className="order-items">
              {selectedOrder.line_items.map((item) => (
                <li key={item.id} className="order-item">
                  {item.description} - {item.quantity} x{" "}
                  {(item.price.unit_amount / 100).toFixed(2)}{" "}
                  {item.price.currency.toUpperCase()}
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
