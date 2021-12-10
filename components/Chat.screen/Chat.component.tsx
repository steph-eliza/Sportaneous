import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { styles } from "./chat.style";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  addChatMessage,
  deleteChatMessage,
  selectChatById,
} from "../../utils/utils";
import { db } from "../../utils/firestoreConfig";

import { doc, onSnapshot } from "firebase/firestore";

export const Chat = ({ route }) => {
  const { chat_id } = route.params;
  const [selectedId, setSelectedId] = React.useState(null);
  const [messages, setMessages] = React.useState([]);

  //API call to getChatroomByEventId

  React.useEffect(() => {
    // selectChatById(chat_id).then((res) => {
    //   console.log("CHAT OBJECT:", res);
    //   setMessages(res.messages);
    // });
    const unsub = onSnapshot(doc(db, "chats", chat_id), (doc) => {
      console.log("DOC:", doc.data());
      if (doc.data().messages.length > 0) {
        setMessages(doc.data().messages);
      } else {
        setMessages([
          {
            first_name: "NBC",
            message_body: "Add a message",
            timestamp: 11111,
          },
        ]);
      }
    });
  }, [db, chat_id]);

  const Item = ({ item, backgroundColor, textColor }) => (
    <TouchableOpacity style={[styles.item, backgroundColor]}>
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

      <Pressable
        onPress={() => {
          addChatMessage(
            {
              first_name: "Will",
              message_body: "Testing testing... 123",
              timestamp: "11114",
            },
            "MqFdV5ywbsGMVlV_Dvc"
          );
        }}
      >
        <Text style={styles.press}>SEND MESSAGE?</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          deleteChatMessage(
            {
              first_name: "Will",
              message_body: "Testing testing... 123",
              timestamp: "11114",
            },
            "MqFdV5ywbsGMVlV_Dvc"
          );
        }}
      >
        <Text style={styles.press}>DELETE MESSAGE?</Text>
      </Pressable>
    </SafeAreaView>
  );
};
