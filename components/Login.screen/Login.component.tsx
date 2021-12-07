import React from "react";
import {View, Text, Button , Image, TextInput} from "react-native"
import {styles} from "./Login.style";

export function Login() {
    const [email, onChangeEmail] = React.useState("");

    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <Image 
            style={styles.avatar}
            source={{uri: "https://images.pexels.com/photos/792416/pexels-photo-792416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}} />
        <Text style={styles.textEmail}>Email:</Text>
        <TextInput
            style={styles.inputEmail}
            onChangeText={onChangeEmail}
            value={email}
        />
        <Button 
            onPress={() => {console.log("Click")}}
            color="blue"
            title="Submit"/>
      </View>
    );
  }
  
