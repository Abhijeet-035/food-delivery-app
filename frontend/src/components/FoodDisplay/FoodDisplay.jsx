import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const FoodDisplay = ({ category }) => {
  const {
    food_list: _food_list, // eslint-disable-line no-unused-vars
    filteredFoods,
    cartItems,
    addToCart,
    removeFromCart,
    currentPage,
    totalPages,
    handlePageChange,
    pagination,
    setPagination: _setPagination, // eslint-disable-line no-unused-vars
  } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>

      {/* Food List */}
      <div className="food-display-list" id="food-display-list">
        {filteredFoods.map((item) => {
          return (
            <div key={item._id} id="food-items">
              <div className="food-items-image-container">
                <img
                  className="food-items-image"
                  src={item.image}
                  alt={item.name || "Food item"}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop";
                  }}
                />
                {!cartItems || !cartItems[item._id] ? (
                  <img
                    className="add"
                    onClick={() => addToCart(item._id)}
                    src={assets.add_icon_white}
                    alt="Add to Cart"
                  ></img>
                ) : (
                  <div className="food-items-counter">
                    <img
                      onClick={() => removeFromCart(item._id)}
                      src={assets.remove_icon_red}
                      alt="Remove from Cart"
                    ></img>
                    <p>{cartItems[item._id]}</p>
                    <img
                      onClick={() => addToCart(item._id)}
                      src={assets.add_icon_green}
                      alt="Add More to Cart"
                    ></img>
                  </div>
                )}
              </div>
              <div className="food-items-info">
                <div className="food-items-name-rating">
                  <p>{item.name}</p>
                  <img src={assets.rating_starts} alt="Rating"></img>
                </div>
                <p className="food-items-description">{item.description}</p>
                <p className="food-items-price">₹{item.price}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {pagination ? (
        <div className="pagination-controls">
          <button
            className="prev-page"
            onClick={() => {
              handlePageChange(currentPage - 1);
              document
                .getElementById("food-display")
                .scrollIntoView({ behavior: "smooth" });
            }}
            disabled={currentPage === 1}
          >
            {"<<"}
          </button>

          {/* Display previous pages if applicable */}
          {currentPage > 1 && (
            <button
              className="page-number"
              onClick={() => {
                handlePageChange(currentPage - 1);
                document
                  .getElementById("food-display")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              {currentPage - 1}
            </button>
          )}

          {/* Display current page */}
          <button className="current-page" disabled>
            {currentPage}
          </button>

          {/* Display next 1-3 page numbers */}
          {[...Array(3)].map((_, index) => {
            const page = currentPage + index + 1;
            return (
              page <= totalPages && (
                <button
                  key={page}
                  className="page-number"
                  onClick={() => {
                    handlePageChange(page);
                    document
                      .getElementById("food-display")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {page}
                </button>
              )
            );
          })}

          <button
            className="next-page"
            onClick={() => {
              handlePageChange(currentPage + 1);
              document
                .getElementById("food-display")
                .scrollIntoView({ behavior: "smooth" });
            }}
            disabled={currentPage === totalPages}
          >
            {">>"}
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FoodDisplay;
