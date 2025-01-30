import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "./Redux/actions/userActions";

const MainWrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    const currentTime = Date.now();

    if (userData.timestamp && currentTime - userData.timestamp > oneDay) {
      // Clear user data if it is older than 1 day
      localStorage.removeItem("user");
      dispatch(clearUser());
    } else if (userData.user) {
      // If user data is valid, store it in Redux
      dispatch(setUser(userData.user));
    }
  }, [dispatch]);

  return null;
};

export default MainWrapper;
