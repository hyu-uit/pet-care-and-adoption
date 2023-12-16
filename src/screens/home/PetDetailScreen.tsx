import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import { COLORS, SIZES, FONTS, IMAGES, STYLES } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { HomeStackParamList } from '../../navigators/config';
import { SCREEN } from '../../navigators/AppRoute';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';
import { Post } from '../../store/post/response/get-add.response';

const PetDetailScreen = ({
  navigation,
}: NativeStackScreenProps<HomeStackParamList, SCREEN.PET_DETAIL>) => {
  const route = useRoute();

  const onGoBack = () => {
    navigation.goBack();
  };

  const petData = route.params?.petData;

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <View>
        <TouchableOpacity style={styles.backIcon} onPress={onGoBack}>
          <Ionicons
            name='chevron-back-outline'
            size={scaleSize(30)}
            color={COLORS.whitePrimary}
          />
        </TouchableOpacity>
        <Image
          source={{
            uri: 'https://media.istockphoto.com/id/467923438/photo/silly-dog-tilts-head-in-front-of-barn.jpg?s=612x612&w=0&k=20&c=haPwfoPl_ggvNKAga_Qv4r88qWdcpH-qZ5DaBba6-8U=',
          }}
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <View style={styles.horizontalWrapper}>
            <Text style={styles.name}>{petData.name}</Text>
            <View style={styles.iconWrapper}>
              <Ionicons
                name='male'
                size={scaleSize(20)}
                color={COLORS.blue8EB1E5}
              />
            </View>
          </View>
          <View
            style={[
              styles.horizontalWrapper,
              { marginTop: scaleSize(10), paddingRight: scaleSize(36) },
            ]}
          >
            <View style={styles.horizontalWrapper}>
              <Feather
                name='clock'
                size={scaleSize(15)}
                color={COLORS.primary}
              />
              <Text style={styles.infoText}>4 month(s)</Text>
            </View>
            <View style={styles.horizontalWrapper}>
              <Image source={IMAGES.FOOT} style={styles.iconFoot} />
              <Text style={styles.infoText}>Phu Quoc</Text>
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
              size={scaleSize(15)}
              color={COLORS.primary}
            />
            <Text style={styles.infoText}>Sai Gon</Text>
            <Text style={styles.infoText}> (3km)</Text>
          </View>
        </View>
      </View>
      <View
        style={[
          styles.horizontalWrapper,
          { marginTop: scaleSize(100), paddingHorizontal: SIZES.padding },
        ]}
      >
        <View style={styles.detailCell}>
          <Text style={styles.detailText}>Status</Text>
          <Text
            style={[
              styles.detailText,
              {
                ...FONTS.body4,
                fontFamily: 'CercoDEMO-Black',
                fontWeight: 'bold',
                color: COLORS.primary,
                marginTop: scaleSize(7),
              },
            ]}
          >
            Adopt
          </Text>
        </View>
        <View style={styles.detailCell}>
          <Text style={styles.detailText}>Category</Text>
          <Text
            style={[
              styles.detailText,
              {
                ...FONTS.body4,
                fontFamily: 'CercoDEMO-Black',
                fontWeight: 'bold',
                color: COLORS.primary,
                marginTop: scaleSize(7),
              },
            ]}
          >
            DOG
          </Text>
        </View>
        <View style={styles.detailCell}>
          <Text style={styles.detailText}>Weight</Text>
          <Text
            style={[
              styles.detailText,
              {
                ...FONTS.body4,
                fontFamily: 'CercoDEMO-Black',
                fontWeight: 'bold',
                color: COLORS.primary,
                marginTop: scaleSize(7),
              },
            ]}
          >
            1.3KG
          </Text>
        </View>
        <View style={styles.detailCell}>
          <Text style={styles.detailText}>Vaccinated</Text>
          <Text
            style={[
              styles.detailText,
              {
                ...FONTS.body4,
                fontFamily: 'CercoDEMO-Black',
                fontWeight: 'bold',
                color: COLORS.primary,
                marginTop: scaleSize(7),
              },
            ]}
          >
            YES
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.horizontalWrapper,
          { marginTop: scaleSize(20), paddingHorizontal: SIZES.padding },
        ]}
      >
        <View style={styles.horizontalWrapper}>
          <Image
            source={{
              uri: 'https://api.nongthonviet.com.vn/media/2023/08/26/64e9bf46b7eda301891a99db_ca-si-mat-na-tap-4hippohappy-1692978300539212339639-1693035914-70-widthheight.webp',
            }}
            style={styles.ownerImage}
          />
          <View style={{ marginLeft: scaleSize(10) }}>
            <Text style={styles.postedBy}>Posted by</Text>
            <Text style={styles.ownerName}>Miihc</Text>
          </View>
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
      <Text style={styles.comment}>
        Tôi đã lụm được nhỏ này, ai mất liên hệ tôi liền nha!
      </Text>
      <View style={{ paddingHorizontal: SIZES.padding }}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Adopt me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PetDetailScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.background,
  },
  image: {
    width: '100%',
    height: scaleSize(360),
    resizeMode: 'cover',
    backgroundColor: COLORS.primary,
  },
  infoContainer: {
    width: scaleSize(342),
    height: scaleSize(118),
    padding: scaleSize(15),
    backgroundColor: COLORS.whitePrimary,
    borderRadius: scaleSize(15),
    position: 'absolute',
    bottom: -scaleSize(77),
    left: SIZES.WindowWidth / 2 - scaleSize(342) / 2,
    borderWidth: scaleSize(1),
    borderColor: COLORS.grayLight,
    paddingHorizontal: scaleSize(22),
  },
  name: {
    ...FONTS.h2,
    color: COLORS.primary,
  },
  iconWrapper: {
    width: scaleSize(30),
    height: scaleSize(30),
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
    ...FONTS.body4,
    color: COLORS.blackContent,
    marginLeft: scaleSize(4),
  },
  iconFoot: {
    width: scaleSize(15),
    height: scaleSize(15),
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
  detailCell: {
    width: scaleSize(70),
    height: scaleSize(70),
    backgroundColor: COLORS.tertiary,
    borderRadius: scaleSize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailText: {
    ...FONTS.body7,
    color: COLORS.primary,
  },
  ownerImage: {
    width: scaleSize(40),
    height: scaleSize(40),
    borderRadius: scaleSize(20),
    resizeMode: 'cover',
  },
  postedBy: {
    ...FONTS.body7,
    color: COLORS.blackContent,
  },
  ownerName: {
    ...FONTS.body4,
    fontWeight: 'bold',
    color: COLORS.blackContent,
    marginTop: scaleSize(5),
  },
  contactWrapper: {
    width: scaleSize(30),
    height: scaleSize(30),
    borderRadius: scaleSize(5),
    backgroundColor: COLORS.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comment: {
    ...FONTS.body4,
    paddingHorizontal: SIZES.padding,
    marginTop: scaleSize(10),
  },
  button: {
    ...STYLES.button,
    marginTop: scaleSize(20),
  },
  buttonText: {
    ...STYLES.buttonText,
  },
  backIcon: {
    position: 'absolute',
    top: scaleSize(45),
    left: scaleSize(10),
    zIndex: 1000,
  },
});
