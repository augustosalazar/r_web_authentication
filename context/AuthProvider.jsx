import React from "react"; // Add this import
import LocalPreferences from "../utils/local_preferences"; // Import LocalPreferences
import { useEffect } from "react"; // Import useEffect
import AuthenticationService from "../service/authentication_service"; // Import AuthenticationService

export const AppContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [login, setLogin] = React.useState(false);

  // Load the initial value from shared preferences
  useEffect(() => {
    const loadLoginState = async () => {
      const storedLoginState = await LocalPreferences.retrieveData(
        "isLoggedIn",
        "bool"
      );
      setLogin(storedLoginState ?? false); // Default to false if null
    };

    loadLoginState();
  }, []);

  const loginUser = async (email, password) => {
    console.log("Input Info:", email, password);

    try {
      AuthenticationService.login(email, password);
      setLogin(true);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
  const logoutUser = async () => {
    LocalPreferences.storeData("isLoggedIn", false);
    setLogin(false);
  };
  const signupUser = async (email, password) => {
    try {
      AuthenticationService.signUp({
        username: email,
        firstName: "FirstName",
        lastName: "LastName",
        password: password
      });
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  return (
    <AppContext.Provider value={{ login, loginUser, logoutUser, signupUser }}>
      {children}
    </AppContext.Provider>
  );
};
