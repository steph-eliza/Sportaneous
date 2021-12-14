import { StyleSheet, Dimensions } from 'react-native'

const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 140,
  },
  title: {
      color: '#FFF',
      fontSize: 18,
      textAlign: 'center',
      fontWeight: "bold",
      marginBottom: 30,
      backgroundColor: "#323B76",
      padding: 30,
      textTransform: "uppercase",
      width: windowWidth / 1,
  },
  inputContainer: {
      alignItems: 'center',
      justifyContent: 'center',
  },
  inputField: {
      height: 45,
      width: 250,
      marginBottom: 5,
      padding: 10,
      backgroundColor: "#FFF",
      borderRadius: 5,
      borderColor: "#DADBDF",
      borderWidth: 1,
  },
  datetime: {
      alignItems: 'center',
      justifyContent: 'center',
  },
  post: {
    alignItems: 'center',
      justifyContent: 'center',
  },
  postButton: {
      marginVertical: 13,
      padding: 10,
      backgroundColor: "grey",
      borderRadius: 50,
      width: 150,
      alignItems: 'center',
      justifyContent: 'center',
    },
  postText: {
      textAlign: 'center',
      color: '#ffff',
      fontWeight: 'bold',
      fontSize: 14,
      textTransform: "uppercase"
    } 
})