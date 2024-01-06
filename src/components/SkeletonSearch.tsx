import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { scaleSize } from '../utils/DeviceUtils';
import { COLORS, FONTS, SIZES } from '../config';

const SkeletonSearch = () => {
  return (
    <View style={styles.container}>
      <View style={styles.image}></View>

      <View style={styles.infoContainer}>
        <View style={styles.horizontalWrapper}>
          <View style={styles.title}></View>
          <View style={styles.iconWrapper}></View>
        </View>
        <View style={{ marginTop: scaleSize(10) }}>
          <View style={styles.content}></View>
          <View style={styles.content}></View>
        </View>
      </View>
    </View>
  );
};

export default SkeletonSearch;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scaleSize(210),
    marginBottom: scaleSize(20),
  },
  image: {
    height: scaleSize(171),
    backgroundColor: COLORS.tertiary,
    borderRadius: scaleSize(20),
    marginBottom: scaleSize(20),
  },
  infoContainer: {
    width: scaleSize(227),
    minHeight: scaleSize(89),
    padding: scaleSize(15),
    backgroundColor: COLORS.whitePrimary,
    borderRadius: scaleSize(15),
    position: 'absolute',
    bottom: 0,
    left: (SIZES.WindowWidth - scaleSize(48)) / 2 - scaleSize(227) / 2,
    borderWidth: scaleSize(1),
    borderColor: COLORS.grayLight,
  },
  name: {
    ...FONTS.h2,
    color: COLORS.primary,
  },
  iconWrapper: {
    width: scaleSize(23),
    height: scaleSize(23),
    backgroundColor: COLORS.tertiary,
    borderRadius: scaleSize(23),
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    width: '80%',
    height: scaleSize(20),
    backgroundColor: COLORS.tertiary,
    borderRadius: scaleSize(8),
  },
  content: {
    width: '90%',
    height: scaleSize(10),
    backgroundColor: COLORS.tertiary,
    borderRadius: scaleSize(8),
    marginBottom: scaleSize(5),
  },
});
