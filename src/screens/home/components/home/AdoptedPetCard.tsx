import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { scaleSize } from '../../../../utils/DeviceUtils';
import { COLORS, FONTS } from '../../../../config';
import { Ionicons } from '@expo/vector-icons';

type AdoptedCardProps = {
  image: string;
  name: string;
  gender: string;
  address: string;
  kilometer: number;
};

const AdoptedPetCard: FC<AdoptedCardProps> = ({
  image,
  name,
  gender,
  address,
  kilometer,
}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.favouriteContainer}>
        <TouchableOpacity>
          <Ionicons
            name='heart'
            size={scaleSize(10)}
            color={COLORS.whitePrimary}
          />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.infoWrapper}>
        <View
          style={[
            styles.horizontalWrapper,
            { justifyContent: 'space-between' },
          ]}
        >
          <Text style={styles.name}>{name}</Text>
          <View style={styles.iconWrapper}>
            <Ionicons
              name='male'
              size={scaleSize(10)}
              color={COLORS.blue8EB1E5}
            />
          </View>
        </View>
        <View style={[styles.horizontalWrapper, { marginTop: scaleSize(6) }]}>
          <Ionicons
            name='location-sharp'
            size={scaleSize(8)}
            color={COLORS.grayABABAB}
          />
          <Text style={styles.address}>{address}</Text>
          <Text style={styles.address}> ({kilometer}km)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AdoptedPetCard;

const styles = StyleSheet.create({
  container: {
    width: scaleSize(129),
    minHeight: scaleSize(174),
    backgroundColor: COLORS.whitePrimary,
    borderRadius: scaleSize(8),
    marginRight: scaleSize(20),
  },
  image: {
    width: '100%',
    height: scaleSize(125.92),
    borderRadius: scaleSize(8),
    borderBottomRightRadius: scaleSize(30),
  },
  name: {
    ...FONTS.body5,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  infoWrapper: {
    paddingHorizontal: scaleSize(10),
    marginTop: scaleSize(10),
    marginBottom: scaleSize(13),
  },
  horizontalWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    ...FONTS.body8,
    color: COLORS.blackContent,
  },
  iconWrapper: {
    width: scaleSize(15),
    height: scaleSize(15),
    backgroundColor: COLORS.tertiary,
    borderRadius: scaleSize(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  favouriteContainer: {
    width: scaleSize(18),
    height: scaleSize(18),
    borderTopRightRadius: scaleSize(8),
    borderBottomLeftRadius: scaleSize(8),
    backgroundColor: COLORS.primary,
    display: 'flex',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
});