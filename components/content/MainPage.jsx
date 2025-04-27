import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FAB, Button } from "react-native-paper";
import { ProductContext } from "../../context/ProductProvider";
import { useContext } from "react";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

export default function MainPage({ navigation }) {
  const { refreshProducts, deleteProduct, loading, products, error } =
    useContext(ProductContext);

  useEffect(() => {
    refreshProducts();
  }, []);

  const renderRightActions = () => (
    <View style={styles.rightAction}>
      <Text style={styles.deleteText}>Eliminar</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Swipeable
      friction={2}
      overshootRight={false}
      renderRightActions={renderRightActions}
      rightThreshold={80}
      onSwipeableOpen={(direction) => {
        if (direction === "right") {
          deleteProduct(item.id);
        }
      }}
    >
      <View
        style={{
          padding: 12,
          marginVertical: 4,
          marginHorizontal: 12,
          backgroundColor: "#fff",
          borderRadius: 6
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 0.6 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {item.name}
              </Text>

              <View>
                <Text style={{ marginTop: 4 }}>Quantity: {item.quantity}</Text>

                <Text style={{ marginTop: 2, color: "#666" }}>
                  {item.description}
                </Text>
              </View>
            </View>
          </View>
          <Button
            mode="contained-tonal"
            onPress={() => navigation.navigate("Detail", { product: item })}
            style={styles.optionButton}
          >
            Edit
          </Button>
        </View>
      </View>
    </Swipeable>
  );

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
        <Text>Loading products…</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ color: "red" }}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
          Products
        </Text>
        <FlatList
          style={{ marginTop: 16 }}
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <FAB
        style={styles.fab}
        icon="plus"
        color="white"
        onPress={() => navigation.navigate("Detail")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#6200ee"
  },
  rightAction: {
    width: 80, // must match rightThreshold
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 8,
    marginHorizontal: 16
  },
  deleteText: {
    color: "white",
    fontWeight: "bold"
  }
});
