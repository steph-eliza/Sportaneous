import React from "react";
import {useEffect} from "react";
import {useState, useContext} from "react";
import {Text, Pressable, View, TouchableOpacity} from "react-native";
import {UserContext} from "../../contexts/UserContext";
import {getUsers, selectAllEvents} from "../../utils/utils";
import {
  makeNameIdReference,
  truncate,
} from "../Events.screen/utils/EventListUtils";
import {styles} from "./ProfileEvents.style";
import {confirmLeave} from "./ProfileUtils";

export const MyPendingRequests = ({user_id, navigation}) => {
  const {currentUser} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userNames, setUserNames] = useState({});
  const [pendingRequests, setPendingRequests] = useState([
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
      const allEventRes = await selectAllEvents();
      const myPending = allEventRes.filter((event) => {
        let attendingMatch = false;
        event.pending_attendees.forEach((person) => {
          if (person.userId === user_id) attendingMatch = true;
        });
        if (attendingMatch) return event;
      });
      if (myPending) {
        setPendingRequests(myPending);
      }
      setIsLoading(false);
      const nameUidReferenceObject = await getUsers();
      setUserNames(makeNameIdReference(nameUidReferenceObject));
    })();
  }, []);

  if (isLoading) {
    return <Text>Loading event requests ...</Text>;
  }
  if (pendingRequests.length < 1) {
    return (
      <Text style={styles.joinSubHeader}>
        You have no pending event requests.
      </Text>
    );
  }
  return (
    <View>
      <Text style={styles.joinSubHeader}>Pending Join Requests</Text>
      {pendingRequests.map((myEvent) => {
        return (
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                navigation.navigate("Event", {eventId: myEvent.id});
              }}
            >
              <Text style={styles.title}>{myEvent.title}</Text>
              <Text style={styles.user}>{userNames[myEvent.host_id]}</Text>
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
                    ? "rgba(255,150,20, 0.15)"
                    : "rgba(255,150,20, 0.25)",
                },
                styles.requestsButton,
              ]}
              onPress={() => {
                const userInfo = {
                  first_name: currentUser.first_name,
                  last_name: currentUser.last_name,
                  userId: currentUser.id,
                };
                confirmLeave(userInfo, myEvent.id);
              }}
            >
              <Text style={styles.buttonTitle}>Cancel Request</Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};
