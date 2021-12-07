//React imports
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

//Screen imports
import { Home } from "./components/Home.screen/Home.component";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        {/* <Drawer.Screen name="" component={} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
