import {StyleSheet, Dimensions} from "react-native";

const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  page: {
    flex: 1,
  },

  title: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    marginVertical: 15,
  },

  detailsContainer: {
    width: windowWidth / 1.05,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  detailsField: {
    borderBottomWidth: 1,
    marginTop: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    textAlign: "left",
    width: windowWidth / 3,
    fontSize: 16,
  },
  detailsValue: {
    borderBottomWidth: 1,
    marginTop: 10,
    paddingBottom: 5,
    paddingRight: 10,
    textAlign: "right",
    width: windowWidth / 3,
    fontSize: 16,
  },

  editButton: {
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "#333",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    // backgroundColor: "rgba(120,50,240, 0.25)",
    padding: 5,
    width: windowWidth / 1.8,
    alignSelf: "center",
  },
  buttonTitle: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
