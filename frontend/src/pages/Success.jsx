import { Button, Result } from "antd";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartProvider";

const Success = () => {
  const { setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems([]); // Sepeti temizle
  }, [setCartItems]);

  return (
    <div className="success-page">
      <div className="container">
        <Result
          status="success"
          title="Payment Successful!"
          subTitle="Your order has been completed successfully."
          extra={[
            <Link to="/" key="home">
              <Button type="primary">Home</Button>
            </Link>,
            <Button
              key="orders"
              onClick={() => navigate("/orders")}
            >
              My Orders
            </Button>
          ]}
        />
      </div>
    </div>
  );
};
export default Success;
