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

    AuthenticationService.login(email, password)
      .then(() => {
        console.log("Login successful");
        setLogin(true);
      })
      .catch((error) => {
        console.error("Login failed:", error);
        throw new Error("Login failed");
      });
  };
  const logoutUser = async () => {
    LocalPreferences.storeData("isLoggedIn", false);
    setLogin(false);
  };
  const signupUser = async (email, password) => {
    AuthenticationService.signUp({
      username: email,
      firstName: "FirstName",
      lastName: "LastName",
      password: password
    })
      .then(() => {
        console.log("Sign-up successful");
      })
      .catch((error) => {
        console.error("Sign-up failed:", error);
        throw new Error("Sign-up failed");
      });
  };

  return (
    <AppContext.Provider value={{ login, loginUser, logoutUser, signupUser }}>
      {children}
    </AppContext.Provider>
  );
};
