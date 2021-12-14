import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { styles } from "./SingleEvent.style";
import { UserContext } from "../../contexts/UserContext";
import {
  deleteChatroom,
  deleteEvent,
  getUserById,
  joinEvent,
  removeSelfFromEvent,
} from "../../utils/utils";
import { checkAcceptedOrRequested } from "./singleEvent.utils";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firestoreConfig";

type navigationWithEventId = {
  eventId: string;
};

type AddEventProps = {
  navigation: {
    navigate: (component: string, event_id?: navigationWithEventId) => {};
  };
  route: {
    params: { eventId: string };
  };
};

export const SingleEvent = ({ navigation, route }: AddEventProps) => {
  let { eventId } = route.params;
  const { currentUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = React.useState(true);
  const [eventDetails, setEventDetails] = React.useState({
    attendees: [],
    category: "Dummy",
    date: "Dummmy",
    description: "Dummmy",
    host_id: "Dummmy",
    location: "Dummmy",
    max_capacity: 4,
    pending_attendees: [],
    title: "Dummmy",
    id: 123,
    time: "",
  });

  const [hostDetails, setHostDetails] = React.useState({
    first_name: "",
    last_name: "",
  });

  let acceptedOrRequested: boolean = checkAcceptedOrRequested(
    eventDetails,
    currentUser
  );

  React.useEffect(() => {
    setIsLoading(true);
    const unsub = onSnapshot(doc(db, "events", eventId), (doc) => {
      if (doc.exists()) {
        setEventDetails(doc.data());
      } else {
        setEventDetails({
          attendees: [],
          category: "Dummy",
          date: "Dummmy",
          description: "Dummmy",
          host_id: "Dummmy",
          location: "Dummmy",
          max_capacity: 4,
          pending_attendees: [],
          title: "Dummmy",
          id: 123,
          time: "",
        });
      }

      setIsLoading(false);
      setIsLoading(true);
    });
    return unsub;
  }, [eventId]);

  React.useEffect(() => {
    getUserById(eventDetails.host_id).then((user) => {
      if (user !== undefined) {
        setHostDetails({
          first_name: user.first_name,
          last_name: user.last_name,
        });
      }
    });
  }, [eventDetails]);

  const userDetailsForEvent = {
    first_name: currentUser.first_name,
    last_name: currentUser.last_name,
    userId: currentUser.id,
  };
  if (isLoading) {
    return (
      <View style={styles.view}>
        <Text>Loading</Text>
      </View>
    );
  } else if (eventDetails.host_id === currentUser.id) {
    return (
      <View style={styles.view}>
        <Text style={styles.title}>{eventDetails.title}</Text>
        <Text style={styles.text}>Location: {eventDetails.location}</Text>
        <Text style={styles.text}>Category: {eventDetails.category}</Text>
        <Text style={styles.text}>Description: {eventDetails.description}</Text>
        <Text style={styles.text}>Time: {eventDetails.time}</Text>
        <Text style={styles.text}>Date: {eventDetails.date}</Text>
        <Text style={styles.text}>
          Places: {eventDetails.attendees.length}/{eventDetails.max_capacity}
        </Text>
        <Pressable
          style={styles.pressable}
          onPress={() => {
            navigation.navigate("AcceptReject", { eventId: eventId });
          }}
        >
          <Text style={styles.PressableText}>Review attendees</Text>
        </Pressable>
        <Pressable
          style={styles.pressable}
          onPress={() => {
            try {
              deleteEvent(eventId)
                .then(() => {
                  deleteChatroom(eventId);
                })
                .then(() => {
                  navigation.navigate("Events");
                });
            } catch (error) {
              console.log(error);
              alert(
                "Unable to delete event at this time, please try again later"
              );
            }
          }}
        >
          <Text style={styles.PressableText}>Delete event?</Text>
        </Pressable>
      </View>
    );
  } else
    return (
      <>
        <View style={styles.view}>
          <Text style={styles.title}>{eventDetails.title}</Text>
          <Text style={styles.text}>Location: {eventDetails.location}</Text>
          <Text style={styles.text}>Category: {eventDetails.category}</Text>
          <Text style={styles.text}>
            Description: {eventDetails.description}
          </Text>
          <Text style={styles.text}>{`Time: ${eventDetails.time}`}</Text>
          <Text style={styles.text}>{`Date: ${eventDetails.date}`}</Text>
          <Text style={styles.text}>
            Places: {eventDetails.attendees.length}/{eventDetails.max_capacity}
          </Text>
          <Pressable
            style={styles.pressable}
            onPress={() => {
              if (!acceptedOrRequested) {
                joinEvent(userDetailsForEvent, eventId);
              } else {
                removeSelfFromEvent(userDetailsForEvent, eventId);
              }
            }}
          >
            <Text style={styles.PressableText}>
              {acceptedOrRequested ? "Leave event?" : "Join event?"}
            </Text>
          </Pressable>
          <Text style={styles.text}>Event host:</Text>
          <Text
            style={styles.text}
          >{`${hostDetails.first_name} ${hostDetails.last_name}`}</Text>

          <Pressable
            onPress={() => {
              navigation.navigate("Events");
            }}
            style={styles.pressable}
          >
            <Text style={styles.PressableText}>Go back to events</Text>
          </Pressable>
        </View>
      </>
    );
};
