import React, { useState, useEffect } from "react";
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

export default function MainPage({ navigation }) {
  const { refreshProducts, loading, products, error } =
    useContext(ProductContext);

  useEffect(() => {
    refreshProducts();
  }, []);

  const renderItem = ({ item }) => (
    <View
      style={{
        padding: 12,
        marginVertical: 4,
        marginHorizontal: 12,
        backgroundColor: "#fff",
        borderRadius: 6
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>

      <Text style={{ marginTop: 4 }}>Quantity: {item.quantity}</Text>

      <Text style={{ marginTop: 2, color: "#666" }}>{item.description}</Text>

      <Button
        mode="contained-tonal"
        onPress={() => navigation.navigate("Detail", { product: item })}
        style={styles.optionButton}
      >
        Edit
      </Button>
    </View>
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
  }
});
