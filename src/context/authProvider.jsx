import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [admin, setAdmin] = useState(() => {
const stored = localStorage.getItem("adminData");
  if (!stored || stored === "undefined") return null;
  try {
    return JSON.parse(stored);
  } catch (err) {
    return null;
  }
});

  const login = ({ admin: adminData, token: jwtToken }) => {
    // Save JWT
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    console.log("After login token:", localStorage.getItem("token"));
    // Save admin data only if valid
    if (adminData && typeof adminData === "object") {
      localStorage.setItem("adminData", JSON.stringify(adminData));
      setAdmin(adminData);
    } else {
      localStorage.removeItem("adminData");
      setAdmin(null);
    }
  };

  const logout = () => {
    console.log("Before logout:", localStorage.getItem("token"));
    localStorage.removeItem("token");
    console.log("After logout:", localStorage.getItem("token"));
    localStorage.removeItem("adminData");
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ token, admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
