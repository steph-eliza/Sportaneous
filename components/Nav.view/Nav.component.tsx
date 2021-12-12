import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SingleEvent } from "../SingleEvent.screen/SingleEvent.component";
import { AddEvent } from "../AddEvent.screen/AddEvent.component";
import EventList from "../Events.screen/EventList.component";
import PhoneSignIn from "../Auth.screen/Auth.component";
import Chatroom from "../Chatroom.screen/Chatroom.component";
import { GetUserName } from "../GetUserName.screen/GetUserName.component";
import { Chat } from "../Chat.screen/Chat.component";

const Drawer = createDrawerNavigator();

export function Nav() {
  return (
    <Drawer.Navigator initialRouteName="Events">
      <Drawer.Screen name="Events" component={EventList} />
      <Drawer.Screen name="Add Event" component={AddEvent} />
      <Drawer.Screen name="Event" component={SingleEvent} options={{drawerItemStyle:{display:"none"}}}/>
      <Drawer.Screen name="PhoneSignIn" component={PhoneSignIn} options={{drawerItemStyle:{display:"none"}}}/>
      <Drawer.Screen name="GetUserName" component={GetUserName} options={{drawerItemStyle:{display:"none"}}}/>
      <Drawer.Screen name="Chatrooms" component={Chatroom} />
      <Drawer.Screen name="Chat" component={Chat} />
    </Drawer.Navigator>
  )
}