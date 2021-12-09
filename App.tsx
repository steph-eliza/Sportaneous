import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { UserProvider } from "./contexts/UserContext";
import { Nav } from "./components/Nav.view/Nav.component";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <UserProvider>
      <Nav />
    </UserProvider>
  );
}
