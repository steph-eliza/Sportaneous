import React, {useEffect, useState} from "react";
import {FlatList, SafeAreaView, Text, TouchableOpacity} from "react-native";
import styles from "./EventList.style";
import Filter from "./Filter.component";
import {getUsers, selectAllEvents} from "../../utils/utils";
import {makeNameIdReference, truncate} from "./utils/EventListUtils";

const EventList = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [userNames, setUserNames] = useState({});
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
      pending_attendee: {0: "dummy"},
      title: "dummy",
    },
  ]);

  useEffect(() => {
    selectAllEvents().then((res) => {
      setEvents(res);
      setIsLoading(false);
    });
    getUsers().then((res) => {
      setUserNames(makeNameIdReference(res));
    });
  }, []);

  const Item = ({item, onPress, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={[styles.user, textColor]}>{userNames[item.host_id]}</Text>
      <Text style={[styles.location, textColor]}>{item.location}</Text>
      <Text style={[styles.date, textColor]}>{item.date}</Text>
      <Text style={[styles.category, textColor]}>{item.category}</Text>
      <Text style={[styles.time, textColor]}>{item.time}</Text>
      <Text style={[styles.description, textColor]}>
        {truncate(item.description)}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    const color = item.id === selectedId ? "white" : "black";
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.chat_id);
          navigation.navigate("Event", {eventId: item.id});
        }}
        textColor={{color}}
      />
    );
  };

  if (isLoading) {
    return <Text>Loading events ...</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Filter setEvents={setEvents} />
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

export default EventList;
