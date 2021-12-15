import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, Image } from "react-native";
import { selectAllEvents, getUsers } from "../../utils/utils";
import { makeNameIdReference } from "../Events.screen/utils/EventListUtils"
import styles from "./Chatroom.style";

const Chatroom = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);
  // Get all events
  // If attendees has users
  const [events, setEvents] = React.useState();
  const [userNames, setUserNames] = React.useState({})

  useEffect(() => {
    selectAllEvents().then((res) => {
      const filteredEvents = res.filter((event: any) => {
        return event.attendees.length > 0;
      });
      setEvents(filteredEvents);
      getUsers().then((res) => {
        setUserNames(makeNameIdReference(res));
      })
    });
  }, []);

  const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Image style={styles.image} source={require('./images/chat.png')} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{item.date} @ {item.time}</Text>
      <Text style={styles.host}>Hosted by: {userNames[item.host_id]}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          navigation.navigate("Chat", { chat_id: item.id });
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>discuss event details</Text>
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
