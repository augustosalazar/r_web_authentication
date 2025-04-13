import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://authuserver.openlab.uninorte.edu.co";
const APP_NAME = "clase202510";
const CONTRACT_KEY = "65aef754-1bcf-4311-8a0a-b004b006cc92";

const AuthenticationService = {
  /**
   * Logs in the user with the provided email and password.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<boolean>} - Resolves to true if login is successful, otherwise throws an error.
   */
  async login(email, password) {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          app_name: APP_NAME,
          username: email,
          password: password
        })
      });

      if (response.status === 200) {
        const data = await response.json();
        const token = data.access_token;

        // Store the token in AsyncStorage
        await AsyncStorage.setItem("auth_token", token);

        return true;
      } else {
        throw new Error(`Login failed with status code ${response.status}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  /**
   * Signs up a new user.
   * @param {Object} user - The user object containing username, firstName, lastName, and password.
   * @returns {Promise<boolean>} - Resolves to true if sign-up is successful, otherwise throws an error.
   */
  async signUp(user) {
    try {
      const response = await fetch(
        `${BASE_URL}/register?contract_key=${CONTRACT_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          },
          body: JSON.stringify({
            username: user.username,
            first_name: user.firstName,
            last_name: user.lastName,
            password: user.password
          })
        }
      );

      if (response.status === 200) {
        return true;
      } else {
        throw new Error(`Sign-up failed with status code ${response.status}`);
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      throw error;
    }
  },

  /**
   * Logs out the user.
   * @returns {Promise<boolean>} - Resolves to true.
   */
  async logOut() {
    try {
      // Clear the token from AsyncStorage
      await AsyncStorage.removeItem("auth_token");
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }
};

export default AuthenticationService;
