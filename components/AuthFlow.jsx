// AuthFlow.jsx
import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "./auth/Login";
import { Signup } from "./auth/Signup";
import { Home } from "./content/Home";
import { AppContext } from "../context/AuthProvider"; // Import the context

const Stack = createStackNavigator();

const AuthFlow = () => {
  const { login } = useContext(AppContext); // Use the login state from AuthProvider

  // While the authentication status is being determined, show a loading indicator
  if (login === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Render Home if authenticated, otherwise render Login
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {login ? (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: true, title: "Home" }}
        />
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: true, title: "Sign Up" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthFlow;
