import React, { useEffect } from "react";
import "./TrackOrderModal.css";

// The 4 pipeline stages — must match backend status strings exactly
const STAGES = [
  {
    key: "Order Placed",
    label: "Order Placed",
    icon: "🛒",
    desc: "Your order has been received and confirmed.",
  },
  {
    key: "Food Processing",
    label: "Preparing Your Food",
    icon: "👨‍🍳",
    desc: "The restaurant is preparing your meal fresh.",
  },
  {
    key: "Out for Delivery",
    label: "Out for Delivery",
    icon: "🛵",
    desc: "Your order is on its way — hang tight!",
  },
  {
    key: "Delivered",
    label: "Delivered",
    icon: "✅",
    desc: "Your order has been delivered. Enjoy your meal!",
  },
];

const getActiveIndex = (status) => {
  const idx = STAGES.findIndex(
    (s) => s.key.toLowerCase() === (status || "").toLowerCase()
  );
  return idx === -1 ? 0 : idx;
};

const TrackOrderModal = ({ order, onClose }) => {
  const activeIndex = getActiveIndex(order.status);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="track-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="track-modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="track-modal-header">
          <div>
            <h2>Track Your Order</h2>
            <p className="track-order-id">Order ID: <span>{order._id}</span></p>
          </div>
          <button className="track-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Order summary strip */}
        <div className="track-summary">
          <div className="track-summary-item">
            <span className="track-summary-label">Items</span>
            <span className="track-summary-value">
              {order.items.map((i) => `${i.name} ×${i.quantity}`).join(", ")}
            </span>
          </div>
          <div className="track-summary-divider" />
          <div className="track-summary-item">
            <span className="track-summary-label">Total</span>
            <span className="track-summary-value">₹{order.amount}</span>
          </div>
          <div className="track-summary-divider" />
          <div className="track-summary-item">
            <span className="track-summary-label">Payment</span>
            <span className="track-summary-value">
              {order.payment ? "Paid" : "Pending"}
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div className="track-timeline">
          {STAGES.map((stage, idx) => {
            const isDone = idx < activeIndex;
            const isActive = idx === activeIndex;
            const isPending = idx > activeIndex;

            return (
              <div
                key={stage.key}
                className={`track-step ${isDone ? "done" : ""} ${isActive ? "active" : ""} ${isPending ? "pending" : ""}`}
              >
                {/* Connector line above (not on first item) */}
                {idx > 0 && (
                  <div className={`track-connector ${idx <= activeIndex ? "filled" : ""}`} />
                )}

                {/* Circle */}
                <div className="track-circle">
                  {isDone ? (
                    <svg viewBox="0 0 20 20" fill="white" width="14" height="14">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  ) : (
                    <span className="track-circle-icon">{stage.icon}</span>
                  )}
                </div>

                {/* Text */}
                <div className="track-step-text">
                  <p className="track-step-label">{stage.label}</p>
                  {(isDone || isActive) && (
                    <p className="track-step-desc">{stage.desc}</p>
                  )}
                  {isActive && (
                    <span className="track-badge">In Progress</span>
                  )}
                  {isDone && (
                    <span className="track-badge done-badge">Completed</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Estimated delivery note */}
        {order.status !== "Delivered" && (
          <div className="track-eta">
            🕐 Estimated delivery: <strong>30 – 45 minutes</strong> from order placement
          </div>
        )}
        {order.status === "Delivered" && (
          <div className="track-eta delivered-eta">
            🎉 Your order was delivered successfully. Enjoy your meal!
          </div>
        )}

      </div>
    </div>
  );
};

export default TrackOrderModal;
