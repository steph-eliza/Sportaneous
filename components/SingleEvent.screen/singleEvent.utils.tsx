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
