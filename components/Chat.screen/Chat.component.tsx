import { View, Text, Pressable, Button } from "react-native";
import React, { useState } from "react";
import { styles } from "./chat.style";
import {
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native-gesture-handler";
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
  const [text, setText] = React.useState("");

  //API call to getChatroomByEventId
  //ERROR: mismatch of event_id and chatroom_id
  React.useEffect(() => {
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
    <View style={[styles.item, backgroundColor]}>
      <Text style={styles.item}>{item.first_name}</Text>
      <Text style={styles.item}>{item.message_body}</Text>
      {/* ADD functionality for formatting time from api */}
      <Text style={styles.item}>{"TIME"}</Text>
      <Pressable
        style={styles.item}
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
        <Text>X</Text>
      </Pressable>
    </View>
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

      <View>
        <TextInput
          placeholder="Message..."
          onChangeText={setText}
          value={text}
        ></TextInput>
        <Pressable
          onPress={() => {
            addChatMessage(
              {
                //Get first_name from userContext
                first_name: "Will",
                message_body: text,
                timestamp: new Date(),
              },
              chat_id
            );
          }}
        >
          <Text style={styles.press}>SEND</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
