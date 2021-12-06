import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import { storeData } from './utils/config';
import { UserProvider } from './contexts/UserContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <UserProvider>
      <View style={styles.container}>
        <Text>NBC Meetup</Text>
        <Button onPress={() => { storeData(); }}
            title="Click Me"
            color="#841584"/>
        <StatusBar style="auto" />
      </View>
    </UserProvider>
  );
}
