import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { COLORS, SIZES } from '../../config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { doc, onSnapshot } from 'firebase/firestore';
import { firestoreDB } from '../../../firebaseConfig';
import ChatItem from './components/ChatItem';
import ChatHeader from './components/ChatHeader';
import { useNavigation } from '@react-navigation/native';
import ChatMessageBox from './components/ChatMessageBox';
import ChatMessage from './components/ChatMessage';

const ChatDetailScreen = () => {
  const [messages, setMessages] = useState([]);
  const otherPhoneNumber = useSelector(
    (state: RootState) => state.chat.otherUser.id
  );
  const otherName = useSelector(
    (state: RootState) => state.chat.otherUser.displayName
  );
  const myPhoneNumber = useSelector(
    (state: RootState) => state.shared.user.phoneNumber
  );
  const scrollViewRef = useRef(null);

  const navigation = useNavigation();
  const combinedId =
    myPhoneNumber > otherPhoneNumber
      ? myPhoneNumber + otherPhoneNumber
      : otherPhoneNumber + myPhoneNumber;

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  useEffect(() => {
    const unSub = onSnapshot(doc(firestoreDB, 'chats', combinedId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => unSub();
  }, [myPhoneNumber, combinedId]);

  const onGoBack = () => {
    navigation.goBack();
  };

  console.log('msg', messages);

  return (
    <SafeAreaView style={styles.container}>
      <ChatHeader displayName={otherName} onBack={onGoBack} />
      <ScrollView
        style={{ flex: 1, marginBottom: SIZES.bottomPadding }}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
        showsVerticalScrollIndicator={false}
      >
        {messages.map((m) => (
          <ChatMessage
            key={m}
            date={m.date}
            id={m.id}
            senderId={m.senderId}
            text={m.text}
          />
        ))}
      </ScrollView>

      <ChatMessageBox
        chatId={combinedId}
        myPhoneNumber={myPhoneNumber}
        otherPhoneNumber={otherPhoneNumber}
      />
    </SafeAreaView>
  );
};

export default ChatDetailScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.padding,
  },
});
