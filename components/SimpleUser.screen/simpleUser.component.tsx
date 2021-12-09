import React from "react";
import { View } from "react-native"; 
import { TextInput } from "react-native-gesture-handler";

const simpleUser = () =>{
    return(
        <View>
            <TextInput 
                style={{ marginVertical: 10, fontSize: 17 }}
                placeholder="+1 999 999 9999"
                autoFocus
                autoCompleteType="tel"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
            />
        </View>
    )
}