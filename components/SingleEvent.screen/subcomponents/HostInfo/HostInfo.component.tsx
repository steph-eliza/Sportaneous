import { View, Text } from "react-native";
import { styles } from "./HostInfo.style";
import React from "react";
import { addEventProps } from "../../singleEvent.utils";

export const HostInfo = ({ hostDetails }: addEventProps) => {
  return (
    <View style={styles.hostView}>
      <Text style={styles.text}>About the host:</Text>
      <Text
        style={styles.capitalizedText}
      >{`${hostDetails?.first_name} ${hostDetails?.last_name}`}</Text>
      <Text style={styles.text}>{hostDetails?.description}</Text>
    </View>
  );
};
