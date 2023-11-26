import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { scaleSize } from '../../../../utils/DeviceUtils';
import { COLORS, IMAGES } from '../../../../config';

const CategoryItem = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={IMAGES.CAT} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    width: scaleSize(60),
    height: scaleSize(60),
    borderRadius: scaleSize(15),
    backgroundColor: COLORS.tertiary,
    borderWidth: scaleSize(1),
    borderColor: COLORS.grayLight,
    marginRight: scaleSize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: scaleSize(50),
    height: scaleSize(50),
    resizeMode: 'contain',
  },
});
