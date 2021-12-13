import { View, Text, Pressable } from "react-native";
import React, { Component } from "react";
import { styles } from "./SingleEvent.style";
import { joinEvent, selectEventById } from "../../utils/utils";

type AddEventProps = {
  navigation: {
    navigate: (component: string) => {};
  };
  route: {
    params: { eventId: string };
  };
};

export const SingleEvent = ({ navigation, route }: AddEventProps) => {
  const { eventId } = route.params;
  const user = { userId: "1234", first_name: "Will", second_name: "test" };

  const [isLoading, setIsLoading] = React.useState(true);
  //Dummy object to shut up TS.
  const [eventDetails, setEventDetails] = React.useState({
    attendees: [""],
    category: "Dummy",
    date: "Dummmy",
    description: "Dummmy",
    host_id: "Dummmy",
    location: "Dummmy",
    max_capacity: 4,
    pending_attendees: [],
    title: "Dummmy",
    id: 123,
  });
  React.useEffect(() => {
    setIsLoading(true);
    selectEventById(eventId).then((res: any) => {
      setEventDetails(res);
      setIsLoading(false);
    });
  }, [eventId]);

  if (isLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  } else {
    return (
      <>
        <View style={styles.view}>
          <Text style={styles.title}>{eventDetails.title}</Text>
          <Text style={styles.text}>Location: {eventDetails.location}</Text>
          <Text style={styles.text}>Category: {eventDetails.category}</Text>
          <Text style={styles.text}>
            Description: {eventDetails.description}
          </Text>
          <Text style={styles.text}>Date: {eventDetails.date}</Text>
          <Text style={styles.text}>
            Places: {eventDetails.attendees.length}/{eventDetails.max_capacity}
          </Text>
          <Pressable
            style={styles.pressable}
            onPress={() => {
              joinEvent(user, eventId);
            }}
          >
            <Text style={styles.PressableText}>Join this event?</Text>
          </Pressable>
        </View>
        <View style={styles.view}>
          <Text style={styles.text}>About the host:</Text>
          <Pressable
            onPress={() => {
              //Navigate back to EventsList when added to repo
              navigation.navigate("Events");
            }}
            style={styles.pressable}
          >
            <Text style={styles.PressableText}>Go back to events</Text>
          </Pressable>
        </View>
      </>
    );
  }
};
