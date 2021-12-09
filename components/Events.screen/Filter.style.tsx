import {Dimensions, StyleSheet} from "react-native";

const windowWidth = Dimensions.get("window").width;

export const theme = {};

export const styles = StyleSheet.create({
  collapse: {
    borderWidth: 2,
    borderColor: "rgba(20,60,40, 0.05)",
    borderRadius: 10,
    backgroundColor: "rgba(10,80,160, 0.05)",
  },
  title: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  filterButton: {
    borderWidth: 2,
    borderColor: "#333",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    // backgroundColor: "rgba(120,50,240, 0.25)",
    padding: 8,
    width: windowWidth / 1.085,
    alignSelf: "center",
  },
  lowerButtonContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },
  lowerButtonClear: {
    borderWidth: 2,
    borderColor: "#333",
    borderBottomLeftRadius: 10,
    // backgroundColor: "rgba(120,50,240, 0.25)",
    padding: 8,
    marginRight: 5,
    marginTop: 10,
    width: windowWidth / 2.25,
  },
  lowerButtonApply: {
    borderWidth: 2,
    borderColor: "#333",
    borderBottomRightRadius: 10,
    // backgroundColor: "rgba(120,50,240, 0.25)",
    padding: 8,
    marginLeft: 5,
    marginTop: 10,
    width: windowWidth / 2.25,
  },
  buttonTitle: {
    textAlign: "center",
    fontWeight: "bold",
  },
  checkBoxContainer: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  checkBox: {
    backgroundColor: "rgba(100,50,190, 0.08)",
    width: windowWidth / 2.75,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 5,
    paddingLeft: 9,
    paddingTop: 7,
    padding: 5,
    margin: 3,
  },
  checkBoxText: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
