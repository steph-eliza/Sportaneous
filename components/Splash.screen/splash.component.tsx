import React, {useState} from "react";
import { Text, View } from "react-native";
import { getAuth } from 'firebase/auth';
import { PhoneSignIn } from "../Auth.screen/Auth.component";
import { firebaseApp } from "../../utils/firestoreConfig"

const auth = getAuth();

export const SplashScreen = () => {
    firebaseApp

    const [currentUser, setCurrentUser] = useState(false)
  
    auth.onAuthStateChanged((user) =>{
      if (user) {
        setCurrentUser(true)
      }
    });
  
    if(!currentUser){return(<PhoneSignIn/>)}
    return(
        <View>
          <Text>Welcome to NBC</Text>
        </View>
    )
}