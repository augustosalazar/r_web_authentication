import React, { useState, useContext } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { AppContext } from "../../context/AuthProvider";

export function Login(navigation) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useContext(AppContext);

  const handleLogin = () => {
    // Validate the form fields
    if (!email.trim()) {
      Alert.alert("Validation Error", "Email cannot be empty.");
      return;
    }
    if (!password.trim()) {
      Alert.alert("Validation Error", "Password cannot be empty.");
      return;
    }
    loginUser(email, password).catch(() => {
      Alert.alert("Login Error", "Invalid credentials");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.navigation.navigate("Signup")}
        style={styles.button}
      >
        Create an account
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24
  },
  input: {
    marginBottom: 16
  },
  button: {}
});
