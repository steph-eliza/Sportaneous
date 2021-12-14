import { View, Text, Pressable } from "react-native";
import { styles } from "./AcceptReject.style";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  selectEventById,
  selectAllEvents,
  removeAttendee,
  addAttendee,
} from "../../utils/utils";
import React from "react";

export const AcceptReject = ({ route }) => {
  //   const { event_id } = route.params;

  //TEMP HARDCODING REMOVE ME
  const event_id = "MqFdV61nNp5BqUqDNqU";
  const [selectedId, setSelectedId] = React.useState(null);
  const [pendingUsers, setPendingUsers] = React.useState([]);
  const [attendingUsers, setAttendingUsers] = React.useState([]);
  const [reloadTrigger, setReloadTrigger] = React.useState(0);

  React.useEffect(() => {
    selectEventById(event_id).then((res) => {
      console.log(res);
      if (res.pending_attendees.length > 0) {
        let pendingUsersNoEmpties = res.pending_attendees.filter((user) => {
          return user !== "";
        });
        setPendingUsers(pendingUsersNoEmpties);
        console.log(pendingUsers, "This is Pending Users");
      } else {
        // setPendingUsers([{ first_name: "", last_name: "", userId: "" }])
        setPendingUsers([]);
      }

      if (res.attendees.length > 0) {
        let usersNoEmpties = res.attendees.filter((user) => {
          return user !== "";
        });
        setAttendingUsers(usersNoEmpties, "This is Pending Users");
      } else {
        // setAttendingUsers([{ first_name: "", last_name: "", userId: "" }])
        setAttendingUsers([]);
      }
    });
  }, [event_id, reloadTrigger]);

  const AttendeesItem = ({ item, backgroundColor, textColor }) => (
    <View style={[styles.item, backgroundColor]}>
      <Text style={styles.item}>{item.first_name}</Text>
      <Text style={styles.item}>{item.last_name}</Text>

      <Pressable
        style={styles.item}
        onPress={() => {
          // ADD NAVIGATION TO USER PROFILE HERE
        }}
      >
        <Text>Press here to go to user profile!</Text>
      </Pressable>
      <Pressable
        style={styles.item}
        onPress={() => {
          removeAttendee(event_id, {
            userId: item.userId,
            first_name: item.first_name,
            last_name: item.last_name,
          }).then((res) => {
            console.log(res, "REMOVE ATTENDEE");
            setReloadTrigger((prevState) => {
              return prevState + 1;
            });
          });
        }}
      >
        <Text>Remove Attendee</Text>
      </Pressable>
    </View>
  );

  const PendingAttendeesItem = ({ item, backgroundColor, textColor }) => (
    <View style={[styles.item, backgroundColor]}>
      <Text style={styles.item}>{item.first_name}</Text>
      <Text style={styles.item}>{item.last_name}</Text>

      <Pressable
        style={styles.item}
        onPress={() => {
          // ADD NAVIGATION TO USER PROFILE HERE
        }}
      >
        <Text>Press here to see user profile</Text>
      </Pressable>
      <Pressable
        style={styles.item}
        onPress={() => {
          addAttendee(event_id, {
            userId: item.userId,
            first_name: item.first_name,
            last_name: item.last_name,
          }).then((res) => {
            console.log({ res });
            setReloadTrigger((prevState) => {
              return prevState + 1;
            });
          });
        }}
      >
        <Text>Add attendee to Event!</Text>
      </Pressable>
    </View>
  );

  const renderPendingItem = ({ item }) => {
    const backgroundColor =
      item.id === selectedId ? "#6E3B6E" : "rgba(10,80,160, 0.1)";
    const color = item.id === selectedId ? "white" : "black";
    return (
      <PendingAttendeesItem
        item={item}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  const renderAttendingItem = ({ item }) => {
    const backgroundColor =
      item.id === selectedId ? "#6E3B6E" : "rgba(10,80,160, 0.1)";
    const color = item.id === selectedId ? "white" : "black";
    return (
      <AttendeesItem
        item={item}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  if (pendingUsers.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={attendingUsers}
          renderItem={renderAttendingItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={pendingUsers}
          renderItem={renderPendingItem}
          keyExtractor={(item) => item.id}
        />
        <FlatList
          data={attendingUsers}
          renderItem={renderAttendingItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }
};
