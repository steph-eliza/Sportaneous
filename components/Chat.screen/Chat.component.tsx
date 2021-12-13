import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { styles } from "./chat.style";
import {
  FlatList,
  TextInput,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  addChatMessage,
  deleteChatMessage,
} from "../../utils/utils";
import { db } from "../../utils/firestoreConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { UserContext } from '../../contexts/UserContext';


export const Chat = ({ route }) => {
  const { chat_id } = route.params;
  const { currentUser } = useContext(UserContext)
  const [selectedId, setSelectedId] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [text, setText] = React.useState("");
  const [isMessagesEmpty, setIsMessagesEmpty] = React.useState(true);

  React.useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", chat_id), (doc) => {
      if (doc.data().messages.length > 0) {
        setIsMessagesEmpty(false);
        setMessages(doc.data().messages);
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
          if (currentUser.id === item.userId) {
          deleteChatMessage(
            {
              userId: currentUser.id,
              first_name: currentUser.first_name,
              message_body: item.message_body,
              timestamp: item.timestamp,
            },
            chat_id
          );
          }
        }}
      >
        <Text> {currentUser.id === item.userId ? "X" : ""} </Text>
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

  if (isMessagesEmpty) {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <TextInput
            placeholder="Message..."
            onChangeText={setText}
            value={text}
          ></TextInput>
          <Pressable
            onPress={() => {
              if(text !== ""){
              addChatMessage(
                {
                  userId: currentUser.id,
                  first_name: currentUser.first_name,
                  message_body: text,
                  timestamp: new Date(),
                },
                chat_id
              );
              }
            }}
          >
            <Text style={styles.press}>SEND</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  } else {
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
              if(text !== ""){
                addChatMessage(
                {
                  userId: currentUser.id,
                  first_name: currentUser.first_name,
                  message_body: text,
                  timestamp: new Date(),
                },
                chat_id
              );
              }
              
            }}
          >
            <Text style={styles.press}>SEND</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }
};
