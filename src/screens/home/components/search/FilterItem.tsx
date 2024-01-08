import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { scaleSize } from '../../../../utils/DeviceUtils';
import { COLORS, FONTS } from '../../../../config';
import { FontAwesome } from '@expo/vector-icons';

type FilterItemProps = {
  title: string;
};
const FilterItem: FC<FilterItemProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default FilterItem;

const styles = StyleSheet.create({
  container: {
    minWidth: scaleSize(53),
    height: scaleSize(20),
    backgroundColor: COLORS.tertiary,
    borderWidth: scaleSize(1),
    borderColor: COLORS.grayLight,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: scaleSize(8),
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: scaleSize(5),
    borderRadius: scaleSize(5),
    marginRight: scaleSize(5),
  },
  title: {
    ...FONTS.body6,
    color: COLORS.primary,
  },
});
