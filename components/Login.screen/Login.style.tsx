import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatar:{
        borderBottomWidth: 3,
        borderRadius: 25,
        borderColor: "blue",
        backgroundColor: "lightgreen",
        height: 100,
        width: 100
    },
    textEmail:{
        marginTop: 15, 
        fontSize: 18,
    },
    inputEmail:{
        height: 40,
        width: 250,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "lightgrey",
    }
  });
  