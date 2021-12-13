import React from "react";
import {useEffect, useState} from "react";
import {Text, Pressable, View, TouchableOpacity, Button} from "react-native";
import Collapsible from "react-native-collapsible";
import {ScrollView} from "react-native-gesture-handler";
import {selectAllEvents, selectEventsByUser} from "../../utils/utils";
import {getTime, truncate} from "../Events.screen/utils/EventListUtils";
import {styles} from "./ProfileEvents.style";

export const MyHostedEvents = ({user_id, navigation}) => {
  console.log(navigation);
  const [isLoading, setIsLoading] = useState(true);
  const [hostedIsCollapsed, setHostedIsCollapsed] = useState(false);
  const [myHostedEvents, setMyHostedEvents] = useState([
    {
      title: "dummy",
      host_id: "dummy",
      location: "dummy",
      date: "dummy",
      category: "dummy",
      // time: ...
      description: "dummy",
    },
  ]);

  useEffect(() => {
    // (async () => {
    //   const myEventRes = selectAllEvents();
    //   console.log(myEventRes);
    // })();
    (async () => {
      const myEventRes = await selectEventsByUser(user_id);
      setMyHostedEvents(myEventRes);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <Text>Loading ...</Text>;
  }
  return (
    <View>
      <Pressable
        onPress={() => {
          setHostedIsCollapsed(hostedIsCollapsed === true ? false : true);
        }}
      >
        <Text style={styles.eventHeader}>My Hosted Events</Text>
      </Pressable>
      <ScrollView>
        <Collapsible collapsed={hostedIsCollapsed}>
          {myHostedEvents.map((myEvent) => {
            return (
              <View style={styles.container}>
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    navigation.navigate("Event", {eventId: myEvent.id});
                  }}
                >
                  <Text style={styles.title}>{myEvent.title}</Text>
                  <Text style={styles.user}>{myEvent.host_id}</Text>
                  <Text style={styles.location}>{myEvent.location}</Text>
                  <Text style={styles.date}>{myEvent.date}</Text>
                  <Text style={styles.category}>{myEvent.category}</Text>
                  <Text style={styles.time}>{getTime(myEvent.date)}</Text>
                  <Text style={styles.description}>
                    {truncate(myEvent.description)}
                  </Text>
                </TouchableOpacity>
                <Pressable
                  style={({pressed}) => [
                    {
                      backgroundColor: pressed
                        ? "rgba(30,280,280, 0.15)"
                        : "rgba(30,200,240, 0.25)",
                    },
                    styles.requestsButton,
                  ]}
                  onPress={() => {}}
                >
                  <Text style={styles.buttonTitle}>Pending Requests</Text>
                </Pressable>
                <Pressable
                  style={({pressed}) => [
                    {
                      backgroundColor: pressed
                        ? "rgba(255,150,20, 0.15)"
                        : "rgba(255,150,20, 0.25)",
                    },
                    styles.deleteButton,
                  ]}
                  onPress={() => {}}
                >
                  <Text style={styles.buttonTitle}>Delete Event</Text>
                </Pressable>
              </View>
            );
          })}
        </Collapsible>
      </ScrollView>
    </View>
  );
};

{
  // Object {
  //   "attendees": Array [
  //     "",
  //   ],
  //   "category": "ice skating",
  //   "date": "02/03/2021",
  //   "description": "Mature B-cell leukemia Burkitt-type not achieve remission",
  //   "host_id": "MqFbwzzuLbOhneGLtDs",
  //   "id": "MqFdV6-4eS7u0NojUhc",
  //   "location": "manchester",
  //   "max_capacity": 4,
  //   "pending_attendees": Array [
  //     "MqFbx-1VrkhVGHYYpLX",
  //     "MqFbx-3zbETE2gRo5pI",
  //   ],
  //   "title": "Ice skating fun",
  // },
}
