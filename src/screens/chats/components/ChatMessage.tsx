import { View, Text, StyleSheet, Image } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { COLORS, SIZES } from '../../../config';
import { scaleSize } from '../../../utils/DeviceUtils';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { doc, getDoc } from 'firebase/firestore';
import { firestoreDB } from '../../../../firebaseConfig';

type ChatMessageProps = {
  date: any;
  id: string;
  senderId: string;
  text: string;
};

const ChatMessage: FC<ChatMessageProps> = ({ date, id, senderId, text }) => {
  const myPhoneNumber = useSelector(
    (state: RootState) => state.shared.user.phoneNumber
  );

  const [img, setImg] = useState();
  const [myImg, setMyImg] = useState();

  const otherPhoneNumber = useSelector(
    (state: RootState) => state.chat.otherUser.id
  );

  useEffect(() => {
    const getOtherUserAvatar = async () => {
      const docRef = doc(firestoreDB, 'users', otherPhoneNumber);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setImg(docSnap.data().avatar);
      }
    };

    const getMyAvatar = async () => {
      const docRef = doc(firestoreDB, 'users', myPhoneNumber);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMyImg(docSnap.data().avatar);
      }
    };

    getOtherUserAvatar();
    getMyAvatar();
  }, [otherPhoneNumber]);

  return (
    <View
      style={[
        styles.container,
        {
          justifyContent:
            myPhoneNumber === senderId ? 'flex-end' : 'flex-start',
        },
      ]}
    >
      {myPhoneNumber !== senderId && (
        <Image
          source={{
            uri: img
              ? img
              : 'https://firebasestorage.googleapis.com/v0/b/pet-care-and-adoption.appspot.com/o/images%2Fdog-puns-1581708208.jpg?alt=media&token=39969852-94c9-41fd-8f4b-afd05f1201f9',
          }}
          style={[styles.image, { marginRight: scaleSize(5) }]}
        />
      )}
      <View style={styles.textWrapper}>
        <Text>{text}</Text>
      </View>
      {myPhoneNumber === senderId && (
        <Image
          source={{
            uri: myImg
              ? myImg
              : 'https://firebasestorage.googleapis.com/v0/b/pet-care-and-adoption.appspot.com/o/images%2Fdownload.jpeg?alt=media&token=823463a0-0620-4089-ac65-8b55f429fc4e',
          }}
          style={[styles.image, { marginLeft: scaleSize(5) }]}
        />
      )}
    </View>
  );
};

export default ChatMessage;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    minHeight: scaleSize(50),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleSize(20),
  },
  image: {
    height: scaleSize(50),
    width: scaleSize(50),
    borderRadius: scaleSize(25),
  },
  textWrapper: {
    maxWidth: '80%',
    paddingHorizontal: scaleSize(10),
    backgroundColor: COLORS.tertiary,
    height: '100%',
    borderRadius: scaleSize(20),
    paddingVertical: scaleSize(10),
  },
});
