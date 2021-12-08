import React, {useState} from "react";
import {FlatList, SafeAreaView, Text, TouchableOpacity} from "react-native";
import styles from "./EventList.style";
import Filter from "./Filter.component";

const EventList = ({navigation}) => {
  const [events, setEvents] = React.useState([
    {
      attendees: "User Id 1",
      category: "climbing",
      chat_id: "Chat Id 1",
      date: "December 14, 2021 at 9:00:00 AM UTC",
      description: "I'm a really long description of the event",
      host_id: 1,
      location: "manchester",
      max_capacity: "2",
      pending_attendee: {0: "User Id 2", 1: "User Id 3"},
      title: "Climbing title",
    },
    {
      attendees: "User Id 2",
      category: "running",
      chat_id: "Chat Id 2",
      date: "December 14, 2021 at 9:00:00 AM UTC",
      description: "I'm a really long description of the event",
      host_id: 2,
      location: "manchester",
      max_capacity: "3",
      pending_attendee: {0: "User Id 4", 1: "User Id 5"},
      title: "running title",
    },
    {
      attendees: "User Id 3",
      category: "swimming",
      chat_id: "Chat Id 3",
      date: "December 14, 2021 at 9:00:00 AM UTC",
      description: "I'm a really long description of the event",
      host_id: 3,
      location: "liverpool",
      max_capacity: "2",
      pending_attendee: {0: "User Id 6", 1: "User Id 7"},
      title: "other title",
    },
    {
      attendees: "User Id 1",
      category: "climbing",
      chat_id: "Chat Id ",
      date: "December 14, 2021 at 9:00:00 AM UTC",
      description: "I'm a really long description of the event",
      host_id: 1,
      location: "manchester",
      max_capacity: "2",
      pending_attendee: {0: "User Id 2", 1: "User Id 3"},
      title: "Climbing title",
    },
    {
      attendees: "User Id 2",
      category: "running",
      chat_id: "Chat Id 5",
      date: "December 14, 2021 at 9:00:00 AM UTC",
      description: "I'm a really long description of the event",
      host_id: 2,
      location: "manchester",
      max_capacity: "3",
      pending_attendee: {0: "User Id 4", 1: "User Id 5"},
      title: "running title",
    },
    {
      attendees: "User Id 3",
      category: "swimming",
      chat_id: "Chat Id 6",
      date: "December 14, 2021 at 9:00:00 AM UTC",
      description: "I'm a really long description of the event",
      host_id: 3,
      location: "liverpool",
      max_capacity: "2",
      pending_attendee: {0: "User Id 6", 1: "User Id 7"},
      title: "other title",
    },
    {
      attendees: "User Id 1",
      category: "climbing",
      chat_id: "Chat Id 7",
      date: "December 14, 2021 at 9:00:00 AM UTC",
      description: "I'm a really long description of the event",
      host_id: 1,
      location: "manchester",
      max_capacity: "2",
      pending_attendee: {0: "User Id 2", 1: "User Id 3"},
      title: "Climbing title",
    },
    {
      attendees: "User Id 2",
      category: "running",
      chat_id: "Chat Id 8",
      date: "December 14, 2021 at 9:00:00 AM UTC",
      description: "I'm a really long description of the event",
      host_id: 2,
      location: "manchester",
      max_capacity: "3",
      pending_attendee: {0: "User Id 4", 1: "User Id 5"},
      title: "running title",
    },
    {
      attendees: "User Id 3",
      category: "swimming",
      chat_id: "Chat Id 9",
      date: "December 14, 2021 at 9:00:00 AM UTC",
      description: "I'm a really long description of the event",
      host_id: 3,
      location: "liverpool",
      max_capacity: "2",
      pending_attendee: {0: "User Id 6", 1: "User Id 7"},
      title: "other title",
    },
    {
      attendees: "User Id 1",
      category: "climbing",
      chat_id: "Chat Id 10",
      date: "December 14, 2021 at 9:00:00 AM UTC",
      description: "I'm a really long description of the event",
      host_id: 1,
      location: "manchester",
      max_capacity: "2",
      pending_attendee: {0: "User Id 2", 1: "User Id 3"},
      title: "Climbing title",
    },
    {
      attendees: "User Id 2",
      category: "running",
      chat_id: "Chat Id 11",
      date: "December 14, 2021 at 9:00:00 AM UTC",
      description: "I'm a really long description of the event",
      host_id: 2,
      location: "manchester",
      max_capacity: "3",
      pending_attendee: {0: "User Id 4", 1: "User Id 5"},
      title: "running title",
    },
    {
      attendees: "User Id 3",
      category: "swimming",
      chat_id: "Chat Id 12",
      date: "December 14, 2021 at 9:00:00 AM UTC",
      description: "I'm a really long description of the event",
      host_id: 3,
      location: "liverpool",
      max_capacity: "2",
      pending_attendee: {0: "User Id 6", 1: "User Id 7"},
      title: "other title",
    },
  ]);

  // Set events from api call to events data
  // setEvents();
  // Utils Function for truncating a string and appending ...
  function truncate(string: string) {
    if (string.length > 40) {
      string = `${string.substring(0, 40)}...`;
      return string;
    }
  }

  // Function to format the date and time for now.
  // This will be done properly later. Just used currently for layout purposes.
  function getDate(string: string) {
    if (string.length > 17) {
      string = string.substring(0, 17);
      return string;
    }
  }

  function getTime(string: string) {
    return string.substring(21, 31);
  }

  const Item = ({item, onPress, backgroundColor, textColor}) => (
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

  const [selectedId, setSelectedId] = useState(null);
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
        }}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Filter />
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
