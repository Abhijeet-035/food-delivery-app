import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/verify",
        {
          success,
          orderId,
        },
        { headers: { token: token } }
      );
      if (response.data.success) {
        console.log("Payment verification successful");
        navigate("/myorders");
      } else {
        console.log("Payment verification failed");
        navigate("/");
      }
    } catch (error) {
      console.error("Error during payment verification:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    if (token) {
      verifyPayment();
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="verify">
      <h1>verify</h1>
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
