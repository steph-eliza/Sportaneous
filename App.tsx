
import React, {useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { UserProvider } from "./contexts/UserContext";
import { Home } from "./components/Home.screen/Home.component";
import { getAuth } from "@firebase/auth";
import { PhoneSignIn } from "./components/Auth.screen/Auth.component"; 
import { firebaseApp } from "./utils/firestoreConfig";

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
  
  if(!currentUser){return( <PhoneSignIn/>)}
  return (
    <UserProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
        </Drawer.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}