import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MainPage({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Main Page</Text>
      </View>
    </SafeAreaView>
  );
}
