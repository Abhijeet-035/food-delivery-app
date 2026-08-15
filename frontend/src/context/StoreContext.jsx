import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [allFoodItems, setAllFoodItems] = useState([]);

  const url =
    process.env.REACT_APP_API_URL || "http://localhost:4000";

  const [token, setToken] = useState("");
  const [food_list] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(12);
  const [pagination, setPagination] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);

  const navigate = useNavigate();

  const listAllFoods = async () => {
    try {
      const response = await axios.get(
        url + "/api/food/allfoods"
      );

      setAllFoodItems(response.data.data || []);
    } catch (error) {
      console.error("Error loading all foods:", error);
    }
  };

  const fetchFoodList = async (page = 1) => {
    try {
      const response = await axios.get(
        `${url}/api/food/list?page=${page}&limit=${limit}`
      );

      setFilteredFoods(response.data.data || []);
      setTotalPages(response.data.totalPages || 1);
      setCurrentPage(response.data.currentPage || 1);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  const searchFoods = (query) => {
    const searchValue = query.trim().toLowerCase();

    setSearchQuery(query);

    if (!searchValue) {
      setSearchPerformed(false);
      setPagination(true);
      fetchFoodList(1);
      return [];
    }

    setSearchPerformed(true);

    const searchResults = allFoodItems.filter((food) => {
      const name = food.name?.toLowerCase() || "";
      const description = food.description?.toLowerCase() || "";
      const category = food.category?.toLowerCase() || "";

      return (
        name.includes(searchValue) ||
        description.includes(searchValue) ||
        category.includes(searchValue)
      );
    });

    setFilteredFoods(searchResults);
    setPagination(false);

    return searchResults;
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchPerformed(false);
    setPagination(true);
    fetchFoodList(1);
  };

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: 1,
      }));
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
        {
          headers: { token },
        }
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
        {
          headers: { token },
        }
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

  const loadCartData = async (storedToken) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        {
          headers: { token: storedToken },
        }
      );

      setCartItems(response.data.cartData || {});
    } catch (error) {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.message === "Token expired"
      ) {
        navigate("/");
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (
      newPage > 0 &&
      newPage <= totalPages &&
      !searchQuery
    ) {
      fetchFoodList(newPage);
    }
  };

  const handleCategoryChange = async (category) => {
    setSearchQuery("");
    setSearchPerformed(false);

    if (category === "All") {
      await fetchFoodList(1);
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
    const loadData = async () => {
      await listAllFoods();
      await fetchFoodList(1);

      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    };

    loadData();
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
    searchFoods,
    searchQuery,
    searchPerformed,
    clearSearch,
  };

  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;