import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import {Text, Pressable, View, TouchableOpacity} from "react-native";
import {selectAllEvents} from "../../utils/utils";
import {getTime, truncate} from "../Events.screen/utils/EventListUtils";
import {styles} from "./ProfileEvents.style";

export const MyAcceptedRequests = ({user_id}) => {
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
        return event.attendees.includes(user_id);
      });
      if (myAccepted) {
        setAcceptedRequests(myAccepted);
      } else {
        setAcceptedRequests("No joined events");
      }
      setIsLoading(false);
    })();
  }, [acceptedRequests]);

  if (isLoading) {
    return <Text>Loading joined events ...</Text>;
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
                // add functionality to accept / reject
                // navigate to AcceptReject component
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
