import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { scaleSize } from '../../../../utils/DeviceUtils';
import { COLORS, FONTS } from '../../../../config';

type TitleProps = {
  title: string;
  onSeeAll: () => void;
};

const Title: FC<TitleProps> = ({ title, onSeeAll }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onSeeAll}>
        <Text style={styles.allButtonText}>See all</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scaleSize(40),
    borderRadius: scaleSize(15),
    backgroundColor: COLORS.whitePrimary,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaleSize(15),
    alignItems: 'center',
    marginTop: scaleSize(20),
  },
  title: {
    ...FONTS.body4,
    fontWeight: 'bold',
    color: COLORS.blackPrimary,
  },
  allButtonText: {
    ...FONTS.body4,
    color: COLORS.primary,
  },
});
