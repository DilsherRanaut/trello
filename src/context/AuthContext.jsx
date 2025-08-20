import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const register = (fname, lname, email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((u) => u.email === email);

    if (userExists) return false;

    const newUser = { fname, lname, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    return true;
  };

 const updateProfile = (updatedUser) => {
  // Update current user state
  setCurrentUser(updatedUser);
  localStorage.setItem("currentUser", JSON.stringify(updatedUser));

  // Get existing users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Update the specific user in the array
  users = users.map((user) =>
    user.id === updatedUser.id ? updatedUser : user
  );

  // Save updated array back to localStorage
  localStorage.setItem("users", JSON.stringify(users));
};


  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, register, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
