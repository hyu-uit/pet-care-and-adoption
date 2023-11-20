import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import React from 'react';
import { COLORS, SIZES, FONTS, STYLES } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import Button from '../../components/Button';

const NewPasswordScreen = () => {
  const onSend = () => {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot password</Text>
      <Text style={styles.subTitle}>Please enter your new password</Text>
      <View style={styles.inputWrapper}>
        <Image
          source={require('../../assets/icons/lock.png')}
          height={10}
          width={10}
          style={styles.icon}
        />
        <TextInput
          placeholder={'Enter your password'}
          onChangeText={() => {}}
          secureTextEntry={false}
          placeholderTextColor={COLORS.grayC2C2CE}
          style={[styles.input]}
        />
      </View>
      <View style={[styles.inputWrapper, { marginTop: scaleSize(10) }]}>
        <Image
          source={require('../../assets/icons/lock.png')}
          height={10}
          width={10}
          style={styles.icon}
        />
        <TextInput
          placeholder={'Confirm your password'}
          onChangeText={() => {}}
          secureTextEntry={false}
          placeholderTextColor={COLORS.grayC2C2CE}
          style={[styles.input]}
        />
      </View>

      <Button
        title='Reset Password'
        onPress={onSend}
        style={{ marginTop: scaleSize(20) }}
      />
    </View>
  );
};

export default NewPasswordScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.background,
  },
  title: {
    ...FONTS.h1,
    marginTop: scaleSize(89),
    fontSize: scaleSize(30),
    color: COLORS.blackPrimary,
  },
  subTitle: {
    ...FONTS.body2,
    marginTop: scaleSize(10),
    color: COLORS.grayPrimary,
  },
  icon: {
    ...STYLES.icon,
    position: 'absolute',
    zIndex: 100,
    left: scaleSize(24),
  },
  input: {
    ...STYLES.input,
    paddingLeft: scaleSize(58),
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleSize(20),
  },
});
