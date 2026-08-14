import React, { useEffect } from "react";
import "./AboutUs.css";
import { assets } from "../../assets/assets";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="about-us">

      {/* Hero */}
      <div className="about-hero">
        <h1>About <span>Tomato</span></h1>
        <p>
          We're on a mission to connect food lovers with the best local
          restaurants — one delicious meal at a time.
        </p>
      </div>

      {/* Story */}
      <section className="about-section">
        <h2>Our Story</h2>
        <p>
          Tomato was born out of a simple frustration — great food was always
          nearby, but getting it to your door was needlessly complicated.
          Founded in 2022 by a small team of food enthusiasts and engineers,
          we set out to build a platform that makes ordering food as enjoyable
          as eating it.
        </p>
        <p>
          What started as a side project serving a single neighbourhood has
          grown into a platform trusted by thousands of hungry customers and
          hundreds of restaurant partners across the country. We're proud of
          how far we've come, and even more excited about where we're headed.
        </p>
      </section>

      {/* Mission */}
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          To make great food accessible to everyone — quickly, reliably, and
          with zero hassle. We believe that a warm, delicious meal should be
          just a few taps away, no matter where you are.
        </p>
      </section>

      {/* Values */}
      <section className="about-section">
        <h2>What We Stand For</h2>
        <div className="about-values">
          <div className="about-value-card">
            <span>🍽️</span>
            <h3>Quality First</h3>
            <p>
              Every restaurant on our platform is vetted for hygiene, taste,
              and consistency. We don't compromise on what ends up on your plate.
            </p>
          </div>
          <div className="about-value-card">
            <span>⚡</span>
            <h3>Speed &amp; Reliability</h3>
            <p>
              Our delivery network is optimised for speed. Real-time tracking
              means you always know exactly where your order is.
            </p>
          </div>
          <div className="about-value-card">
            <span>🤝</span>
            <h3>Supporting Local</h3>
            <p>
              We partner with independent restaurants and local chefs, helping
              small businesses reach more customers in their communities.
            </p>
          </div>
          <div className="about-value-card">
            <span>💚</span>
            <h3>Sustainability</h3>
            <p>
              We're committed to reducing our environmental footprint — from
              eco-friendly packaging to optimising delivery routes to cut
              emissions.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="about-section">
        <h2>How It Works</h2>
        <div className="about-steps">
          <div className="about-step">
            <div className="about-step-number">1</div>
            <h3>Browse</h3>
            <p>Explore hundreds of dishes across every category — salads, rolls, pasta, desserts, and more.</p>
          </div>
          <div className="about-step-arrow">→</div>
          <div className="about-step">
            <div className="about-step-number">2</div>
            <h3>Order</h3>
            <p>Add items to your cart and check out in seconds using card, UPI, or cash on delivery.</p>
          </div>
          <div className="about-step-arrow">→</div>
          <div className="about-step">
            <div className="about-step-number">3</div>
            <h3>Track</h3>
            <p>Follow your order in real time from the kitchen all the way to your door.</p>
          </div>
          <div className="about-step-arrow">→</div>
          <div className="about-step">
            <div className="about-step-number">4</div>
            <h3>Enjoy</h3>
            <p>Sit back, relax, and enjoy a fresh, hot meal delivered straight to you.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="about-stat">
          <h3>10,000+</h3>
          <p>Happy Customers</p>
        </div>
        <div className="about-stat">
          <h3>500+</h3>
          <p>Restaurant Partners</p>
        </div>
        <div className="about-stat">
          <h3>50+</h3>
          <p>Cities Covered</p>
        </div>
        <div className="about-stat">
          <h3>30 min</h3>
          <p>Avg. Delivery Time</p>
        </div>
      </section>

      {/* Team */}
      <section className="about-section">
        <h2>Built With ❤️ By</h2>
        <p>
          Tomato is built and maintained by <strong>Abhijeet Kumar</strong> — a
          passionate full-stack developer who believes technology should make
          everyday life simpler and more delightful. From the backend APIs to
          the pixel-perfect UI, every line of code is written with care.
        </p>
        <div className="about-social">
          <a href="https://github.com/Abhijeet-035" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://x.com/Abhijeet18k" target="_blank" rel="noopener noreferrer">
            Twitter / X
          </a>
          <a href="https://www.linkedin.com/in/abhijeet-kumar35/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
