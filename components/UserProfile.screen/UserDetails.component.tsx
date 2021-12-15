import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../contexts/UserContext";
import {SafeAreaView, Text, Pressable, View, Image} from "react-native";
import {styles} from "./UserDetails.style";
import {MyHostedEvents} from "./MyHostedEvents.component";
import {ScrollView} from "react-native-gesture-handler";
import {MyJoinedEvents} from "./MyJoinedEvents.component";
import { getDownloadURL, ref } from "firebase/storage";
import {storage} from "../../utils/firestoreConfig"

export const UserDetails = ({ navigation }) => {
  
  const { currentUser } = useContext(UserContext);
  const [imgURL, setImgURL] = useState("");
  const user_id: string = currentUser.id;
  //Storage Ref for IMG file
  const storageRef = ref(storage, currentUser.img_bitmap)

  useEffect(() => {
    //firebase storage request for IMG file 
    try {
      getDownloadURL(storageRef)
        .then((res) => {
          setImgURL(res)
        }).catch((err) => {
          console.log(err)
        })
    } catch (err) {
      console.log(err)
    }
  },[])

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView>
        <Text style={styles.title}>Account Details</Text>
        {imgURL ? <Image source={{ uri: imgURL }} style={styles.avatar} /> : null}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsField}>First Name</Text>
          <Text style={styles.detailsValue}>{currentUser.first_name}</Text>
          <Text style={styles.detailsField}>Last Name</Text>
          <Text style={styles.detailsValue}>{currentUser.last_name}</Text>
          <Text style={styles.detailsField}>Description</Text>
          <Text>{currentUser.description}</Text>
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
              navigation.navigate('Edit Profile')
            }}
            // detail edit functionality
            // navigate to edit page
            
          >
            <Text style={styles.buttonTitle}>Edit Details</Text>
          </Pressable>
        </View>
        <MyHostedEvents user_id={user_id} navigation={navigation} />
        <MyJoinedEvents user_id={user_id} navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};
