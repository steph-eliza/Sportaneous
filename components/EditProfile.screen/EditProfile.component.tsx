import React, {useState, useContext} from "react";
import { View, Text , Button, Image} from "react-native";
import { UserContext } from "../../contexts/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { styles } from "./EditProfile.style";

export const EditProfile = ({ navigation }) => {
    
    const { currentUser } = useContext(UserContext)
    const [userDetails, setUserDetails] = useState({
        first_name: '',
        last_name: '',
        image_bitmap: ''
    })
    
    console.log("User :", currentUser);
    
    const handleChange = (text: string, stateKey: string) => {
        setUserDetails({ ...userDetails, [stateKey]: text })
    }

    const handlePress = async () => {
    const eventId = await addNewEvent(eventDetails)
        addNewChatroom(
            { host_id: currentUser.id, attendees_id: [], messages: [] },
            eventId
        )
        navigation.navigate('Event', { eventId: eventId })
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <Text>First Name:</Text>
                    <TextInput
                        style={styles.inputField}
                        onChangeText={(text) => handleChange(text, 'title')}
                        placeholder="First Name" />
                        <Text>Last Name:</Text>
                    <TextInput
                        style={styles.inputField}
                        onChangeText={(text) => handleChange(text, 'title')}
                        placeholder="Last Name" />
                        <Text>Avatar:</Text>
                    <TextInput
                        style={styles.inputField}
                        onChangeText={(text) => handleChange(text, 'title')}
                        placeholder="Avatar url"/>
                <Image
                    style={styles.avatar}
                    source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
                <Button
                    onPress={handlePress}
                    color="black"
                    title="Update"
                    // disabled={isDisabled}
                />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}