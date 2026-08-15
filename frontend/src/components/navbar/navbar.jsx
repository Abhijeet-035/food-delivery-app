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
  const [showNoResults, setShowNoResults] = useState(false);

  const mobileMenuRef = useRef(null);

  const {
    getTotalCartAmount,
    token,
    setToken,
    searchFoods,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const handleNavClick = (menuName) => {
    setMenu(menuName);
    setMobileMenuOpen(false);
  };

  const scrollToFoodDisplay = () => {
    setTimeout(() => {
      const foodDisplay = document.getElementById("food-display");

      if (!foodDisplay) {
        return;
      }

      const navbarHeight = 80;

      const position =
        foodDisplay.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight;

      window.scrollTo({
        top: position,
        behavior: "smooth",
      });
    }, 150);
  };

  const performSearch = () => {
    const value = searchText.trim();

    if (!value) {
      searchFoods("");
      setShowNoResults(false);
      return;
    }

    const results = searchFoods(value);

    if (results.length === 0) {
      setShowNoResults(true);
      return;
    }

    setShowNoResults(false);

    if (window.location.pathname !== "/") {
      navigate("/");
    }

    scrollToFoodDisplay();
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setShowNoResults(false);
  };

  const handleSearchToggle = () => {
    if (!searchOpen) {
      setSearchOpen(true);
      return;
    }

    performSearch();
  };

  const handleShowAllFoods = () => {
    setSearchText("");
    setShowNoResults(false);
    searchFoods("");

    if (window.location.pathname !== "/") {
      navigate("/");
    }

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchText("");
    setShowNoResults(false);
    searchFoods("");
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
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  performSearch();
                }

                if (e.key === "Escape") {
                  closeSearch();
                }
              }}
              placeholder="Search food..."
              autoFocus
            />
          )}

          <img
            src={assets.search_icon}
            alt="Search"
            onClick={handleSearchToggle}
          />

          {showNoResults && (
            <div className="search-no-results">
              <strong>Sorry! Item not available 😔</strong>

              <p>
                We couldn't find any food matching
                <br />
                "{searchText}"
              </p>

              <button onClick={handleShowAllFoods}>
                Show all foods
              </button>
            </div>
          )}
        </div>

        <div className="navbar-basket_icon">
          <Link to="/cart">
            <img
              src={assets.basket_icon}
              alt="Shopping cart"
            />
          </Link>

          <div
            className={
              getTotalCartAmount() === 0 ? "" : "dot"
            }
          ></div>
        </div>

        {!token ? (
          <button
            className="signin-button"
            onClick={() => setShowLogin(true)}
          >
            Sign in
          </button>
        ) : (
          <div className="navbar-profile">
            <img
              src={assets.profile_icon}
              alt="Profile"
            />

            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img
                  src={assets.bag_icon}
                  alt="Orders"
                />
                <p>Orders</p>
              </li>

              <hr />

              <li onClick={logout}>
                <img
                  src={assets.logout_icon}
                  alt="Logout"
                />
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
            className={
              menu === "Mobile-app" ? "active" : ""
            }
          >
            Mobile-app
          </a>

          <a
            href="#footer"
            onClick={() => handleNavClick("Contact us")}
            className={
              menu === "Contact us" ? "active" : ""
            }
          >
            Contact us
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;