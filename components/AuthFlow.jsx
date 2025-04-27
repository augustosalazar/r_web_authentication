// AuthFlow.jsx
import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "./auth/Login";
import { Signup } from "./auth/Signup";
import { AppContext } from "../context/AuthProvider"; // Import the context
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MainPage from "./content/MainPage";
import Profile from "./content/Profile";
import DetailPage from "./content/DetailPage";
import { ProductContext } from "../context/ProductProvider";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProductsStack = createStackNavigator();

function ProductsStackScreen() {
  return (
    <ProductsStack.Navigator>
      <ProductsStack.Screen
        name="Main"
        component={MainPage}
        options={{ headerShown: false }}
      />
      <ProductsStack.Screen
        name="Detail"
        component={DetailPage}
        options={({ route }) => ({
          title: route.params?.product ? "Edit Product" : "Add Product"
        })}
      />
    </ProductsStack.Navigator>
  );
}

function ContentTabs() {
  return (
    <SafeAreaProvider>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={ProductsStackScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" size={24} color={color} />
            )
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}

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
        <Stack.Screen name="App" component={ContentTabs} />
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
