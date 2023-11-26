import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { FC } from 'react';
import { scaleSize } from '../../../../utils/DeviceUtils';
import { COLORS, FONTS } from '../../../../config';
import { Ionicons } from '@expo/vector-icons';

type NearByCardProps = {
  name: string;
  star: number;
  rate: number;
  kilometer: number;
  image: string;
};

const NearByCard: FC<NearByCardProps> = ({
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
            }}
          >
            <Ionicons
              name='ios-star'
              size={scaleSize(9)}
              color={COLORS.yellowPrimay}
            />
            <Text style={styles.rate}>{star}</Text>
            <Text style={styles.rate}> ({rate})</Text>
          </View>
          <Text style={styles.rate}>({kilometer}km)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NearByCard;

const styles = StyleSheet.create({
  container: {
    width: scaleSize(148),
    height: scaleSize(138),
    backgroundColor: COLORS.whitePrimary,
    borderRadius: scaleSize(8),
  },
  image: {
    width: '100%',
    height: scaleSize(102),
    borderRadius: scaleSize(8),
    resizeMode: 'cover',
  },
  name: {
    ...FONTS.body7,
    color: COLORS.blackContent,
  },
  rate: {
    ...FONTS.body8,
    color: COLORS.blackContent,
  },
});
