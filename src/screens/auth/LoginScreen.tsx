import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { COLORS, FONTS, ICONS, SIZES, STYLES } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import Button from '../../components/Button';
import { ButtonVariant } from '../../enums/ButtonVariant.enum';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigators/config';
import { SCREEN } from '../../navigators/AppRoute';

const LoginScreen = ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, SCREEN.LOGIN>) => {
  const onSignup = () => {
    navigation.navigate(SCREEN.SIGN_UP);
  };
  const onForgotPassword = () => {
    navigation.navigate(SCREEN.FORGOT_PASSWORD);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subTitle}>Enter your username and password</Text>

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
      <View style={[styles.inputWrapper, { marginTop: scaleSize(10) }]}>
        <Image
          source={require('../../assets/icons/lock.png')}
          height={10}
          width={10}
          style={styles.icon}
        />
        <TextInput
          placeholder={'Enter your username'}
          onChangeText={() => {}}
          secureTextEntry={true}
          placeholderTextColor={COLORS.grayC2C2CE}
          style={[styles.input]}
        />
      </View>

      <TouchableOpacity onPress={onForgotPassword}>
        <Text style={styles.forgot}>Forgot password?</Text>
      </TouchableOpacity>

      <Button
        onPress={() => {}}
        title='Login'
        style={{ marginTop: scaleSize(19) }}
      />

      <View style={styles.noAccountWrapper}>
        <Text style={styles.noAccount}>Don’t have an account? </Text>
        <TouchableOpacity onPress={onSignup}>
          <Text style={[styles.noAccount, { color: COLORS.primary }]}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.padding,
    flex: 1,
  },
  title: {
    ...FONTS.h1,
    marginTop: scaleSize(131),
    fontSize: scaleSize(30),
    color: COLORS.blackPrimary,
  },
  subTitle: {
    ...FONTS.body2,
    marginTop: scaleSize(10),
    color: COLORS.grayPrimary,
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
  icon: {
    ...STYLES.icon,
    position: 'absolute',
    zIndex: 100,
    left: scaleSize(24),
  },
  forgot: {
    ...FONTS.body4,
    color: COLORS.primary,
    textAlign: 'right',
    marginTop: scaleSize(20),
  },
  noAccount: {
    ...FONTS.body4,
    color: COLORS.gray828282,
    textAlign: 'center',
  },
  noAccountWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaleSize(10),
  },
});
