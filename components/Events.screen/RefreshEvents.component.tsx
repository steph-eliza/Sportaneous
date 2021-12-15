import React from "react";
import {Pressable, View, Text} from "react-native";
import {selectAllEvents} from "../../utils/utils";
import {styles} from "./Filter.style";
import {resetSelection} from "./utils/FilterUtils";

export const RefreshEvents = ({setEvents, setCategoryIsChecked}) => {
  return (
    <View>
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed
              ? "rgba(108, 93, 171, 0.5)"
              : "rgba(108, 93, 171, 1)",
          },
          styles.refreshButton,
        ]}
        onPress={() => {
          selectAllEvents().then((res) => {
            console.log(setCategoryIsChecked);
            resetSelection(setCategoryIsChecked);
            setEvents(res);
          });
        }}
      >
        <Text style={styles.buttonTitle}>Reload Event List</Text>
      </Pressable>
    </View>
  );
};
