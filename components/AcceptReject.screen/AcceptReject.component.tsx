import { View, Text, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "./AcceptReject.style";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectEventById, selectAllEvents, removeAttendee, addAttendee } from "../../utils/utils";


export const AcceptReject = ({ route }) => {
//   const { event_id } = route.params;
    const event_id = "MqFdV6-4eS7u0NojUhc"
    const [selectedId, setSelectedId] = React.useState(null);
  const [pendingUsers, setPendingUsers] = React.useState([]);
  const [attendingUsers, setAttendingUsers] = React.useState([]);

  React.useEffect(() => {
    selectEventById(event_id).then((res) => {
      //console.log(res)
      if(res.pending_attendees.length > 0){
              let pendingUsersNoEmpties = res.pending_attendees.filter((user) => {
          return user !== ""
      })
      setPendingUsers(pendingUsersNoEmpties)
      console.log(pendingUsers, "This is Pending Users")
      }
  
      
      if(res.attendees.length > 0){
      let usersNoEmpties = res.attendees.filter((user) => {
        return user !== ""
    })
      setAttendingUsers(usersNoEmpties, "This is Pending Users")
}
    });
  }, [event_id]);

  const AttendeesItem = ({ item, backgroundColor, textColor }) => (
    <View style={[styles.item, backgroundColor]}>
      <Text style={styles.item}>{item.first_name}</Text>
      <Text style={styles.item}>{item.last_name}</Text>

      <Pressable
        style={styles.item}
        onPress={() => {
          removeAttendee(event_id ,{ userId: "1234", first_name: "Will", last_name: "test" })
          .then((res) => {
              console.log(res, "REMOVE ATTENDEE")
          })
          
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
          addAttendee(event_id ,{ userId: "1234", first_name: "Will", last_name: "test" })
          .then((res) => {
              console.log(res)
          })
          
        }}
      >
        <Text>Add Attendee</Text>
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

      <View>
        
      </View>
    </SafeAreaView>
  );
};
