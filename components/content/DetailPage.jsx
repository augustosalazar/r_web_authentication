// DetailPage.js
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button, Appbar, Text } from "react-native-paper";
import ProductService from "../../service/product_service";

export default function DetailPage({ navigation, route }) {
  const product = route.params?.product;
  const isEdit = Boolean(product);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isEdit) {
      setName(product.name);
      setQuantity(String(product.quantity));
      setDescription(product.description);
    }
  }, []);

  const save = async () => {
    const payload = {
      id: product?.id,
      name,
      quantity: parseInt(quantity, 10) || 0,
      description
    };

    try {
      if (isEdit) {
        await ProductService.updateProduct(payload);
      } else {
        await ProductService.addProduct(payload);
      }
      navigation.goBack();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          label="Quantity"
          value={quantity}
          keyboardType="numeric"
          onChangeText={setQuantity}
          style={styles.input}
        />
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />

        <Button mode="contained" onPress={save} style={styles.saveButton}>
          {isEdit ? "Update" : "Create"}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { marginBottom: 12, backgroundColor: "white" },
  saveButton: { marginTop: 24 }
});
