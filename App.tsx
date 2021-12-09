
import React, {useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Home } from "./components/Home.screen/Home.component";
import { getAuth } from "@firebase/auth";
import { firebaseApp } from "./utils/firestoreConfig";
import { SplashScreen } from "./components/Splash.screen/splash.component";

const Drawer = createDrawerNavigator();
const auth = getAuth();

export default function App() {
  firebaseApp
  
    const [currentUser, setCurrentUser] = useState(false)
  
    auth.onAuthStateChanged((user) =>{
      if (user) {
        setCurrentUser(true)
      }
    });
  
  if(!currentUser){return(<SplashScreen />)}
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}