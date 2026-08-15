import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./navbar.css";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const [isShrunk, setIsShrunk] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const mobileMenuRef = useRef(null);

  const {
    getTotalCartAmount,
    token,
    setToken,
    searchFoods,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const handleScroll = () => {
    setIsShrunk(window.scrollY > 0);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (menuName) => {
    setMenu(menuName);
    setMobileMenuOpen(false);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    searchFoods(value);
    navigate("/");
  };

  const handleSearchToggle = () => {
    setSearchOpen((prev) => !prev);

    if (searchOpen) {
      setSearchText("");
      searchFoods("");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div
      className={`navbar ${isShrunk ? "shrink" : ""}`}
      ref={mobileMenuRef}
    >
      <Link to="/">
        <img
          className="logo"
          src={assets.logo}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          alt="logo"
        />
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => handleNavClick("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </Link>

        <a
          href="#explore-menu"
          onClick={() => handleNavClick("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </a>

        <a
          href="#app-download"
          onClick={() => handleNavClick("Mobile-app")}
          className={menu === "Mobile-app" ? "active" : ""}
        >
          Mobile-app
        </a>

        <a
          href="#footer"
          onClick={() => handleNavClick("Contact us")}
          className={menu === "Contact us" ? "active" : ""}
        >
          Contact us
        </a>
      </ul>

      <div className="navbar-right">
        <div className="navbar-search">
          {searchOpen && (
            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search food..."
              autoFocus
            />
          )}

          <img
            src={assets.search_icon}
            alt="search"
            onClick={handleSearchToggle}
          />
        </div>

        <div className="navbar-basket_icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basketimage" />
          </Link>

          <div
            className={getTotalCartAmount() === 0 ? "" : "dot"}
          ></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>
            Sign in
          </button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />

            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>

              <hr />

              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}

        <button
          className="navbar-hamburger"
          onClick={() =>
            setMobileMenuOpen((prev) => !prev)
          }
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={`hamburger-line ${
              mobileMenuOpen ? "open" : ""
            }`}
          ></span>

          <span
            className={`hamburger-line ${
              mobileMenuOpen ? "open" : ""
            }`}
          ></span>

          <span
            className={`hamburger-line ${
              mobileMenuOpen ? "open" : ""
            }`}
          ></span>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="navbar-mobile-menu">
          <Link
            to="/"
            onClick={() => {
              handleNavClick("Home");
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className={menu === "Home" ? "active" : ""}
          >
            Home
          </Link>

          <a
            href="#explore-menu"
            onClick={() => handleNavClick("Menu")}
            className={menu === "Menu" ? "active" : ""}
          >
            Menu
          </a>

          <a
            href="#app-download"
            onClick={() => handleNavClick("Mobile-app")}
            className={menu === "Mobile-app" ? "active" : ""}
          >
            Mobile-app
          </a>

          <a
            href="#footer"
            onClick={() => handleNavClick("Contact us")}
            className={menu === "Contact us" ? "active" : ""}
          >
            Contact us
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;