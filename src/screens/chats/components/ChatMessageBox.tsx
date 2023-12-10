import React, { FC, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { scaleSize } from '../../../utils/DeviceUtils';
import { COLORS, FONTS, SIZES } from '../../../config';
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { firestoreDB } from '../../../../firebaseConfig';
import { v4 as uuid } from 'uuid';

type ChatMessageBoxProps = {
  chatId: string;
  myPhoneNumber: string;
  otherPhoneNumber: string;
};

const ChatMessageBox: FC<ChatMessageBoxProps> = ({
  chatId,
  myPhoneNumber,
  otherPhoneNumber,
}) => {
  const [text, setText] = useState('');

  const onSend = async () => {
    if (text !== '') {
      await updateDoc(doc(firestoreDB, 'chats', chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: myPhoneNumber,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(firestoreDB, 'userChats', myPhoneNumber), {
        [chatId + '.lastMessage']: {
          text,
        },
        [chatId + '.date']: serverTimestamp(),
      });

      await updateDoc(doc(firestoreDB, 'userChats', otherPhoneNumber), {
        [chatId + '.lastMessage']: {
          text,
        },
        [chatId + '.date']: serverTimestamp(),
      });

      setText('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? -SIZES.bottomBarHeight - scaleSize(10) : 0
      }
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Write a message'
          style={styles.input}
          multiline
          value={text}
          onChangeText={(message) => setText(message)}
        />
        <TouchableOpacity onPress={onSend}>
          <FontAwesome
            name='send'
            size={scaleSize(24)}
            color={COLORS.primary}
            style={{ marginRight: scaleSize(20) }}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatMessageBox;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: scaleSize(10),
  },
  inputContainer: {
    flexDirection: 'row',
    minHeight: scaleSize(50),
    backgroundColor: COLORS.whitePrimary,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: scaleSize(1),
    borderColor: COLORS.grayLight,
    borderRadius: scaleSize(17),
    marginBottom: SIZES.bottomBarHeight + scaleSize(10), // Adjust this value as needed
  },
  input: {
    ...FONTS.body1,
    flex: 1,
    paddingVertical: scaleSize(8),
    paddingHorizontal: scaleSize(10),
  },
});
