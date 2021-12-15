import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { styles } from "./chat.style";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { addChatMessage, deleteChatMessage } from "../../utils/utils";
import { db } from "../../utils/firestoreConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { UserContext } from "../../contexts/UserContext";

export const Chat = ({ route }) => {
  const { chat_id, eventName } = route.params;
  const { currentUser } = useContext(UserContext);
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
  const formatTimestamp = (timestamp) => {
    let date = new Date(timestamp * 1000);
    let datevalues = {
      fullYear: String(date.getFullYear()),
      month: String(date.getMonth() + 1),
      day: String(date.getDate()),
      hour: String(date.getHours()),
      minutes: String(date.getMinutes()),
      seconds: String(date.getSeconds()),
    };
    if (Number(datevalues.hour) < 10) {
      let hourString = "0" + datevalues.hour;
      datevalues.hour = hourString;
    }
    if (Number(datevalues.minutes) < 10) {
      let minutesString = "0" + datevalues.minutes;
      datevalues.minutes = minutesString;
    }
    return `${datevalues.hour}:${datevalues.minutes} ${datevalues.day}/${datevalues.month}/${datevalues.fullYear}`;
  };
  const Item = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.topRowContainer}>
        <Text style={styles.name}>{item.first_name}:</Text>

        <Pressable
          disabled={currentUser.id !== item.userId}
          style={
            currentUser.id === item.userId ? styles.deleteButton : styles.hidden
          }
          onPress={() => {
            deleteChatMessage(
              {
                userId: currentUser.id,
                first_name: currentUser.first_name,
                message_body: item.message_body,
                timestamp: item.timestamp,
              },
              chat_id
            );
          }}
        >
          <Text style={styles.delete}>
            {currentUser.id === item.userId ? "X" : null}
          </Text>
        </Pressable>
      </View>
      <Text style={styles.message}>{item.message_body}</Text>
      <Text style={styles.time}>{formatTimestamp(item.timestamp.seconds)}</Text>
      {/* ADD functionality for formatting time from api */}
    </View>
  );
  const renderItem = ({ item }) => {
    const backgroundColor =
      item.id === selectedId ? "#6E3B6E" : "rgba(10,80,160, 0.1)";
    return <Item item={item} backgroundColor={{ backgroundColor }} />;
  };
  if (isMessagesEmpty) {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <TextInput
            style={styles.name}
            placeholder="Message..."
            onChangeText={setText}
            value={text}
          ></TextInput>
          <Pressable
            onPress={() => {
              if (text !== "") {
                addChatMessage(
                  {
                    userId: currentUser.id,
                    first_name: currentUser.first_name,
                    message_body: text,
                    timestamp: new Date(),
                  },
                  chat_id
                ).then(() => {
                  setText("");
                });
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
        <View>
          <Text style={styles.header}>{eventName}</Text>
        </View>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
        <View style={styles.sendMessagecontainer}>
          <TextInput
            style={styles.inputMessage}
            placeholder="Message..."
            onChangeText={setText}
            value={text}
          ></TextInput>
          <Pressable
            onPress={() => {
              if (text !== "") {
                addChatMessage(
                  {
                    userId: currentUser.id,
                    first_name: currentUser.first_name,
                    message_body: text,
                    timestamp: new Date(),
                  },
                  chat_id
                ).then(() => {
                  setText("");
                });
              }
            }}
          >
            <Text style={styles.sendText}>SEND</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }
};
