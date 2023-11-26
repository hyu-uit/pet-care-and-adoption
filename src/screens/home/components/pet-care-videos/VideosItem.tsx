import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { scaleSize } from '../../../../utils/DeviceUtils';
import { COLORS, FONTS } from '../../../../config';
import { Ionicons } from '@expo/vector-icons';

type VideoItemProps = {
  image: string;
  title: string;
  link: string;
};
const VideosItem: FC<VideoItemProps> = ({ image, title, link }) => {
  return (
    <View style={styles.container}>
      <View style={styles.favouriteContainer}>
        <TouchableOpacity>
          <Ionicons
            name='heart'
            size={scaleSize(11)}
            color={COLORS.whitePrimary}
          />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default VideosItem;
const styles = StyleSheet.create({
  container: {
    width: scaleSize(162),
    height: scaleSize(218),
    backgroundColor: COLORS.whitePrimary,
    borderRadius: scaleSize(8),
    marginRight: scaleSize(20),
  },
  image: {
    width: '100%',
    height: scaleSize(157),
    borderRadius: scaleSize(8),
    borderBottomRightRadius: scaleSize(30),
  },
  title: {
    ...FONTS.body5,
    fontWeight: 'bold',
    marginTop: scaleSize(13),
    color: COLORS.primary,
    paddingHorizontal: scaleSize(12),
  },
  favouriteContainer: {
    position: 'absolute',
    backgroundColor: COLORS.primary,
    width: scaleSize(22),
    height: scaleSize(22),
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: scaleSize(8),
    borderBottomLeftRadius: scaleSize(8),
    top: 0,
    right: 0,
  },
});
