import { View, Text } from "react-native";
import React, { useState } from "react";
import { styles } from "./chat.style";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { addChatMessage } from "../../utils/utils";

export const Chat = ({ route }) => {
  const { event_id } = route.params;
  const [selectedId, setSelectedId] = useState(null);

  //API call to getChatroomByEventId

  //retrieved messages data:
  const messages = [
    {
      first_name: "Lindsey",
      message_body: "What you sayin' g?",
      timestamp: 11111,
    },
    {
      first_name: "Lilias",
      message_body: "Good moro, run this sat?",
      timestamp: 11112,
    },
  ];

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={styles.item}>{item.first_name}</Text>
      <Text style={styles.item}>{item.message_body}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor =
      item.id === selectedId ? "#6E3B6E" : "rgba(10,80,160, 0.1)";
    const color = item.id === selectedId ? "white" : "black";
    return (
      <Item
        item={item}
        onPress={() => {
          navigation.navigate("Chat", { event_id: item.id });
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};
