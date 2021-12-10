import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity } from "react-native";
import styles from "./EventList.style";
import Filter from "./Filter.component";
import { selectAllEvents } from "../../utils/utils";
import { truncate, getDate, getTime } from "./utils/EventListUtils";
import { SingleEvent } from "../SingleEvent.screen/SingleEvent.component";

const EventList = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [events, setEvents] = React.useState([
    {
      attendees: "dummy",
      category: "dummy",
      chat_id: "dummy",
      date: "dummy",
      description: "dummy",
      host_id: 0,
      location: "dummy",
      max_capacity: "dummy",
      pending_attendee: { 0: "dummy" },
      title: "dummy",
    },
  ]);
  useEffect(() => {
    selectAllEvents().then((res) => {
      setEvents(res);
    });
  }, []);
  console.log(events);

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={[styles.user, textColor]}>{`User: ${item.host_id}`}</Text>
      <Text style={[styles.location, textColor]}>{item.location}</Text>
      <Text style={[styles.date, textColor]}>{getDate(item.date)}</Text>
      <Text style={[styles.category, textColor]}>{item.category}</Text>
      <Text style={[styles.time, textColor]}>{getTime(item.date)}</Text>
      <Text style={[styles.description, textColor]}>
        {truncate(item.description)}
      </Text>
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
          setSelectedId(item.chat_id);
          navigation.navigate("Event", { eventId: item.id });
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Filter setEvents={setEvents} />
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.chat_id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

export default EventList;
