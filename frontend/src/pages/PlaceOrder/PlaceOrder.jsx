import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, allFoodItems, cartItems, url, token } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "India",
    phone: "",
    paymentMethod: "stripe",
  });
  const [countries] = useState(["India", "USA", "UK", "Canada", "Australia"]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Indian states data
  const indiaStates = {
    "Andhra Pradesh": ["Hyderabad", "Visakhapatnam", "Vijayawada"],
    "Arunachal Pradesh": ["Itanagar", "Papum Pare"],
    Assam: ["Guwahati", "Dibrugarh"],
    Bihar: ["Patna", "Gaya", "Bhagalpur"],
    Chhattisgarh: ["Raipur", "Durg"],
    Goa: ["Panaji", "Margao"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    Haryana: ["Faridabad", "Gurgaon", "Hisar"],
    "Himachal Pradesh": ["Shimla", "Mandi"],
    Jharkhand: ["Ranchi", "Dhanbad"],
    Karnataka: ["Bangalore", "Mysore", "Mangalore"],
    Kerala: ["Kochi", "Thiruvananthapuram"],
    "Madhya Pradesh": ["Indore", "Bhopal"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Manipur: ["Imphal"],
    Meghalaya: ["Shillong"],
    Mizoram: ["Aizawl"],
    Nagaland: ["Kohima"],
    Odisha: ["Bhubaneswar", "Cuttack"],
    Punjab: ["Chandigarh", "Amritsar"],
    Rajasthan: ["Jaipur", "Jodhpur", "Udaipur"],
    Sikkim: ["Gangtok"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    Telangana: ["Hyderabad", "Warangal"],
    Tripura: ["Agartala"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
    Uttarakhand: ["Dehradun"],
    "West Bengal": ["Kolkata", "Darjeeling"],
  };
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));

    // Auto-update cities when state changes
    if (name === "state" && data.country === "India") {
      const citiesList = indiaStates[value] || [];
      setCities(citiesList);
      setData((prev) => ({ ...prev, city: "" }));
    }

    // Auto-update states when country changes
    if (name === "country") {
      if (value === "India") {
        setStates(Object.keys(indiaStates));
      } else {
        setStates([]);
      }
      setData((prev) => ({ ...prev, state: "", city: "" }));
      setCities([]);
    }
  };

  const handlePincodeChange = (e) => {
    const pincode = e.target.value;
    setData((prev) => ({ ...prev, zipcode: pincode }));

    // Auto-fill city and state based on pincode
    const pincodeMappings = {
      "560001": { city: "Bangalore", state: "Karnataka" },
      "400001": { city: "Mumbai", state: "Maharashtra" },
      "110001": { city: "New Delhi", state: "Delhi" },
      "700001": { city: "Kolkata", state: "West Bengal" },
      "600001": { city: "Chennai", state: "Tamil Nadu" },
    };

    if (pincodeMappings[pincode]) {
      const { city, state } = pincodeMappings[pincode];
      setData((prev) => ({ ...prev, city, state }));
    }
  };
  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    allFoodItems.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 80,
      paymentMethod: data.paymentMethod,
    };
    try {
      // If COD is selected, don't use Stripe
      if (data.paymentMethod === "cod") {
        alert("Order placed with Cash on Delivery. You will pay at delivery.");
        navigate("/myorders");
        return;
      }

      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error in order data", +response.data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order. Please try again.");
    }
  };
  useEffect(() => {
    if (!token) {
      navigate("/");
      alert("Login to place order");
    } else if (getTotalCartAmount() === 0) {
      navigate("/");
      alert("your cart is empty");
    } else {
      // Initialize states for India
      setStates(Object.keys(indiaStates));
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="First name"
            name="firstName"
            value={data.firstName}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            placeholder="Last name"
            name="lastName"
            value={data.lastName}
            onChange={onChangeHandler}
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          required
        />
        <input
          type="text"
          placeholder="Street"
          name="street"
          value={data.street}
          onChange={onChangeHandler}
          required
        />
        <input
          type="text"
          placeholder="Pin code (e.g., 560001, 400001, 110001)"
          name="zipcode"
          value={data.zipcode}
          onChange={handlePincodeChange}
          required
        />
        <select
          name="country"
          value={data.country}
          onChange={onChangeHandler}
          required
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select
          name="state"
          value={data.state}
          onChange={onChangeHandler}
          required
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <select
          name="city"
          value={data.city}
          onChange={onChangeHandler}
          required
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          required
        />
        <p className="title" style={{ marginTop: "20px" }}>
          Payment Method
        </p>
        <div className="payment-methods">
          <label className="payment-option">
            <input
              type="radio"
              name="paymentMethod"
              value="stripe"
              checked={data.paymentMethod === "stripe"}
              onChange={onChangeHandler}
            />
            <span>💳 Credit/Debit Card (Stripe)</span>
          </label>
          <label className="payment-option">
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={data.paymentMethod === "upi"}
              onChange={onChangeHandler}
            />
            <span>📱 UPI Payment</span>
          </label>
          <label className="payment-option">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={data.paymentMethod === "cod"}
              onChange={onChangeHandler}
            />
            <span>💵 Cash on Delivery (COD)</span>
          </label>
        </div>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 80}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 80}
              </b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
