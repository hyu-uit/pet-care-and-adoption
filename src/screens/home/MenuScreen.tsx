import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { COLORS, SIZES, STYLES, FONTS, IMAGES } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { resetState } from '../../store/shared/shared.slice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigators/config';
import { SCREEN } from '../../navigators/AppRoute';

const MenuScreen = ({
  navigation,
}: NativeStackScreenProps<HomeStackParamList, SCREEN.MENU>) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    navigation.reset({ index: 0, routes: [{ name: SCREEN.AUTH_STACK }] });
    dispatch(resetState());
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuWrapper}>
        <View>
          <Text style={styles.menuTitle}>Settings</Text>
          <Text style={styles.subTitle}>Change your settings</Text>
        </View>
        <FontAwesome5
          name='arrow-right'
          size={scaleSize(15)}
          color={COLORS.blackContent}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuWrapper}>
        <View>
          <Text style={styles.menuTitle}>FAQs</Text>
          <Text style={styles.subTitle}>Frequently Asked Questions</Text>
        </View>
        <FontAwesome5
          name='arrow-right'
          size={scaleSize(15)}
          color={COLORS.blackContent}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuWrapper} onPress={onLogout}>
        <View>
          <Text style={styles.menuTitle}>Logout</Text>
          <Text style={styles.subTitle}>
            In case you want to switch account
          </Text>
        </View>
        <MaterialIcons
          name='logout'
          size={scaleSize(20)}
          color={COLORS.blackContent}
        />
      </TouchableOpacity>
      <Image source={IMAGES.CAT_MENU} style={styles.catMenu} />
    </View>
  );
};

export default MenuScreen;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.background,
  },
  menuWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: scaleSize(39),
    marginTop: scaleSize(30),
    paddingHorizontal: SIZES.padding,
  },
  menuTitle: {
    ...FONTS.body1,
    fontWeight: '600',
  },
  subTitle: {
    ...FONTS.body7,
    marginTop: scaleSize(5),
  },
  catMenu: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: scaleSize(208),

    backgroundColor: COLORS.background,
    alignSelf: 'center',
  },
});
