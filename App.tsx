import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { UserProvider } from "./contexts/UserContext";
import { Home } from "./components/Home.screen/Home.component";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
        </Drawer.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}