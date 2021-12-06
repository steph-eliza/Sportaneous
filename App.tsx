import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Header } from "./components/Header.view/Header.component";
import { storeData } from "./utils/config";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "red",
    borderWidth: 5,
  },
  bottomContainer: {
    flex: 0.95,
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.bottomContainer}>
        <Text>NBC Meetup</Text>
        <Button
          onPress={() => {
            storeData();
          }}
          title="Click Me"
          color="#841584"
        />
        <StatusBar style="auto" />
      </View>
    </View>
  );
}
