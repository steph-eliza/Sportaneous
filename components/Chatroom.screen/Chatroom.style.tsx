import {StyleSheet, Dimensions} from "react-native";

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    backgroundColor: "rgba(100,50,190, 0.08)",
    padding: 10,
    marginTop: 10,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderColor: "#333",
    borderWidth: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
    width: windowWidth / 3,
    textAlign: "left",
    paddingBottom: 5,
  },
  location: {
    textAlign: "left",
    fontSize: 18,
    textTransform: "capitalize",
    width: windowWidth / 3,
  },
  date: {
    textAlign: "right",
    fontSize: 18,
    textTransform: "capitalize",
    width: windowWidth / 2,
  },
  time: {textAlign: "right", fontSize: 18, width: windowWidth / 2},
  user: {textAlign: "right", fontSize: 18, width: windowWidth / 3},
  description: {
    fontSize: 16,
    width: windowWidth,
    marginTop: 5,
    marginLeft: 15,
  },
  category: {
    textAlign: "left",
    fontSize: 18,
    textTransform: "capitalize",
    width: windowWidth / 3,
  },
});

export default styles;
