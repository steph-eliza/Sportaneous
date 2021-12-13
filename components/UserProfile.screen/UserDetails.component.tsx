import React, {useState, useEffect, useContext} from "react";
import {UserContext} from "../../contexts/UserContext";
import {SafeAreaView, Text, Pressable, View, Image} from "react-native";
import {styles} from "./UserDetails.style";
import {MyHostedEvents} from "./MyHostedEvents.component";
import {MyAcceptedRequests} from "./MyAcceptedRequests.component";
import {ScrollView} from "react-native-gesture-handler";
import {MyJoinedEvents} from "./MyJoinedEvents.component";

export const UserDetails = ({ navigation }) => {
  
  const {currentUser} = useContext(UserContext);
  const user_id: string = currentUser.id;

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView>
        <Text style={styles.title}>Account Details</Text>
        <View style={styles.detailsContainer}>
          <Image source={currentUser.image_bitmap} />
          <Text style={styles.detailsField}>First Name</Text>
          <Text style={styles.detailsValue}>{currentUser.first_name}</Text>
          <Text style={styles.detailsField}>Last Name</Text>
          <Text style={styles.detailsValue}>{currentUser.last_name}</Text>
          <Pressable
            style={({pressed}) => [
              {
                backgroundColor: pressed
                  ? "rgba(30,280,280, 0.15)"
                  : "rgba(30,200,240, 0.25)",
              },
              styles.editButton,
            ]}
            onPress={() => {
              navigation.navigate("Edit Profile")
            }}
            // detail edit functionality
            // navigate to edit page
            
          >
            <Text style={styles.buttonTitle}>Edit Details</Text>
          </Pressable>
        </View>
        <MyHostedEvents user_id={user_id} navigation={navigation} />
        <MyJoinedEvents user_id={user_id} />
      </ScrollView>
    </SafeAreaView>
  );
};
