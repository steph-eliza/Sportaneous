import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { styles } from "./SingleEvent.style";
import { UserContext } from "../../contexts/UserContext";
import {
  getUserById,
  joinEvent,
  removeSelfFromEvent,
  selectEventById,
} from "../../utils/utils";

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
  const { currentUser } = useContext(UserContext);

  const [attendingStatus, setAttendingStatus] = React.useState(false);
  const [eventDetails, setEventDetails] = React.useState({
    attendees: [""],
    category: "Dummy",
    date: "Dummmy",
    description: "Dummmy",
    host_id: "Dummmy",
    location: "Dummmy",
    max_capacity: 4,
    pending_attendees: [""],
    title: "Dummmy",
    id: 123,
    time: "",
  });
  const [hostDetails, setHostDetails] = React.useState({
    first_name: "",
    last_name: "",
  });

  const checkAttendingStatus = (object: any) => {
    if (object.attendees.includes(currentUser.id)) {
      setAttendingStatus(true);
    }

    for (let i = 0; i < object.pending_attendees.length; i++) {
      if (object.pending_attendees[i].userId === currentUser) {
        setAttendingStatus(true);
      }
    }
  };

  React.useEffect(() => {
    selectEventById(eventId)
      .then((event: any) => {
        setEventDetails(event);
        checkAttendingStatus(event);
        return event;
      })
      .then((host) => {
        return getUserById(host.host_id);
      })
      .then((user) => {
        setHostDetails({
          first_name: user!.first_name,
          last_name: user!.last_name,
        });
      });
  }, [eventId]);

  const userDetailsForEvent = {
    first_name: currentUser.first_name,
    last_name: currentUser.last_name,
    userId: currentUser.id,
  };

  return (
    <>
      <View style={styles.view}>
        <Text style={styles.title}>{eventDetails.title}</Text>
        <Text style={styles.text}>Location: {eventDetails.location}</Text>
        <Text style={styles.text}>Category: {eventDetails.category}</Text>
        <Text style={styles.text}>Description: {eventDetails.description}</Text>
        <Text style={styles.text}>{`Time: ${eventDetails.time}`}</Text>
        <Text style={styles.text}>{`Date: ${eventDetails.date}`}</Text>
        <Text style={styles.text}>
          Places: {eventDetails.attendees.length}/{eventDetails.max_capacity}
        </Text>
        <Pressable
          style={styles.pressable}
          onPress={() => {
            if (!attendingStatus) {
              setAttendingStatus(true);
              joinEvent(userDetailsForEvent, eventId);
            } else {
              //leaveEvent api call
              setAttendingStatus(false);
              removeSelfFromEvent(userDetailsForEvent, eventId);
            }
          }}
        >
          <Text style={styles.PressableText}>
            {attendingStatus ? "Leave event?" : "Join event?"}
          </Text>
        </Pressable>
      </View>
      <View style={styles.view}>
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
