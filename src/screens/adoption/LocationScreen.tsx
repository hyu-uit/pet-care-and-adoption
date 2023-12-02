import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { COLORS, SIZES, STYLES, FONTS } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import {
  Entypo,
  Feather,
  FontAwesome5,
  MaterialIcons,
} from '@expo/vector-icons';

const LocationScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Entypo
          name='location'
          size={scaleSize(24)}
          color={COLORS.grayLight}
          style={styles.iconLocation}
        />
        <TextInput
          placeholder={'Near me'}
          onChangeText={() => {}}
          secureTextEntry={false}
          placeholderTextColor={COLORS.grayC2C2CE}
          style={styles.input}
        />
      </View>

      <TouchableOpacity
        style={{
          ...STYLES.horizontal,
          marginTop: scaleSize(20),
          justifyContent: 'flex-start',
          gap: scaleSize(8),
        }}
      >
        <MaterialIcons
          name='my-location'
          size={scaleSize(20)}
          color={COLORS.primary}
        />
        <Text style={styles.text}>Current location</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          ...STYLES.horizontal,
          marginTop: scaleSize(20),
          justifyContent: 'flex-start',
          gap: scaleSize(8),
        }}
      >
        <Feather name='map' size={scaleSize(20)} color={COLORS.primary} />
        <Text style={styles.text}>Select search area on map</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.background,
    flex: 1,
  },
  input: {
    ...STYLES.input,
    paddingLeft: scaleSize(42),
  },
  iconLocation: {
    position: 'absolute',
    top: scaleSize(25) - scaleSize(24) / 2,
    zIndex: 1000,
    left: scaleSize(10),
  },
  text: {
    ...FONTS.body3,
    color: COLORS.primary,
  },
});
