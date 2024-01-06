import { StyleSheet } from 'react-native';
import { scaleSize } from '../utils/DeviceUtils';
import { COLORS } from '../config';
import { View, Text } from 'react-native';
import React from 'react';

const SkeletonHome = () => {
  return (
    <View style={styles.container}>
      <View style={styles.image}></View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: scaleSize(10),
          marginTop: scaleSize(10),
        }}
      >
        <View>
          <View style={styles.text}></View>
          <View style={[styles.text, { marginTop: scaleSize(5) }]}></View>
        </View>
        <View style={styles.ava}></View>
      </View>
    </View>
  );
};

export default SkeletonHome;

const styles = StyleSheet.create({
  container: {
    width: scaleSize(161),
    height: scaleSize(218),
    backgroundColor: COLORS.whitePrimary,
    borderRadius: scaleSize(8),
  },
  image: {
    width: '100%',
    height: scaleSize(157),
    backgroundColor: COLORS.tertiary,
    borderRadius: scaleSize(8),
    borderBottomRightRadius: scaleSize(30),
  },
  text: {
    width: scaleSize(110),
    height: scaleSize(14),
    borderRadius: scaleSize(8),
    backgroundColor: COLORS.tertiary,
  },
  ava: {
    width: scaleSize(20),
    height: scaleSize(20),
    borderRadius: scaleSize(9),
    backgroundColor: COLORS.tertiary,
  },
});
