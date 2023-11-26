import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { scaleSize } from '../../../../utils/DeviceUtils';
import { COLORS, SIZES, FONTS, IMAGES } from '../../../../config';
import { Feather, Ionicons } from '@expo/vector-icons';

type PetSearchCardProps = {
  image: string;
  name: string;
  age: number;
  type: string;
  location: string;
  kilometer: number;
};
const PetSearchCard: FC<PetSearchCardProps> = ({
  image,
  name,
  age,
  type,
  location,
  kilometer,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.favouriteContainer}>
        <TouchableOpacity>
          <Ionicons
            name='heart'
            size={scaleSize(21)}
            color={COLORS.whitePrimary}
          />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.horizontalWrapper}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.iconWrapper}>
            <Ionicons
              name='male'
              size={scaleSize(18)}
              color={COLORS.blue8EB1E5}
            />
          </View>
        </View>
        <View style={[styles.horizontalWrapper, { marginTop: scaleSize(10) }]}>
          <View style={styles.horizontalWrapper}>
            <Feather name='clock' size={scaleSize(10)} color={COLORS.primary} />
            <Text style={styles.infoText}>{age} month(s)</Text>
          </View>
          <View style={styles.horizontalWrapper}>
            <Image source={IMAGES.FOOT} style={styles.iconFoot} />
            <Text style={styles.infoText}>{type}</Text>
          </View>
        </View>
        <View
          style={[
            styles.horizontalWrapper,
            { marginTop: scaleSize(5), justifyContent: 'flex-start' },
          ]}
        >
          <Ionicons
            name='location-sharp'
            size={scaleSize(10)}
            color={COLORS.primary}
          />
          <Text style={styles.infoText}>{location}</Text>
          <Text style={styles.infoText}> ({kilometer}km)</Text>
        </View>
      </View>
    </View>
  );
};

export default PetSearchCard;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scaleSize(227),
    marginBottom: scaleSize(20),
  },
  image: {
    width: '100%',
    height: scaleSize(171),
    borderRadius: scaleSize(20),
  },
  infoContainer: {
    width: scaleSize(227),
    height: scaleSize(89),
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
  infoText: {
    ...FONTS.body7,
    color: COLORS.blackContent,
    marginLeft: scaleSize(4),
  },
  iconFoot: {
    width: scaleSize(8),
    height: scaleSize(8),
  },
  favouriteContainer: {
    position: 'absolute',
    backgroundColor: COLORS.primary,
    width: scaleSize(45),
    height: scaleSize(48),
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: scaleSize(20),
    borderBottomLeftRadius: scaleSize(20),
    top: 0,
    right: 0,
  },
});
