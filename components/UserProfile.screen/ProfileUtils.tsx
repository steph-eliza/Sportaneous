import {Alert} from "react-native";
import {deleteEvent} from "../../utils/utils";

export const confirmDelete = (eventID) =>
  Alert.alert("woah hold up", "u sure bro", [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    {
      text: "OK",
      onPress: () => {
        deleteEvent(eventID);
      },
    },
  ]);
