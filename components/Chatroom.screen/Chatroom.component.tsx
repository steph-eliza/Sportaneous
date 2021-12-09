import React, {useEffect, useState} from "react";
import {FlatList, SafeAreaView, Text, TouchableOpacity} from "react-native";
import {selectAllEvents} from "../../utils/utils";
import styles from "./Chatroom.style";

const Chatroom = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);
// Get all events
// If attendees has users 
//   const [events, setEvents] = React.useState();
//   useEffect(() => {
//     selectAllEvents().then((res) => {
//         const filteredEvents = res.filter((event) => {
//             return event.attendees.length > 0
//         })
//      setEvents(filteredEvents)
//     });
//   }, []);

  const events = [{
    "title": "Running",
    "category": "running",
    "location": "manchester",
    "date": "15/12/2021",
    "time": "09:00",
    "description": "Explosion and rupture of pressurized-gas tank, init encntr",
    "max_capacity": 5,
    "pending_attendees": [""],
    "host_id" : "MqFbwzzuLbOhneGLtDs",
    "attendees": ["MqFbx--rZQ1MsDKnDxB"]
  },
  {
    "title": "tennis",
    "category": "tennis",
    "location": "manchester",
    "date": "03/04/2021",
    "time": "09:00",
    "description": "Effusion, left hip",
    "max_capacity": 5,
    "pending_attendees": ["MqFbx-4SAgvThoRMbjN"],
    "host_id" : "MqFbx--rZQ1MsDKnDxB",
    "attendees": ["MqFbwzzuLbOhneGLtDs"]
  },
  {
    "title": "mountain lovers",
    "category": "climbing",
    "location": "london",
    "date": "06/10/2021",
    "time": "17:00",
    "description": "Mtrcy rider (driver) injured in oth transport acc, sequela",
    "max_capacity": 1,
    "pending_attendees": ["MqFbx-1VrkhVGHYYpLX"],
    "host_id" : "MqFbx-3zbETE2gRo5pI",
    "attendees": ["MqFbwzzuLbOhneGLtDs"]
  }]

  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={[styles.user, textColor]}>{`User: ${item.host_id}`}</Text>
      <Text style={[styles.date, textColor]}>{`Date: ${item.date}`}</Text>
      <Text style={[styles.time, textColor]}>{`Time: ${item.time}`}</Text>
      <Text style={[styles.time, textColor]}>{`Capacity: ${item.attendees.length}/${item.max_capacity}`}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    const backgroundColor =
      item.id === selectedId ? "#6E3B6E" : "rgba(10,80,160, 0.1)";
    const color = item.id === selectedId ? "white" : "black";
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.chat_id);
          // For navigating to a single event screen when implemented
          // navigation.navigate("Home", {item.event_id});
          // navigation.navigate(SingleEvent, item.id);
        }}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

export default Chatroom;
