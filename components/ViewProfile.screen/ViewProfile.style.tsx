import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputField: {
        height: 40,
        width: 250,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'whitesmoke',
    },
    avatar: {
        borderRadius: 100,
        height: 200,
        width: 200,
        alignSelf: "center"
    },
    title: {
        alignSelf: "center",
        fontSize: 24
    }
})