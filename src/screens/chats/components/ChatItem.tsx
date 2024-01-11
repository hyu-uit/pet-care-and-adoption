import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../../config';
import { scaleSize } from '../../../utils/DeviceUtils';

const ChatItem = () => {
  return (
    <View style={styles.container}>
      <Text>ChatItem</Text>
    </View>
  );
};

export default ChatItem;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    minHeight: scaleSize(50),
    backgroundColor: COLORS.tertiary,
  },
});
