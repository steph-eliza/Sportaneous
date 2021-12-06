import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "space-between",
    height: windowHeight / 15,
    borderColor: "red",
    borderWidth: 5,
    width: windowWidth,
    paddingHorizontal: windowWidth / 50,
  },
  headerText: {
    fontSize: 20,
    height: 20,
  },
  avatar: {
    borderRadius: 50,
    borderColor: "red",
    borderWidth: 2,
    height: windowHeight / 25,
    width: windowWidth / 10,
    padding: windowWidth / 20,
  },
});
