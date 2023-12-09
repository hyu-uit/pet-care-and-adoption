import { View, Text, StyleSheet, Image } from 'react-native';
import React, { FC } from 'react';
import { COLORS, SIZES } from '../../../config';
import { scaleSize } from '../../../utils/DeviceUtils';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

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
            uri: 'https://i.pinimg.com/736x/d8/55/c6/d855c66f95e9d3babeebd1e88bf4026d.jpg',
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
            uri: 'https://i.pinimg.com/736x/d8/55/c6/d855c66f95e9d3babeebd1e88bf4026d.jpg',
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
    paddingHorizontal: scaleSize(10),
    backgroundColor: COLORS.tertiary,
    height: '100%',
    borderRadius: scaleSize(20),
    paddingVertical: scaleSize(10),
  },
});
