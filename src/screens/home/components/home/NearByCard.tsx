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
  address;
  onNavigateToMap: () => void;
};

const NearByCard: FC<NearByCardProps> = ({
  name,
  star,
  rate,
  kilometer,
  image,
  address,
  onNavigateToMap,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onNavigateToMap}>
      <Image source={{ uri: image }} style={styles.image} />
      <View
        style={{ paddingHorizontal: scaleSize(5), marginTop: scaleSize(5) }}
      >
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
              marginTop: scaleSize(5),
              marginBottom: scaleSize(5),
            }}
          >
            <Ionicons
              name='location-sharp'
              size={scaleSize(15)}
              color={COLORS.primary}
            />
            <Text style={styles.rate}>{address}</Text>
          </View>
          {/* <Text style={styles.rate}>({kilometer}km)</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NearByCard;

const styles = StyleSheet.create({
  container: {
    width: scaleSize(148),
    minHeight: scaleSize(138),
    backgroundColor: COLORS.whitePrimary,
    borderRadius: scaleSize(8),
    marginRight: scaleSize(15),
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
    fontFamily: 'CercoDEMO-Bold',
  },
  rate: {
    flex: 1,
    ...FONTS.body8,
    color: COLORS.blackContent,
  },
});
