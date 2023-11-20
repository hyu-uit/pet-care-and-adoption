import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES, STYLES } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import Button from '../../components/Button';
import { AuthStackParamList } from '../../navigators/config';
import { SCREEN } from '../../navigators/AppRoute';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const SignupScreen = ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, SCREEN.SIGN_UP>) => {
  const onLogin = () => {
    navigation.navigate(SCREEN.LOGIN);
  };

  const onSignup = () => {
    navigation.navigate(SCREEN.VERIFY);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <Text style={styles.subTitle}>Enter your credentials to continue</Text>
      <View style={[styles.inputWrapper, { marginTop: scaleSize(20) }]}>
        <Image
          source={require('../../assets/icons/name.png')}
          height={10}
          width={10}
          style={styles.icon}
        />
        <TextInput
          placeholder={'Enter your name'}
          onChangeText={() => {}}
          secureTextEntry={false}
          placeholderTextColor={COLORS.grayC2C2CE}
          style={[styles.input]}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Image
          source={require('../../assets/icons/address.png')}
          height={10}
          width={10}
          style={styles.icon}
        />
        <TextInput
          placeholder={'Enter your address'}
          onChangeText={() => {}}
          secureTextEntry={false}
          placeholderTextColor={COLORS.grayC2C2CE}
          style={[styles.input]}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Image
          source={require('../../assets/icons/phone.png')}
          height={10}
          width={10}
          style={styles.icon}
        />
        <TextInput
          placeholder={'Enter your phone number'}
          onChangeText={() => {}}
          secureTextEntry={false}
          placeholderTextColor={COLORS.grayC2C2CE}
          style={[styles.input]}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Image
          source={require('../../assets/icons/user.png')}
          height={10}
          width={10}
          style={styles.icon}
        />
        <TextInput
          placeholder={'Enter your username'}
          onChangeText={() => {}}
          secureTextEntry={false}
          placeholderTextColor={COLORS.grayC2C2CE}
          style={[styles.input]}
        />
      </View>
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

      <Button
        title='Sign up'
        onPress={onSignup}
        style={{ marginTop: scaleSize(20) }}
      />

      <View style={styles.alreadyWrapper}>
        <Text style={styles.already}>Already have an account? </Text>
        <TouchableOpacity onPress={onLogin}>
          <Text style={[styles.already, { color: COLORS.primary }]}>
            Log in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.padding,
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
    marginTop: scaleSize(10),
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
  already: {
    ...FONTS.body4,
    color: COLORS.gray828282,
    textAlign: 'center',
  },
  alreadyWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaleSize(10),
  },
});
