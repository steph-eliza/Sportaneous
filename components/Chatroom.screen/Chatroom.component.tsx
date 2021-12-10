import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { selectAllEvents } from "../../utils/utils";
import styles from "./Chatroom.style";

const Chatroom = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);
  // Get all events
  // If attendees has users
  const [events, setEvents] = React.useState();
  useEffect(() => {
    selectAllEvents().then((res) => {
      const filteredEvents = res.filter((event: any) => {
        return event.attendees.length > 0;
      });
      setEvents(filteredEvents);
    });
  }, []);

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={[styles.user, textColor]}>{`User: ${item.host_id}`}</Text>
      <Text style={[styles.date, textColor]}>{`Date: ${item.date}`}</Text>
      <Text style={[styles.time, textColor]}>{`Time: ${item.time}`}</Text>
      <Text
        style={[styles.time, textColor]}
      >{`Capacity: ${item.attendees.length}/${item.max_capacity}`}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor =
      item.id === selectedId ? "#6E3B6E" : "rgba(10,80,160, 0.1)";
    const color = item.id === selectedId ? "white" : "black";
    return (
      <Item
        item={item}
        onPress={() => {
          navigation.navigate("Chat", { chat_id: item.id });
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
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
