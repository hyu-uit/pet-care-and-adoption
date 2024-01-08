import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, FONTS, STYLES } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import Button from '../../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigators/config';
import { SCREEN } from '../../navigators/AppRoute';
import { Controller, useForm } from 'react-hook-form';
import { AuthForgotPasswordREQ } from '../../store/auth/request/auth-forgot-password.request';
import { useForgotPasswordMutation } from '../../store/auth/auth.api';
import Popup from '../../components/Popup';

const ForgotPasswordScreen = ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, SCREEN.FORGOT_PASSWORD>) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForgotPasswordREQ>();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [isPopupShow, setIsPopupShow] = useState<boolean>(false);

  const onSend = async (data: AuthForgotPasswordREQ) => {
    try {
      await forgotPassword(data).unwrap();
      navigation.navigate(SCREEN.VERIFY, {
        phoneNumber: data.phoneNumber,
        name: SCREEN.FORGOT_PASSWORD,
      });
    } catch (error) {
      console.log(error);
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
        title='Login failed'
        content='Please check your information and try it again!'
      />
      <Text style={styles.title}>Forgot password</Text>
      <Text style={styles.subTitle}>
        Please enter your phone number to receive a verification code
      </Text>

      <Controller
        control={control}
        name='phoneNumber'
        render={({
          field: { value, onBlur, onChange },
          fieldState: { error },
        }) => (
          <View style={styles.inputWrapper}>
            <Image
              source={require('../../assets/icons/user.png')}
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
              keyboardType='numeric'
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

      <Button
        title='Send'
        onPress={handleSubmit(onSend.bind(null))}
        style={{ marginTop: scaleSize(20) }}
        isLoading={isLoading}
      />
    </View>
  );
};

export default ForgotPasswordScreen;

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
