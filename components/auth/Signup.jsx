import React, { useState, useContext } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { AppContext } from "../../context/AuthProvider";

export function Signup(navigation) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signupUser } = useContext(AppContext);

  const handleSignup = async () => {
    if (!email.trim()) {
      Alert.alert("Validation Error", "Email cannot be empty.");
      return;
    }
    if (!password.trim()) {
      Alert.alert("Validation Error", "Password cannot be empty.");
      return;
    }
    if (!confirmPassword.trim()) {
      Alert.alert("Validation Error", "Confirm Password cannot be empty.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match.");
      return;
    }

    try {
      await signupUser(email, password);
      navigation.navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Signup Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSignup} style={styles.button}>
        Signup
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
