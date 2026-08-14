import React, { useEffect } from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="privacy-policy">
      <h1>Privacy Policy &amp; Terms of Service</h1>
      <p className="privacy-updated">Last updated: August 2026</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Welcome to <strong>Tomato</strong> ("we", "our", "us"). By accessing or using
          our platform — including our website and mobile application — you agree to be
          bound by these Terms &amp; Conditions and our Privacy Policy. Please read them
          carefully before placing any order.
        </p>
      </section>

      <section>
        <h2>2. Use of the Platform</h2>
        <ul>
          <li>You must be at least 18 years old to create an account and place orders.</li>
          <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
          <li>You agree not to use the platform for any unlawful or prohibited purpose.</li>
          <li>We reserve the right to suspend or terminate accounts that violate these terms.</li>
        </ul>
      </section>

      <section>
        <h2>3. Orders &amp; Payments</h2>
        <ul>
          <li>All prices are listed in Indian Rupees (₹) and include applicable taxes.</li>
          <li>A delivery fee of ₹80 applies to all orders regardless of order value.</li>
          <li>
            Payment methods accepted: Credit/Debit Card (via Stripe), UPI, and Cash on
            Delivery (COD).
          </li>
          <li>
            Orders once placed and confirmed cannot be cancelled. In case of a failed
            payment the order will not be processed.
          </li>
          <li>
            Tomato is not responsible for delays caused by incorrect delivery addresses
            provided by the user.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Delivery Policy</h2>
        <ul>
          <li>Estimated delivery time is 30–45 minutes depending on your location.</li>
          <li>Delivery is available within our serviceable zones only.</li>
          <li>
            Real-time order tracking is available on the "My Orders" page once your order
            is confirmed.
          </li>
          <li>
            We are not liable for delays caused by adverse weather, traffic conditions, or
            other circumstances beyond our control.
          </li>
        </ul>
      </section>

      <section>
        <h2>5. Refunds &amp; Cancellations</h2>
        <ul>
          <li>
            Refund requests must be raised within 24 hours of delivery by contacting our
            support team.
          </li>
          <li>
            Refunds are issued only in cases where the wrong item was delivered or the food
            was in an unacceptable condition supported by photo evidence.
          </li>
          <li>COD orders are not eligible for refund.</li>
          <li>Approved refunds are processed within 5–7 business days.</li>
        </ul>
      </section>

      <section>
        <h2>6. Privacy &amp; Data Collection</h2>
        <p>We collect the following personal data to provide our services:</p>
        <ul>
          <li>
            <strong>Account data:</strong> name, email address, phone number.
          </li>
          <li>
            <strong>Delivery data:</strong> address, city, state, pin code.
          </li>
          <li>
            <strong>Usage data:</strong> order history, browsing behaviour on our platform.
          </li>
          <li>
            <strong>Payment data:</strong> processed securely via Stripe; we do not store
            card details.
          </li>
        </ul>
        <p>
          We do not sell, rent, or trade your personal information to third parties. Your
          data is used solely to fulfill orders and improve your experience on our platform.
        </p>
      </section>

      <section>
        <h2>7. Cookies</h2>
        <p>
          Our platform uses cookies to remember your session and preferences. By continuing
          to use the platform you consent to our use of cookies. You may disable cookies
          through your browser settings, though some features may not function correctly as
          a result.
        </p>
      </section>

      <section>
        <h2>8. Intellectual Property</h2>
        <p>
          All content on this platform — including logos, images, text, and code — is the
          property of Tomato and is protected under applicable intellectual property laws.
          You may not reproduce, distribute, or create derivative works without our express
          written consent.
        </p>
      </section>

      <section>
        <h2>9. Limitation of Liability</h2>
        <p>
          Tomato shall not be liable for any indirect, incidental, special, or consequential
          damages arising from the use of our platform or services. Our maximum liability to
          you for any claim shall not exceed the amount paid for the specific order in
          question.
        </p>
      </section>

      <section>
        <h2>10. Changes to These Terms</h2>
        <p>
          We reserve the right to update these Terms &amp; Conditions at any time. Changes
          will be posted on this page with an updated date. Continued use of the platform
          after changes constitutes your acceptance of the new terms.
        </p>
      </section>

      <section>
        <h2>11. Contact Us</h2>
        <p>
          If you have any questions about these terms or our privacy practices, please
          contact us:
        </p>
        <ul>
          <li>Email: <a href="mailto:hello@tomatoapp.com">hello@tomatoapp.com</a></li>
          <li>Phone: +91 98765 43210</li>
        </ul>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
