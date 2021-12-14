import {Alert} from "react-native";
import {deleteEvent} from "../../utils/utils";

export const confirmDelete = (eventID) =>
  Alert.alert("Warning!", "Are you sure you want to delete this event?", [
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
