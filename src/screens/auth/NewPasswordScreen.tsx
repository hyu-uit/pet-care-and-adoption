import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import React from 'react';
import { COLORS, SIZES, FONTS, STYLES } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import Button from '../../components/Button';
import { useSetNewPasswordMutation } from '../../store/auth/auth.api';
import { useRoute } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';

type NewPasswordType = { password: string; confirmPassword: string };

const NewPasswordScreen = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewPasswordType>();

  const route = useRoute();
  const password = watch('password', '');

  const [setNewPassword, { isLoading }] = useSetNewPasswordMutation();

  const onSend = async (data: NewPasswordType) => {
    try {
      await setNewPassword({
        phoneNumber: route.params.phoneNumber,
        newPassword: data.password,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot password</Text>
      <Text style={styles.subTitle}>Please enter your new password</Text>
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
        title='Reset Password'
        onPress={handleSubmit(onSend.bind(null))}
        style={{ marginTop: scaleSize(20) }}
        isLoading={isLoading}
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
  errorText: {
    ...FONTS.body5,
    color: COLORS.redPrimary,
    fontSize: scaleSize(12),
    marginTop: scaleSize(3),
  },
});
