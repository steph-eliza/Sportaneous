import React from "react";
import {View, Text, Button , Image, TextInput} from "react-native"
import {styles} from "./Login.style";

export function Login() {
    const [username, onChangeUsername] = React.useState("Username");
    const [password, onChangePassword] = React.useState("Password");

    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <Image 
            style={styles.avatar}
            source={{uri: "https://images.pexels.com/photos/792416/pexels-photo-792416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}} />
        <Text style={styles.textUsername}>Username:</Text>
        <TextInput
            style={styles.inputUsername}
            onChangeText={onChangeUsername}
            value={username}
        />
        <Text style={styles.textPassword}>Password:</Text>
        <TextInput
            secureTextEntry={true}
            style={styles.inputPassword}
            onChangeText={onChangePassword}
            value={password}
        />
        <Button 
            onPress={() => {console.log("Click")}}
            color="blue"
            title="Submit"/>
      </View>
    );
  }
  