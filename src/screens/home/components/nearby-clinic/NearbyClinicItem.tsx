import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { scaleSize } from '../../../../utils/DeviceUtils';
import { COLORS, FONTS } from '../../../../config';
import { Ionicons } from '@expo/vector-icons';

type NearbyClinicItemProps = {
  name: string;
  star: number;
  rate: number;
  kilometer: number;
  image: string;
};
const NearbyClinicItem: FC<NearbyClinicItemProps> = ({
  name,
  star,
  rate,
  kilometer,
  image,
}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={{ paddingHorizontal: scaleSize(5) }}>
        <Text style={styles.name}>{name}</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: scaleSize(3),
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: scaleSize(3),
            }}
          >
            <Ionicons
              name='ios-star'
              size={scaleSize(9)}
              color={COLORS.yellowPrimay}
            />
            <Text style={styles.rate}>{star}</Text>
            <Text style={styles.rate}> ({rate})</Text>
            <Text style={styles.rate}>({kilometer}km)</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyClinicItem;

const styles = StyleSheet.create({
  container: {
    width: scaleSize(162),
    height: scaleSize(193),
    backgroundColor: COLORS.whitePrimary,
    borderRadius: scaleSize(8),
    marginRight: scaleSize(18),
  },
  image: {
    width: '100%',
    height: scaleSize(143),
    borderRadius: scaleSize(8),
    resizeMode: 'cover',
  },
  name: {
    ...FONTS.body7,
    color: COLORS.blackContent,
    marginTop: scaleSize(7),
  },
  rate: {
    ...FONTS.body8,
    color: COLORS.blackContent,
  },
});
