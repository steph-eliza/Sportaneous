import {Alert} from "react-native";
import {deleteEvent, getUserById, removeSelfFromEvent} from "../../utils/utils";

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

export const getOwnName = async (user_id) => {
  const myName = await getUserById(user_id);
  console.log(myName);
  return `${myName.first_name} ${myName.last_name}`;
};

export const confirmLeave = (userInfo, eventID) =>
  Alert.alert("Warning!", "Are you sure you want to leave this event?", [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    {
      text: "OK",
      onPress: () => {
        removeSelfFromEvent(userInfo, eventID);
      },
    },
  ]);
