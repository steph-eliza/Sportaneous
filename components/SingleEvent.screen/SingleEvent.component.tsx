import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { styles } from "./SingleEvent.style";
import { UserContext } from "../../contexts/UserContext";
import { getUserById, joinEvent, removeSelfFromEvent } from "../../utils/utils";
import {
  checkAcceptedOrRequested,
  deleteEventAndCascade,
  addEventProps,
  hostDetails,
  eventDetails,
} from "./singleEvent.utils";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firestoreConfig";
import { EventInfo } from "./subcomponents/EventInfo/EventInfo.component";
import { HostInfo } from "./subcomponents/HostInfo/HostInfo.component";

export const SingleEvent = ({ navigation, route }: addEventProps) => {
  let { eventId } = route!.params;
  const { currentUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [eventDetails, setEventDetails] = React.useState<eventDetails>({
    attendees: [],
    category: "Dummy",
    date: "Dummmy",
    description: "Dummmy",
    host_id: "Dummmy",
    location: "Dummmy",
    max_capacity: "4",
    pending_attendees: [],
    title: "Dummmy",
    time: "",
  });

  const [hostDetails, setHostDetails] = React.useState<hostDetails>({
    first_name: "",
    last_name: "",
    description: "",
    image_bitmap: "",
  });

  let acceptedOrRequested: boolean = checkAcceptedOrRequested(
    eventDetails,
    currentUser
  );

  React.useEffect(() => {
    setIsLoading(true);
    const unsub = onSnapshot(doc(db, "events", eventId), (doc: any) => {
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
          max_capacity: "",
          pending_attendees: [],
          title: "Dummmy",
          time: "",
        });
      }
    });
  }, [eventId]);

  React.useEffect(() => {
    getUserById(eventDetails.host_id).then((user) => {
      if (user !== undefined) {
        setHostDetails({
          first_name: user.first_name,
          last_name: user.last_name,
          description: user.description,
          image_bitmap: user.image_bitmap,
        });
      }

      setIsLoading(false);
    });
  }, [eventDetails]);

  const userDetailsForEvent = {
    first_name: currentUser.first_name,
    last_name: currentUser.last_name,
    userId: currentUser.id,
  };

  function checkCapacity(attending: boolean, eventDetails: any) {
    if (
      eventDetails.attendees.length >= parseInt(eventDetails.max_capacity) &&
      attending === false
    ) {
      return true;
    }
    return false;
  }
  function joinButtonText() {
    if (checkCapacity(acceptedOrRequested, eventDetails)) {
      return "Event full";
    } else if (acceptedOrRequested) {
      return "Leave event?";
    }
    return "Request to join event?";
  }

  if (isLoading) {
    return <View style={styles.view}></View>;
  } else if (eventDetails.host_id === currentUser.id) {
    return (
      <View style={styles.container}>
        <EventInfo eventDetails={eventDetails} />
        <Pressable
          style={styles.pressable}
          onPress={() => {
            deleteEventAndCascade(eventId, { navigation });
          }}
        >
          <Text style={styles.PressableText}>Delete event?</Text>
        </Pressable>
        <Pressable
          style={styles.pressable}
          onPress={() => {
            navigation!.navigate("AcceptReject", { eventId: eventId });
          }}
        >
          <Text style={styles.PressableText}>Review attendees</Text>
        </Pressable>
      </View>
    );
  } else
    return (
      <View style={styles.container}>
        <EventInfo eventDetails={eventDetails} />
        <Pressable
          disabled={checkCapacity(acceptedOrRequested, eventDetails)}
          style={styles.pressable}
          onPress={() => {
            if (!acceptedOrRequested) {
              joinEvent(userDetailsForEvent, eventId);
            } else {
              removeSelfFromEvent(userDetailsForEvent, eventId);
            }
          }}
        >
          <Text style={styles.PressableText}>{joinButtonText()}</Text>
        </Pressable>

        <HostInfo hostDetails={hostDetails} />
        <Pressable
          onPress={() => {
            navigation!.navigate("Events");
          }}
          style={styles.pressable}
        >
          <Text style={styles.PressableText}>Go back to events</Text>
        </Pressable>
      </View>
    );
};
