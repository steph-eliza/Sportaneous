import { View, Text } from "react-native";
import { styles } from "./HostInfo.style";
import React from "react";

type hostDetailsType = {
  first_name: string;
  last_name: string;
  description: string;
  image_bitmap: string;
};

export const HostInfo = (hostDetails: hostDetailsType) => {
  return (
    <View style={styles.hostView}>
      <Text style={styles.text}>About the host:</Text>
      <Text
        style={styles.text}
      >{`${hostDetails.first_name} ${hostDetails.last_name}`}</Text>
      <Text style={styles.text}>{hostDetails.description}</Text>
    </View>
  );
};
