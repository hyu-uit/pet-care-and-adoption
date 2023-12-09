import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { FC, useState } from 'react';
import { scaleSize } from '../../../utils/DeviceUtils';
import { COLORS, FONTS, SIZES } from '../../../config';
import { FontAwesome } from '@expo/vector-icons';
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
    <View style={styles.container}>
      <TextInput
        placeholder='Write a message'
        style={styles.input}
        multiline
        value={text}
        onChangeText={(message) => setText(message)}
      />
      <TouchableOpacity onPress={onSend}>
        <FontAwesome name='send' size={scaleSize(24)} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default ChatMessageBox;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    minHeight: scaleSize(50),
    backgroundColor: COLORS.whitePrimary,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: SIZES.bottomBarHeight,
    borderWidth: scaleSize(1),
    borderColor: COLORS.grayLight,
    borderRadius: scaleSize(17),
    paddingHorizontal: scaleSize(10),
    maxHeight: scaleSize(100),
  },
  input: {
    ...FONTS.body1,
    flex: 1,
  },
});
