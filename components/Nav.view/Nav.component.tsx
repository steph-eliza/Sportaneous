import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "../Home.screen/Home.component";
import { Login } from "../Login.screen/Login.component";
import { SingleEvent } from "../SingleEvent.screen/SingleEvent.component";

NavigationContainer;

const Drawer = createDrawerNavigator();
export function Nav() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Event" component={SingleEvent} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
