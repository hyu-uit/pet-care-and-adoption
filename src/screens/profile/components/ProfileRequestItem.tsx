import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { scaleSize } from '../../../utils/DeviceUtils';
import { COLORS, SIZES, FONTS, IMAGES } from '../../../config';
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

type ProfileRequestProps = {
  imagePet: string;
  imageUser: string;
  name: string;
  sent?: boolean;
};

const ProfileRequestItem: FC<ProfileRequestProps> = ({
  imagePet,
  imageUser,
  name,
  sent,
}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={{
          uri: imagePet,
        }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <View style={styles.horizontalWrapper}>
          <View style={styles.horizontalWrapper}>
            <Image
              source={{
                uri: imageUser,
              }}
              style={styles.profileImg}
            />
            <Text style={styles.name}>{name}</Text>
          </View>
          <View style={styles.horizontalWrapper}>
            <TouchableOpacity
              style={[styles.contactWrapper, { marginRight: scaleSize(10) }]}
            >
              <FontAwesome
                name='phone'
                size={scaleSize(19)}
                color={COLORS.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactWrapper}>
              <MaterialCommunityIcons
                name='email'
                size={scaleSize(19)}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {!sent && (
          <View
            style={[
              styles.horizontalWrapper,
              { marginTop: scaleSize(10), width: '50%', alignSelf: 'center' },
            ]}
          >
            <Text style={styles.option}>Adopted</Text>
            <TouchableOpacity>
              <AntDesign
                name='checkcircle'
                size={scaleSize(24)}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        )}
        <View
          style={[
            styles.horizontalWrapper,
            { marginTop: scaleSize(10), width: '50%', alignSelf: 'center' },
          ]}
        >
          <Text style={styles.option}>{sent ? 'Cancel' : 'Denied'}</Text>
          <TouchableOpacity>
            <AntDesign
              name='closecircle'
              size={scaleSize(24)}
              color={COLORS.redPrimary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileRequestItem;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scaleSize(350),
    marginBottom: scaleSize(20),
  },
  image: {
    width: '100%',
    height: scaleSize(300),
    borderRadius: scaleSize(20),
  },
  infoContainer: {
    width: scaleSize(227),
    minHeight: scaleSize(110),
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
    ...FONTS.body4,
    marginLeft: scaleSize(5),
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
  profileImg: {
    width: scaleSize(36),
    height: scaleSize(36),
    borderRadius: scaleSize(18),
    resizeMode: 'cover',
  },
  contactWrapper: {
    width: scaleSize(30),
    height: scaleSize(30),
    borderRadius: scaleSize(5),
    backgroundColor: COLORS.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    ...FONTS.body6,
  },
});
