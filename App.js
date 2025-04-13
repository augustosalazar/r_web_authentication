import AuthFlow from "./components/AuthFlow";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { AuthProvider } from "./context/AuthProvider";

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <NavigationContainer>
          <AuthFlow />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}
