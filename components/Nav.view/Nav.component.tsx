import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Home } from "../Home.screen/Home.component";
import { Login } from "../Login.screen/Login.component";
import { SingleEvent } from "../SingleEvent.screen/SingleEvent.component";
import EventList from "../Events.screen/EventList.component";
import Chatroom from "../Chatroom.screen/Chatroom.component";
import { Chat } from "../Chat.screen/Chat.component";
import { AcceptReject } from "../AcceptReject.screen/AcceptReject.component";



const Drawer = createDrawerNavigator();

export function Nav() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Event" component={SingleEvent} />
      <Drawer.Screen name="EventList" component={EventList} />
      <Drawer.Screen name="Chatrooms" component={Chatroom} />
      <Drawer.Screen name="Chat" component={Chat} />
      <Drawer.Screen name="AcceptReject" component={AcceptReject} />
    </Drawer.Navigator>
  );
}
