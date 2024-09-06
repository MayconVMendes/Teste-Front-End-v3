import { createContext, useState, useCallback } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const saveUser = (userData) => {
    setUser(userData);
  };

  const updateUser = useCallback((userData) => {
    setUser(userData);
  }, []);

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("userData");
  };

  return (
    <UserContext.Provider value={{ user, updateUser, saveUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node,
};

export default UserContext;
