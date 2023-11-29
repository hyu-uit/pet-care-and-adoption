import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, SIZES, STYLES, FONTS } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const MenuScreen = () => {
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
      <TouchableOpacity style={styles.menuWrapper}>
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
    </View>
  );
};

export default MenuScreen;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.padding,
  },
  menuWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: scaleSize(39),
    marginTop: scaleSize(30),
  },
  menuTitle: {
    ...FONTS.body1,
    fontWeight: '600',
  },
  subTitle: {
    ...FONTS.body7,
    marginTop: scaleSize(5),
  },
});
