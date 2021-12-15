import React, { useState , useEffect , useContext } from "react";
import { Text, TextInput , Button, Image, Platform, View , Alert , KeyboardAvoidingView , TouchableWithoutFeedback , Keyboard} from "react-native";
import { styles } from "./EditProfile.style";
import { UserContext } from "../../contexts/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { updateUserDetails , getUserById, deleteUser } from "../../utils/utils";
import * as ImagePicker from 'expo-image-picker';
import {storage} from "../../utils/firestoreConfig"
import { getDownloadURL, ref, uploadBytes  } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { ScrollView } from "react-native-gesture-handler";

const auth = getAuth();
const user = auth.currentUser?.uid;

type UpdateUserProps = {
    navigation: {
        navigate: (component: string, {}) => {}
    }
}

export const EditProfile = ({navigation}: UpdateUserProps) => {

    const { currentUser } = useContext(UserContext)
    const [imgURL, setImgURL] = useState("")
    const [userImage, setUserImage] = useState(null)
    const [userDetails, setUserDetails] = useState({
        first_name: '',
        hosted_events: [],
        last_name: '',
        img_bitmap: '',
        requested_events: []
    })
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
        getUserById(auth.currentUser?.uid)
            .then((userData) => {
                setImgURL(userData?.img_bitmap)
                setUserDetails(userData)
                return imgURL
            }).catch((err) => {
                console.log(err)
            })
    }, [userImage]);

    
    const handleChange = (text: string, stateKey: string) => {
        setUserDetails({ ...userDetails, [stateKey]: text })
        console.log(userDetails)
    }
    const updateUser = async () => {
        getUserById(auth.currentUser?.uid)
            .then((userObj) => { 
                updateUserDetails(userDetails, auth.currentUser?.uid)
                return userDetails
            }).then((res) => {
                navigation.navigate("Profile")
                console.log(res)
            }).catch((err) => {
                console.log(err)
        })
    }

    const selectPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setUserImage(result.uri);
            uploadImage(result.uri, `avatar/img/${currentUser.id}`)
                .then((res) => {
                    Alert.alert("Upload Success")
            }).catch((err) => {
                Alert.alert(err)
            })
        }
    }

    const uploadImage = async (uri, imageName) => {
        if (!uri) return;
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
        
        const storageRef = ref(storage, `/images/${imageName}`)
        const result = await uploadBytes(storageRef, blob);

        blob.close();
        
        getDownloadURL(storageRef)
            .then((url) => {
                handleChange(url,"img_bitmap")
            }).catch((err) => {
                console.log(err)
            })
    }
    
    const deleteUserDetails = () => {
        deleteUser(user)
            .then(() => {
                console.log("User Deleted")
            }).catch(() => {
            
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                    <Text style={styles.title}>Update User Detail</Text> 
                    {imgURL ? <Image source={{ uri: imgURL }} style={styles.avatar} /> : null}
                    <Button
                        onPress={selectPhoto}
                        color="black"
                        title="Choose Photo"
                        // disabled={isDisabled}
                            />
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.container}
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inner}>
                            <Text>First Name:</Text> 
                            <TextInput
                                style={styles.inputField}
                                onChangeText={(text) => handleChange(text, 'first_name')}
                                placeholder="First Name:"
                                    />
                            <Text>Last Name:</Text> 
                            <TextInput
                                style={styles.inputField}
                                onChangeText={(text) => handleChange(text, 'last_name')}
                                placeholder="Last Name:"
                                    />
                            <Text>Description:</Text> 
                            <TextInput
                                multiline
                                numberOfLines={4}
                                style={styles.inputField}
                                onChangeText={(text) => handleChange(text, 'description')}
                                placeholder="Description:"
                                    />
                        </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                    <Button
                        onPress={updateUser}
                        color="black"
                        title="Submit"
                        // disabled={isDisabled}
                    />
                    <Button
                        onPress={deleteUserDetails}
                        color="red"
                        title="Delete Account"
                        // disabled={isDisabled}
                        />
            </ScrollView>
        </SafeAreaView>
    )
}