import LocalPreferences from "../utils/local_preferences";

const PrefsService = {
  async login(email) {
    await LocalPreferences.storeData("email", email);
    await LocalPreferences.storeData("isLoggedIn", true);
  },

  async logout() {
    LocalPreferences.storeData("isLoggedIn", false);
  },

  async isLoggedIn() {
    const isLoggedIn = await LocalPreferences.retrieveData(
      "isLoggedIn",
      "bool"
    );
    if (isLoggedIn === null) {
      return false; // Default to false if not found
    }
    return isLoggedIn;
  },

  async getLoggedUser() {
    const email = await LocalPreferences.retrieveData("email", "string");
    return { email };
  }
};

export default PrefsService;
