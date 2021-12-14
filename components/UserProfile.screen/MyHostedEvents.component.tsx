import React from "react";
import {useEffect, useState} from "react";
import {Text, Pressable, View, TouchableOpacity, Alert} from "react-native";
import Collapsible from "react-native-collapsible";
import {ScrollView} from "react-native-gesture-handler";
import {selectEventsByUser} from "../../utils/utils";
import {truncate} from "../Events.screen/utils/EventListUtils";
import {styles} from "./ProfileEvents.style";
import {confirmDelete, getOwnName} from "./ProfileUtils";

export const MyHostedEvents = ({user_id, navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hostedIsCollapsed, setHostedIsCollapsed] = useState(false);
  const [myName, setMyName] = useState("");
  const [myHostedEvents, setMyHostedEvents] = useState([
    {
      title: "dummy",
      host_id: "dummy",
      location: "dummy",
      date: "dummy",
      category: "dummy",
      time: "dummy",
      description: "dummy",
    },
  ]);

  useEffect(() => {
    (async () => {
      const myEventRes = await selectEventsByUser(user_id);
      setMyHostedEvents(myEventRes);
      setIsLoading(false);
      setMyName(await getOwnName(user_id));
    })();
  }, []);

  if (isLoading) {
    return <Text>Loading hosted events ...</Text>;
  }
  if (myHostedEvents.length < 1) {
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
            <Text style={styles.joinSubHeader}>
              You have not hosted any events.
            </Text>
          </Collapsible>
        </ScrollView>
      </View>
    );
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
                  <Text style={styles.user}>{myName}</Text>
                  <Text style={styles.location}>{myEvent.location}</Text>
                  <Text style={styles.date}>{myEvent.date}</Text>
                  <Text style={styles.category}>{myEvent.category}</Text>
                  <Text style={styles.time}>{myEvent.time}</Text>
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
                  onPress={() => {
                    navigation.navigate("AcceptReject", {eventId: myEvent.id,eventTitle : myEvent.title});
                  }}
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
                  onPress={() => {
                    confirmDelete(myEvent.id);
                  }}
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
