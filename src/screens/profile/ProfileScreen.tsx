import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, FONTS } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import { MaterialIcons } from '@expo/vector-icons';
import ProfileMyPets from './components/ProfileMyPets';
import ProfileMyLovedPets from './components/ProfileMyLovedPets';
import ProfileLostPets from './ProfileLostPets';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../navigators/config';
import { SCREEN } from '../../navigators/AppRoute';
import ProfileRequest from './components/ProfileRequest';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const ProfileScreen = ({
  navigation,
}: NativeStackScreenProps<ProfileStackParamList, SCREEN.PROFILE>) => {
  const [tab, setTab] = useState<number>(0);

  const myName = useSelector((state: RootState) => state.shared.user.name);
  const myAvatar = useSelector((state: RootState) => state.shared.user.avatar);

  const onEditProfile = () => {
    navigation.navigate(SCREEN.EDIT_PROFILE);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
        <View style={styles.profileWrapper}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{
                uri: myAvatar
                  ? myAvatar
                  : 'https://images.unsplash.com/photo-1615751072497-5f5169febe17?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D',
              }}
              style={styles.image}
            />
            <View style={{ marginLeft: scaleSize(10) }}>
              <Text style={styles.name}>{myName}</Text>
              <Text style={styles.status}>Pet owner</Text>
            </View>
          </View>

          <TouchableOpacity onPress={onEditProfile}>
            <MaterialIcons
              name='mode-edit'
              size={scaleSize(20)}
              color={COLORS.primary}
              style={{ marginRight: scaleSize(10) }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: '100%',
            height: scaleSize(40),
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: scaleSize(20),
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setTab(0);
            }}
          >
            <Text
              style={[
                styles.tabTitle,
                { color: tab === 0 ? COLORS.primary : COLORS.grayPrimary },
              ]}
            >
              My pets
            </Text>
            <View
              style={[
                styles.selected,
                {
                  backgroundColor:
                    tab === 0 ? COLORS.primary : COLORS.transparent,
                },
              ]}
            ></View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTab(1);
            }}
          >
            <Text
              style={[
                styles.tabTitle,
                { color: tab === 1 ? COLORS.primary : COLORS.grayPrimary },
              ]}
            >
              Loved
            </Text>
            <View
              style={[
                styles.selected,
                {
                  backgroundColor:
                    tab === 1 ? COLORS.primary : COLORS.transparent,
                },
              ]}
            ></View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTab(2);
            }}
          >
            <Text
              style={[
                styles.tabTitle,
                { color: tab === 2 ? COLORS.primary : COLORS.grayPrimary },
              ]}
            >
              Lost pets
            </Text>
            <View
              style={[
                styles.selected,
                {
                  backgroundColor:
                    tab === 2 ? COLORS.primary : COLORS.transparent,
                },
              ]}
            ></View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTab(3);
            }}
          >
            <Text
              style={[
                styles.tabTitle,
                { color: tab === 3 ? COLORS.primary : COLORS.grayPrimary },
              ]}
            >
              Request
            </Text>
            <View
              style={[
                styles.selected,
                {
                  backgroundColor:
                    tab === 3 ? COLORS.primary : COLORS.transparent,
                },
              ]}
            ></View>
          </TouchableOpacity>
        </View>
      </View>

      {tab === 0 && <ProfileMyPets navigation={navigation} />}
      {tab === 1 && <ProfileMyLovedPets />}
      {tab === 2 && <ProfileLostPets />}
      {tab === 3 && <ProfileRequest />}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  header: {
    width: '100%',
    height: scaleSize(218),
    backgroundColor: COLORS.tertiary,
    borderBottomLeftRadius: scaleSize(40),
    borderBottomRightRadius: scaleSize(40),
    paddingHorizontal: SIZES.padding,
  },
  headerText: {
    textAlign: 'center',
    paddingTop: SIZES.bottomBarHeight,
    ...FONTS.h2,
  },
  profileWrapper: {
    width: '100%',
    height: scaleSize(70),
    backgroundColor: COLORS.whitePrimary,
    marginTop: scaleSize(15),
    borderRadius: scaleSize(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: scaleSize(60),
    height: scaleSize(60),
    borderRadius: scaleSize(30),
    marginLeft: scaleSize(5),
  },
  name: {
    ...FONTS.h3,
    fontWeight: 'bold',
  },
  status: {
    ...FONTS.body6,
  },
  tabTitle: {
    ...FONTS.body4,
    fontWeight: '500',
    color: COLORS.grayPrimary,
    marginBottom: scaleSize(5),
  },
  selected: {
    width: '100%',
    height: scaleSize(5),
    flexShrink: 0,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: scaleSize(10),
    borderTopRightRadius: scaleSize(10),
  },
});
