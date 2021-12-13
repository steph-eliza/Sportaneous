import React from "react";
import {useState} from "react";
import {Text, Pressable, View, ScrollView} from "react-native";
import Collapsible from "react-native-collapsible";
import {MyAcceptedRequests} from "./MyAcceptedRequests.component";
import {MyPendingRequests} from "./MyPendingRequests.component";
import {styles} from "./ProfileEvents.style";

export const MyJoinedEvents = ({user_id}) => {
  const [joinedIsCollapsed, setJoinedIsCollapsed] = useState(false);

  return (
    <View>
      <Pressable
        onPress={() => {
          setJoinedIsCollapsed(joinedIsCollapsed === true ? false : true);
        }}
      >
        <Text style={styles.eventHeader}>My Joined Events</Text>
      </Pressable>
      <ScrollView>
        <Collapsible collapsed={joinedIsCollapsed}>
          <MyAcceptedRequests user_id={user_id} />
          <MyPendingRequests user_id={user_id} />
        </Collapsible>
      </ScrollView>
    </View>
  );
};

{
  // Object {
  //     "attendees": Array [
  //       "MqFbwzzuLbOhneGLtDs",
  //     ],
  //     "category": "climbing",
  //     "date": "06/10/2021",
  //     "description": "Mtrcy rider (driver) injured in oth transport acc, sequela",
  //     "host_id": "MqFbx-3zbETE2gRo5pI",
  //     "id": "MqFdV64GrCmmGLhLAs_",
  //     "location": "london",
  //     "max_capacity": 1,
  //     "pending_attendees": Array [
  //       "MqFbx-1VrkhVGHYYpLX",
  //     ],
  //     "title": "mountain lovers",
  //   },
}
