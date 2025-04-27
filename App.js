// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";

import AuthFlow from "./components/AuthFlow";
import { AuthProvider } from "./context/AuthProvider";
import { ProductProvider } from "./context/ProductProvider";

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <ProductProvider>
          <NavigationContainer>
            <AuthFlow />
          </NavigationContainer>
        </ProductProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
