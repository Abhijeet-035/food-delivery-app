import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const FoodDisplay = () => {
  const {
    filteredFoods,
    cartItems,
    addToCart,
    removeFromCart,
    currentPage,
    totalPages,
    handlePageChange,
    pagination,
    searchQuery,
    searchPerformed,
    clearSearch,
  } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>

      {searchPerformed && filteredFoods.length === 0 ? (
        <div className="search-no-results">
          <h3>Sorry! Item not available 😔</h3>
          <p>
            We couldn't find any food matching "{searchQuery}".
          </p>
          <button onClick={clearSearch}>Show All Foods</button>
        </div>
      ) : (
        <>
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
                      />
                    ) : (
                      <div className="food-items-counter">
                        <img
                          onClick={() => removeFromCart(item._id)}
                          src={assets.remove_icon_red}
                          alt="Remove from Cart"
                        />
                        <p>{cartItems[item._id]}</p>
                        <img
                          onClick={() => addToCart(item._id)}
                          src={assets.add_icon_green}
                          alt="Add More to Cart"
                        />
                      </div>
                    )}
                  </div>

                  <div className="food-items-info">
                    <div className="food-items-name-rating">
                      <p>{item.name}</p>
                      <img src={assets.rating_starts} alt="Rating" />
                    </div>

                    <p className="food-items-description">
                      {item.description}
                    </p>

                    <p className="food-items-price">
                      ₹{item.price}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {pagination && totalPages > 1 && (
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

              <button className="current-page" disabled>
                {currentPage}
              </button>

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
          )}
        </>
      )}
    </div>
  );
};

export default FoodDisplay;