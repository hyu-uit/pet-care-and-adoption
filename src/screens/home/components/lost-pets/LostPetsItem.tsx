import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { FC } from 'react';
import { scaleSize } from '../../../../utils/DeviceUtils';
import { COLORS, FONTS } from '../../../../config';
import { Ionicons } from '@expo/vector-icons';
import { SEX } from '../../../../types/enum/sex.enum';

type LostPetsItemProps = {
  image: string;
  gender: string;
  name: string;
  district: string;
  province: string;
  onDetail: () => void;
};
const LostPetsItem: FC<LostPetsItemProps> = ({
  image,
  gender,
  name,
  district,
  province,
  onDetail,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onDetail}>
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
              name={gender === SEX.MALE ? 'male' : 'female'}
              size={scaleSize(10)}
              color={
                gender === SEX.MALE ? COLORS.blue8EB1E5 : COLORS.pinkF672E1
              }
            />
          </View>
        </View>
        <View style={[styles.horizontalWrapper, { marginTop: scaleSize(6) }]}>
          <Ionicons
            name='location-sharp'
            size={scaleSize(8)}
            color={COLORS.grayABABAB}
          />
          <Text style={styles.address}>
            {district}, {province}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LostPetsItem;

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
});
