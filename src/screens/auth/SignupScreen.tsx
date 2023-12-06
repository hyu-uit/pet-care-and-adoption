import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, SIZES, STYLES } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import Button from '../../components/Button';
import { AuthStackParamList } from '../../navigators/config';
import { SCREEN } from '../../navigators/AppRoute';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import { AuthSignupREQ } from '../../store/auth/request/auth-signup.request';
import { useSignupMutation } from '../../store/auth/auth.api';
import Popup from '../../components/Popup';

const SignupScreen = ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, SCREEN.SIGN_UP>) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthSignupREQ>();

  const [signup, { isLoading }] = useSignupMutation();
  const [isPopupShow, setIsPopupShow] = useState<boolean>(false);

  const password = watch('password', '');

  const onLogin = () => {
    navigation.navigate(SCREEN.LOGIN);
  };

  const handleSignup = async (data: AuthSignupREQ) => {
    // navigation.navigate(SCREEN.VERIFY);
    try {
      await signup(data).unwrap();
      navigation.navigate(SCREEN.VERIFY, {
        signupInfo: data,
      });
    } catch (error) {
      if (error.originalStatus === 200) {
        navigation.navigate(SCREEN.VERIFY, {
          signupInfo: data,
        });
        return;
      }
      setIsPopupShow(true);
    }
  };

  const onClosePopup = () => {
    setIsPopupShow(false);
  };

  return (
    <View style={styles.container}>
      <Popup
        open={isPopupShow}
        onCancel={onClosePopup}
        onSubmit={() => {}}
        title='Sign up failed'
        content='Please try it again!'
      />
      <Text style={styles.title}>Sign up</Text>
      <Text style={styles.subTitle}>Enter your credentials to continue</Text>
      <Controller
        control={control}
        name='name'
        render={({
          field: { value, onBlur, onChange },
          fieldState: { error },
        }) => (
          <View style={[styles.inputWrapper, { marginTop: scaleSize(20) }]}>
            <Image
              source={require('../../assets/icons/name.png')}
              height={10}
              width={10}
              style={styles.icon}
            />
            <TextInput
              placeholder={'Enter your name'}
              onChangeText={onChange}
              value={value}
              secureTextEntry={false}
              placeholderTextColor={COLORS.grayC2C2CE}
              style={styles.input}
            />
          </View>
        )}
        rules={{
          required: 'Name is required',
          pattern: {
            value: /^[a-zA-Z\s]+$/,
            message: 'Name must not contain numbers or special characters',
          },
        }}
      />
      {errors.name && (
        <Text style={styles.errorText}>{errors.name.message}</Text>
      )}
      <Controller
        control={control}
        name='address'
        render={({
          field: { value, onBlur, onChange },
          fieldState: { error },
        }) => (
          <View style={styles.inputWrapper}>
            <Image
              source={require('../../assets/icons/address.png')}
              height={10}
              width={10}
              style={styles.icon}
            />
            <TextInput
              placeholder={'Enter your address'}
              onChangeText={onChange}
              value={value}
              secureTextEntry={false}
              placeholderTextColor={COLORS.grayC2C2CE}
              style={[styles.input]}
            />
          </View>
        )}
        rules={{
          required: 'Address is required',
        }}
      />
      {errors.address && (
        <Text style={styles.errorText}>{errors.address.message}</Text>
      )}
      <Controller
        control={control}
        name='phoneNumber'
        render={({
          field: { value, onBlur, onChange },
          fieldState: { error },
        }) => (
          <View style={styles.inputWrapper}>
            <Image
              source={require('../../assets/icons/phone.png')}
              height={10}
              width={10}
              style={styles.icon}
            />
            <TextInput
              placeholder={'Enter your phone number'}
              onChangeText={onChange}
              value={value}
              secureTextEntry={false}
              placeholderTextColor={COLORS.grayC2C2CE}
              style={[styles.input]}
            />
          </View>
        )}
        rules={{
          required: 'Phone number is required',
          minLength: {
            value: 10,
            message: 'Please enter phone number with 10 characters',
          },
          maxLength: {
            value: 10,
            message: 'Please enter phone number with 10 characters',
          },
        }}
      />
      {errors.phoneNumber && (
        <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>
      )}
      <Controller
        control={control}
        name='password'
        render={({
          field: { value, onBlur, onChange },
          fieldState: { error },
        }) => (
          <View style={styles.inputWrapper}>
            <Image
              source={require('../../assets/icons/lock.png')}
              height={10}
              width={10}
              style={styles.icon}
            />
            <TextInput
              placeholder={'Enter your password'}
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
              placeholderTextColor={COLORS.grayC2C2CE}
              style={[styles.input]}
            />
          </View>
        )}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 1,
            message: 'At least 6 characters',
          },
          maxLength: {
            value: 255,
            message: 'Password should not over 255 characters',
          },
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/,
            message:
              'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 special character',
          },
        }}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}
      <Controller
        control={control}
        name='confirmPassword'
        render={({
          field: { value, onBlur, onChange },
          fieldState: { error },
        }) => (
          <View style={styles.inputWrapper}>
            <Image
              source={require('../../assets/icons/lock.png')}
              height={10}
              width={10}
              style={styles.icon}
            />
            <TextInput
              placeholder={'Confirm password'}
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
              placeholderTextColor={COLORS.grayC2C2CE}
              style={[styles.input]}
            />
          </View>
        )}
        rules={{
          required: 'Please re-enter your password',
          validate: (value) => value === password || 'Passwords do not match',
        }}
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
      )}
      <Button
        title='Sign up'
        onPress={handleSubmit(handleSignup.bind(null))}
        style={{ marginTop: scaleSize(20) }}
        isLoading={isLoading}
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
  errorText: {
    ...FONTS.body5,
    color: COLORS.redPrimary,
    fontSize: scaleSize(12),
    marginTop: scaleSize(3),
  },
});
