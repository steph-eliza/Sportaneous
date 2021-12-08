import React from "react";
import { Text, View } from "react-native";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { PhoneSignIn } from "../Auth.screen/Auth.component";

const auth = getAuth();
const currentUser = auth.currentUser;

export const SplashScreen = () => {
    return(
        <View>
            {onAuthStateChanged(auth, (user) => {
                if (user) {
                    const uid = user.uid;
                    return(
                        <Text>Welcome {user.uid}</Text>
                    )
                }
                return(
                    <PhoneSignIn/>
                    )
            })}
        </View>
    )
}