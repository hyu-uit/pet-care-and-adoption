import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../../config';
import { scaleSize } from '../../../utils/DeviceUtils';
import { SEX } from '../../../types/enum/sex.enum';

type AdoptedCardProps = {
  image: string;
  name: string;
  gender: string;
  isAdopt: boolean;
  onDetail: () => void;
};

const MyPostCard: FC<AdoptedCardProps> = ({
  image,
  name,
  gender,
  onDetail,
  isAdopt,
}) => {
  console.log(image);
  return (
    <TouchableOpacity style={styles.container} onPress={onDetail}>
      <Image source={{ uri: image ? image[0] : '' }} style={styles.image} />
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
        <View
          style={[
            styles.horizontalWrapper,
            {
              marginTop: scaleSize(6),
              backgroundColor: COLORS.tertiary,
              padding: scaleSize(5),
              alignSelf: 'flex-start',
              borderRadius: scaleSize(3),
            },
          ]}
        >
          <Text style={{ ...FONTS.body6, color: COLORS.primary }}>
            {isAdopt ? 'Adopt' : 'Lost'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MyPostCard;

const styles = StyleSheet.create({
  container: {
    width: scaleSize(129),
    minHeight: scaleSize(150),
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
  },
  address: {
    ...FONTS.body8,
    color: COLORS.blackContent,
    paddingRight: scaleSize(5),
    paddingLeft: scaleSize(1),
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
