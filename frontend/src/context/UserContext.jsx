import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setUserDetails(null); // Clear if no token

      try {
        const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/profile/me`, {
          headers: {
  "Content-Type": "application/json",
  ...(token && { Authorization: `Bearer ${token}` }), // ✅ good code
},
        });

        const data = await res.json(); 
        if (res.ok) {
          setUserDetails(data.user);
        } else {
          console.error("❌ Failed to load profile:", data.message);
          setUserDetails(null);
        }
      } catch (err) {
        console.error("❌ Profile fetch error:", err);
        setUserDetails(null);
      }
    };

    // const token = localStorage.getItem("token");
    fetchProfile();

    // Watch for token changes and refetch profile
    const onStorageChange = () => {
      const newToken = localStorage.getItem("token");
      if (!newToken) {
        setUserDetails(null);
      } else {
        fetchProfile();
      }
    };

    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);
  const clearUserDetails = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("user_xp");
    localStorage.removeItem("xp_history");
    // localStorage.removeItem("lastLoginXP");
    setUserDetails(null);
  };

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails, clearUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};