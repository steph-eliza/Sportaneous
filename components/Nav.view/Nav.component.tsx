import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {Home} from "../Home.screen/Home.component";
import {Login} from "../Login.screen/Login.component";
import {SingleEvent} from "../SingleEvent.screen/SingleEvent.component";
import EventList from "../Events.screen/EventList.component";

const Drawer = createDrawerNavigator();

export function Nav() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Event" component={SingleEvent} />
      <Drawer.Screen name="EventList" component={EventList} />
    </Drawer.Navigator>
  );
}
