import React, {useState} from "react";
import {Text, View, Pressable} from "react-native";
import {CheckBox} from "react-native-elements";
import Collapsible from "react-native-collapsible";
import {styles} from "./Filter.style";
import {selectAllEvents} from "../../utils/utils";
import {updateCheckBox, resetSelection, applyFilter} from "./utils/FilterUtils";
import EventCategories from "./utils/EventCategories.json";

const Filter = ({setEvents}) => {
  interface categoryIsChecked {
    [category: string]: boolean;
  }
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [categoryIsChecked, setCategoryIsChecked] = useState(EventCategories);

  return (
    <View>
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed
              ? "rgba(120,50,240, 0.15)"
              : "rgba(120,50,240, 0.25)",
          },
          styles.filterButton,
        ]}
        onPress={() => {
          isCollapsed === true ? setIsCollapsed(false) : setIsCollapsed(true);
        }}
      >
        <Text style={styles.buttonTitle}>Filter</Text>
      </Pressable>
      <Collapsible style={styles.collapse} collapsed={isCollapsed}>
        <View>
          <Text style={styles.title}>Select Categories:</Text>

          <View style={styles.checkBoxContainer}>
            {Object.keys(categoryIsChecked).map((activity) => {
              return (
                <CheckBox
                  title={activity}
                  containerStyle={styles.checkBox}
                  textStyle={styles.checkBoxText}
                  checked={categoryIsChecked[activity]}
                  onPress={() => {
                    updateCheckBox(activity, setCategoryIsChecked);
                  }}
                ></CheckBox>
              );
            })}
          </View>

          <View style={styles.lowerButtonContainer}>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? "rgba(120,50,240, 0.15)"
                    : "rgba(120,50,240, 0.25)",
                },
                styles.lowerButtonClear,
              ]}
              onPress={() => {
                resetSelection(setCategoryIsChecked);
              }}
            >
              <Text style={styles.buttonTitle}>Clear Selection</Text>
            </Pressable>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? "rgba(120,50,240, 0.15)"
                    : "rgba(120,50,240, 0.25)",
                },
                styles.lowerButtonApply,
              ]}
              onPress={() => {
                applyFilter(categoryIsChecked, selectAllEvents, setEvents);
              }}
            >
              <Text style={styles.buttonTitle}>Apply Filters</Text>
            </Pressable>
          </View>
        </View>
      </Collapsible>
    </View>
  );
};

export default Filter;
