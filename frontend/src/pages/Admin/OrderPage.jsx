import { Spin, Table, message, Modal, Button } from "antd";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = [
    {
      title: "Sipariş ID",
      dataIndex: "_id",
      key: "id",
    },
    {
      title: "Müşteri Email",
      dataIndex: "user",
      key: "customer_email",
      render: (user) => (user && user.email ? user.email : "Email sağlanmamış"),
    },
    {
      title: "Toplam Tutar",
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
      title: "Durum",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: status === "completed" ? "green" : "red" }}>
          {status}
        </span>
      ),
    },
    {
      title: "Aksiyonlar",
      key: "actions",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleRowClick(record)}>
          Detayları Gör
        </Button>
      ),
    },
  ];

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders`);
      if (response.ok) {
        const result = await response.json();
        setDataSource(result.orders);
      } else {
        message.error("Sipariş bilgileri alınamadı.");
      }
    } catch (error) {
      console.error("Hata oluştu:", error);
      message.error("Sipariş bilgileri alınırken bir hata oluştu.");
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
    <>
      <Spin spinning={loading}>
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey={(record, index) => `${record._id}-${index}`}
          loading={loading}
        />
      </Spin>

      <Modal
        title="Sipariş Detayları"
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        {selectedOrder && (
          <div>
            <p>
              <strong>Order ID:</strong> {selectedOrder._id}
            </p>
            <p>
              <strong>Müşteri Email:</strong>{" "}
              {selectedOrder.user && selectedOrder.user.email ? selectedOrder.user.email : "Email sağlanmamış"}
            </p>
            <p>
              <strong>Durum:</strong> {selectedOrder.status}
            </p>
            <p>
              <strong>Oluşturulma Tarihi:</strong>{" "}
              {new Date(selectedOrder.createdAt).toLocaleString()}
            </p>
            <h4>Order Items:</h4>
            <ul>
              {selectedOrder.products.map((item, index) => (
                <li key={`${item._id}-${index}`}>
                  {item.product.name} - {item.quantity} x{" "}
                  <strong>
                    {(item.product.price ? parseFloat(item.product.price).toFixed(2) : "0.00")}{" "}
                  </strong>
                  $
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </>
  );
};

export default OrderPage;
