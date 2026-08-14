import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [allFoodItems, setAllFoodItems] = useState([]);
  const url = process.env.REACT_APP_API_URL || "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(12);
  const [pagination, setPagination] = useState(true);
  const navigate = useNavigate();

  const listAllFoods = async () => {
    const response = await axios.get(url + "/api/food/allfoods");
    setAllFoodItems(response.data.data);
  };

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));
    }

    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));

    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = allFoodItems.find(
          (product) => product._id === item
        );

        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }

    return totalAmount;
  };

  const fetchFoodList = async (page = 1) => {
    try {
      const response = await axios.get(
        `${url}/api/food/list?page=${page}&limit=${limit}`
      );

      setFilteredFoods(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } }
      );

      setCartItems(response.data.cartData || {});
    } catch (error) {
      if (error.response && error.response.status === 401) {
        if (error.response.data.message === "Token expired") {
          navigate("/");
        }
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      fetchFoodList(newPage);
    }
  };

  const handleCategoryChange = async (category) => {
    if (category === "All") {
      await fetchFoodList();
      setPagination(true);
    } else {
      const filtered = allFoodItems.filter(
        (food) => food.category === category
      );

      setFilteredFoods(filtered);
      setPagination(false);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList(currentPage);
      await listAllFoods();

      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ContextValue = {
    url,
    allFoodItems,
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    filteredFoods,
    token,
    setToken,
    pagination,
    setPagination,
    currentPage,
    totalPages,
    handleCategoryChange,
    handlePageChange,
  };

  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;