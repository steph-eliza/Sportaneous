import { View, Button, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { storeData } from "../../utils/config";
import { UserProvider } from "../../contexts/UserContext";

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

export const Reference = () => {
  return (
    <UserProvider>
      <View style={styles.container}>
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
    </UserProvider>
  );
};
