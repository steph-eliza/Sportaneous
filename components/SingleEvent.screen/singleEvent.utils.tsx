import { deleteChatroom, deleteEvent } from "../../utils/utils";

export type navigationWithEventId = {
  eventId: string;
};

export type addEventProps = {
  navigation?: {
    navigate: (component: string, event_id?: navigationWithEventId) => {};
  };
  route?: {
    params: { eventId: string };
  };
  hostDetails?: hostDetails;
  eventDetails?: eventDetails;
};

export type hostDetails = {
  first_name: string;
  last_name: string;
  description: string;
  image_bitmap: string;
};
export type eventDetails = {
  attendees: string[];
  category: string;
  date: string;
  description: string;
  host_id: string;
  location: string;
  max_capacity: string;
  pending_attendees: string[];
  title: String;
  time: string;
};

export function checkAcceptedOrRequested(
  object: any,
  currentUser: any
): boolean {
  if (object.attendees.includes(currentUser.id)) {
    return true;
  } else {
    for (let i = 0; i < object.pending_attendees.length; i++) {
      if (object.pending_attendees[i].userId === currentUser.id) {
        return true;
      }
    }
    return false;
  }
}

export function deleteEventAndCascade(
  eventId: string,
  { navigation }: addEventProps
) {
  try {
    //////CHECK DELETE removes requested/attneding events from other users
    deleteEvent(eventId);
    deleteChatroom(eventId);
    navigation?.navigate("Events");
  } catch (error) {
    console.log(error);
    alert("Unable to delete event at this time, please try again later");
  }
}
