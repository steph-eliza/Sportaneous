import React, {useState} from "react";
import {Text, View, Pressable} from "react-native";
import {CheckBox} from "react-native-elements";
import Collapsible from "react-native-collapsible";
import {styles} from "./Filter.style";

const Filter = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [categoryIsChecked, setCategoryIsChecked] = useState({
    running: false,
    swimming: false,
    climbing: false,
  });

  const updateCheckBox = (title: string) => {
    setCategoryIsChecked((prevIsChecked) => {
      const newIsChecked = {...prevIsChecked};
      newIsChecked[title] = newIsChecked[title] !== true;
      return newIsChecked;
    });
  };

  const resetSelection = () => {
    setCategoryIsChecked((prevIsChecked) => {
      const newIsChecked = {...prevIsChecked};
      for (const category in newIsChecked) {
        newIsChecked[category] = false;
      }
      return newIsChecked;
    });
  };

  const applyFilter = () => {
    // to do
    // api call based on the current categoryIsChecked objects's booleans
  };

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
            <CheckBox
              title={"running"}
              containerStyle={styles.checkBox}
              textStyle={styles.checkBoxText}
              checked={categoryIsChecked.running}
              onPress={() => {
                updateCheckBox("running");
              }}
            ></CheckBox>
            <CheckBox
              title={"swimming"}
              containerStyle={styles.checkBox}
              textStyle={styles.checkBoxText}
              checked={categoryIsChecked.swimming}
              onPress={() => {
                updateCheckBox("swimming");
              }}
            ></CheckBox>
            <CheckBox
              title={"climbing"}
              containerStyle={styles.checkBox}
              textStyle={styles.checkBoxText}
              checked={categoryIsChecked.climbing}
              onPress={() => {
                updateCheckBox("climbing");
              }}
            ></CheckBox>
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
                resetSelection();
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
                applyFilter();
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
