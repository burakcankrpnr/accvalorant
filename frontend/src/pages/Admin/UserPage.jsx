import { Button, Popconfirm, Table, message, Modal } from "antd";
import { useCallback, useEffect, useState } from "react";
import "./UserPage.css";

const UserPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [defaultCountry, setDefaultCountry] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (imgSrc) => (
        <img
          src={imgSrc}
          alt="Avatar"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
          }}
        />
      ),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
  {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
  },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Kullanıcıyı Sil"
          description="Kullanıcıyı silmek istediğinizden emin misiniz?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteUser(record.email)}
        >
          <Button type="primary" danger>
            Sil
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const fetchCountry = useCallback(async () => {
    try {
      const response = await fetch("https://ipapi.co/json/"); // IP tabanlı lokasyon API
      const data = await response.json();
      setDefaultCountry(data.country_code.toLowerCase());
      setLocationData(data);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/users`);

      if (response.ok) {
        const data = await response.json();
        const updatedData = data.map((user) => ({
          ...user,
          country: defaultCountry || "Unknown",
        }));
        setDataSource(updatedData);
      } else {
        message.error("Veri getirme başarısız.");
      }
    } catch (error) {
      console.log("Veri hatası:", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, defaultCountry]);

  const deleteUser = async (userEmail) => {
    try {
      const response = await fetch(`${apiUrl}/api/users/${userEmail}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Kullanıcı başarıyla silindi.");
        fetchUsers();
      } else {
        message.error("Silme işlemi başarısız.");
      }
    } catch (error) {
      console.log("Silme hatası:", error);
    }
  };

  const handleRowClick = (record) => {
    setSelectedUser(record);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    fetchCountry();
    fetchUsers();
  }, [fetchCountry, fetchUsers]);

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record._id}
        loading={loading}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />

      <Modal
        title="Kullanıcı Detayları"
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        {selectedUser && (
          <div>
            <p><strong>Username:</strong> {selectedUser.username}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>First Name:</strong> {selectedUser.firstName}</p>
            <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
            <p><strong>Phone:</strong> {selectedUser.phone}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
            <p><strong>Country:</strong> {selectedUser.country}</p>
            <p><strong>Created At:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(selectedUser.updatedAt).toLocaleString()}</p>
            {locationData && (
              <div>
                <p><strong>City:</strong> {locationData.city}</p>
                <p><strong>Region:</strong> {locationData.region}</p>
                <p><strong>Country Name:</strong> {locationData.country_name}</p>
                <p><strong>Latitude:</strong> {locationData.latitude}</p>
                <p><strong>Longitude:</strong> {locationData.longitude}</p>
                <p><strong>Timezone:</strong> {locationData.timezone}</p>
                <p><strong>Currency:</strong> {locationData.currency}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default UserPage;
