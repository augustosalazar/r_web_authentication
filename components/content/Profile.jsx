import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { AppContext } from "../../context/AuthProvider";
import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile({ navigation }) {
  const { logoutUser } = useContext(AppContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Profile Screen</Text>
        <Button onPress={logoutUser}>Logout</Button>
      </View>
    </SafeAreaView>
  );
}
