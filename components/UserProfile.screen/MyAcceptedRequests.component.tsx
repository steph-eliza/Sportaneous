import React from "react";
import {useEffect} from "react";
import {useState, useContext} from "react";
import {Text, Pressable, View, TouchableOpacity} from "react-native";
import {UserContext} from "../../contexts/UserContext";
import {selectAllEvents} from "../../utils/utils";
import {getTime, truncate} from "../Events.screen/utils/EventListUtils";
import {styles} from "./ProfileEvents.style";
import {confirmLeave} from "./ProfileUtils";

export const MyAcceptedRequests = ({user_id}) => {
  const {currentUser} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [acceptedRequests, setAcceptedRequests] = useState([
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
    (async () => {
      const allEventRes = await selectAllEvents();
      const myAccepted = allEventRes.filter((event) => {
        let attendingMatch = false;
        event.attendees.forEach((person) => {
          if (person.userId === user_id) attendingMatch = true;
        });
        if (attendingMatch) return event;
      });
      if (myAccepted) {
        setAcceptedRequests(myAccepted);
      }
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <Text>Loading joined events ...</Text>;
  }
  if (acceptedRequests.length < 1) {
    return (
      <Text style={styles.joinSubHeader}>
        You have no accepted event requests.
      </Text>
    );
  }
  return (
    <View>
      <Text style={styles.joinSubHeader}>Accepted Join Requests</Text>
      {acceptedRequests.map((myEvent) => {
        return (
          <View style={styles.container}>
            <TouchableOpacity style={styles.item}>
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
                    ? "rgba(255,150,20, 0.15)"
                    : "rgba(255,150,20, 0.25)",
                },
                styles.requestsButton,
              ]}
              onPress={() => {
                // add functionality leave event
                // patch event details, remove self from attendees
                const userInfo = {
                  first_name: currentUser.first_name,
                  last_name: currentUser.last_name,
                  userId: currentUser.id,
                };
                confirmLeave(userInfo, myEvent.id);
              }}
            >
              <Text style={styles.buttonTitle}>Leave Event</Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};
