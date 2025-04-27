// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";

import AuthFlow from "./components/AuthFlow";
import { AuthProvider } from "./context/AuthProvider";
import { ProductProvider } from "./context/ProductProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <AuthProvider>
          <ProductProvider>
            <NavigationContainer>
              <AuthFlow />
            </NavigationContainer>
          </ProductProvider>
        </AuthProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
