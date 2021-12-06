import { Button, View, Image } from "react-native";
import React from "react";
import { styles } from "./Header.style";
import avatar from "../../assets/avatar.png";

export const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={avatar} style={styles.avatar}></Image>
      <Button
        title="NAV"
        onPress={() => {
          //Functionality to open up nav side bar
        }}
      ></Button>
    </View>
  );
};
