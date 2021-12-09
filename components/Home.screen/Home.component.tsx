import React from "react";
import { Text } from "react-native";
import { Screen } from "react-native-screens";
import { SplashScreen } from "../Splash.screen/splash.component";
import { Nav } from "../Nav.view/Nav.component";

export const Home = () => {
  return (
    <Screen>
      <Nav />
      <Text>
        Home Screen
      </Text>
    </Screen>
  )};