import React, { useState , useEffect , useContext } from "react";
import { Text, TextInput , Button, Image, Platform, View , Alert } from "react-native";
import { styles } from "./EditProfile.style";
import { UserContext } from "../../contexts/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { updateUserDetails } from "../../utils/utils";
import * as ImagePicker from 'expo-image-picker';
import {storage} from "../../utils/firestoreConfig"
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

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
        last_name: '',
        img_bitmap: '',
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
        }, [userImage]);


    const handleChange = (text: string, stateKey: string) => {
        setUserDetails({ ...userDetails, [stateKey]: text })
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
            uploadImage(result.uri, `avatar/img/${currentUser.id}.png`)
                .then((res) => {
                    Alert.alert("Upload Success")
            }).catch((err) => {
                Alert.alert(err)
            })
        }
    }

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setUserImage(result.uri);
            uploadImage(result.uri, `avatar/img/${currentUser.id}.png`)
            .then((res) => {
                Alert.alert("Upload Success")
            }).catch((err) => {
                Alert.alert(err)
            })
        }
    
    }

    const handlePress = async () => {
        updateUserDetails()
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
                setImgURL(url)
            }).catch((err) => {
                console.log(err)
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
            <Text style={styles.title}>Update User Detail</Text> 
                {userImage ? <Image source={{ uri: userImage }} style={styles.avatar} /> : null}
                {imgURL ? <Image source={{ uri: imgURL }} style={styles.avatar} /> : null}
            <Button
                onPress={selectPhoto}
                color="black"
                title="Choose Photo"
                // disabled={isDisabled}
                />
            <Button
                onPress={takePhoto}
                color="black"
                title="Take Photo"
                // disabled={isDisabled}
            />
            <TextInput
                style={styles.inputField}
                onChangeText={(text) => handleChange(text, 'first_name')}
                placeholder="First Name:"
            />
            <TextInput
                style={styles.inputField}
                onChangeText={(text) => handleChange(text, 'last_name')}
                placeholder="Last Name:"
            />
            <Button
                onPress={handlePress}
                color="black"
                title="Update"
                // disabled={isDisabled}
            />
            <Button
                onPress={handlePress}
                color="red"
                title="Delete Account"
                // disabled={isDisabled}
                />
                </View>
        </SafeAreaView>
    )
}