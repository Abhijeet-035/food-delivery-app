import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import "./MyOrders.css";
import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import TrackOrderModal from "./TrackOrderModal";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [trackedOrder, setTrackedOrder] = useState(null);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token: token } }
    );
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const handleTrack = async (order) => {
    // Re-fetch latest orders so status is current before opening modal
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token: token } }
      );
      const fresh = response.data.data;
      setData(fresh);
      const updated = fresh.find((o) => o._id === order._id) || order;
      setTrackedOrder(updated);
    } catch {
      setTrackedOrder(order);
    }
  };

  return (
    <div className="my-orders">
      <h1>My Orders</h1>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="order" />
            <p>
              {order.items.map((item, i) =>
                i === order.items.length - 1
                  ? item.name + " x " + item.quantity
                  : item.name + " x " + item.quantity + ", "
              )}
            </p>
            <p>₹{order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span>&#x25cf; </span>
              <b>{order.status}</b>
            </p>
            <button onClick={() => handleTrack(order)}>Track Order</button>
          </div>
        ))}
      </div>

      {trackedOrder && (
        <TrackOrderModal
          order={trackedOrder}
          onClose={() => setTrackedOrder(null)}
        />
      )}
    </div>
  );
};

export default MyOrders;
