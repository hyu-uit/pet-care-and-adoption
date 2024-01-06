import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTS, ICONS, SIZES, STYLES } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import Button from '../../components/Button';
import { ButtonVariant } from '../../enums/ButtonVariant.enum';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigators/config';
import { SCREEN } from '../../navigators/AppRoute';
import { Controller, useForm } from 'react-hook-form';
import { AuthLoginREQ } from '../../store/auth/request/auth-login.request';
import { useLoginMutation } from '../../store/auth/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginToken } from '../../store/shared/shared.slice';
import { AuthLoginRESP } from '../../store/auth/response/auth-login.response';
import {
  isBadRequestError,
  isEntityError,
  isUnauthorizedError,
} from '../../utils/helpers/rtk-query.helper';
import Popup from '../../components/Popup';
import { RootState } from '../../store';
import { doc, setDoc } from 'firebase/firestore';
import { firestoreDB } from '../../../firebaseConfig';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useAddDeviceTokenMutation } from '../../store/notification/notification.api';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const LoginScreen = ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, SCREEN.LOGIN>) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthLoginREQ>();

  const [login, { isLoading }] = useLoginMutation();
  const [addDeviceToken] = useAddDeviceTokenMutation();
  const [isPopupShow, setIsPopupShow] = useState<boolean>(false);
  const dispatch = useDispatch();

  //Notification
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log(token);
        setExpoPushToken(token);
      })
      .catch((err) => console.log(err));
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: '29b02a60-b7a1-4dae-a67c-493fdf74d1d4',
        })
      ).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    return token;
  }

  const onSignup = () => {
    navigation.navigate(SCREEN.SIGN_UP);
  };

  const onForgotPassword = () => {
    navigation.navigate(SCREEN.FORGOT_PASSWORD);
  };

  const handleLogin = async (data: AuthLoginREQ) => {
    try {
      const res: AuthLoginRESP = await login(data).unwrap();
      if (!res.token) {
        setIsPopupShow(true);
        return;
      }
      await addDeviceToken({
        userID: data.phoneNumber,
        token: expoPushToken,
      }).unwrap();
      await dispatch(setLoginToken({ user: res.user, token: res.token }));
    } catch (error) {
      console.log('Login error', error);
      if (
        isBadRequestError(error) ||
        isEntityError(error) ||
        isUnauthorizedError(error)
      ) {
        setIsPopupShow(true);
      }
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
        onSubmit={() => {
          onClosePopup();
        }}
        title='Login failed'
        content='Please check your information and try it again!'
      />
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subTitle}>Enter your username and password</Text>

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

      <Controller
        control={control}
        name='password'
        render={({
          field: { value, onBlur, onChange },
          fieldState: { error },
        }) => (
          <View style={[styles.inputWrapper, { marginTop: scaleSize(10) }]}>
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

      <TouchableOpacity onPress={onForgotPassword}>
        <Text style={styles.forgot}>Forgot password?</Text>
      </TouchableOpacity>

      <Button
        onPress={handleSubmit(handleLogin.bind(null))}
        title='Login'
        style={{ marginTop: scaleSize(19) }}
        isLoading={isLoading}
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
  errorText: {
    ...FONTS.body5,
    color: COLORS.redPrimary,
    fontSize: scaleSize(12),
    marginTop: scaleSize(3),
  },
});
