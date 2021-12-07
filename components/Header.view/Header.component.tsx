import { Button, View, Image, Text } from "react-native";
import React from "react";
import { styles } from "./Header.style";
import avatar from "../../assets/avatar.png";
import { createDrawerNavigator } from "@react-navigation/drawer";

export const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={avatar} style={styles.avatar}></Image>

      {/* <Nav /> */}
      <Button
        title={"Nav"}
        onPress={() => {
          //Functionality to open up nav side bar
          console.log("open navigation");
          //navigation.toggleDrawer();
        }}
      ></Button>
    </View>
  );
};
