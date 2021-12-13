import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import {Text, Pressable, View, TouchableOpacity} from "react-native";
import {selectAllEvents} from "../../utils/utils";
import {getTime, truncate} from "../Events.screen/utils/EventListUtils";
import {styles} from "./ProfileEvents.style";

export const MyPendingRequests = ({user_id}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pendingRequests, setPendingRequests] = useState([
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
      const myPending = allEventRes.filter((event) => {
        return event.pending_attendees.includes(user_id);
      });
      if (myPending) {
        setPendingRequests(myPending);
      } else {
        setPendingRequests("No joined events");
      }
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <Text>Loading event requests ...</Text>;
  }
  return (
    <View>
      <Text style={styles.joinSubHeader}>Pending Join Requests</Text>
      {pendingRequests.map((myEvent) => {
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
                // add functionality to remove yourself from pending_members
                // patch request by event
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
