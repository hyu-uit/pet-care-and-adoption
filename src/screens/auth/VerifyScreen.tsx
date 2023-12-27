import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { COLORS, FONTS, SIZES } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigators/config';
import { SCREEN } from '../../navigators/AppRoute';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useRoute } from '@react-navigation/native';
import {
  useCheckOtpResetPasswordMutation,
  useSignupMutation,
  useVerifySignupMutation,
} from '../../store/auth/auth.api';
import { AuthSignupREQ } from '../../store/auth/request/auth-signup.request';
import Popup from '../../components/Popup';
import { POPUP_TYPE } from '../../types/enum/popup.enum';
import { doc, setDoc } from 'firebase/firestore';
import { firestoreDB } from '../../../firebaseConfig';

const CELL_COUNT = 6;

const VerifyScreen = ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, SCREEN.VERIFY>) => {
  const [value, setValue] = useState('');
  const [isTimeout, setIsTimeout] = useState<boolean>(false);
  const initialSeconds = 60; // 60 minutes in seconds
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isPopupShow, setIsPopupShow] = useState<boolean>(false);

  const [signup] = useSignupMutation();
  const [checkOtp, { isLoading }] = useCheckOtpResetPasswordMutation();
  const [verifyPhoneNumber] = useVerifySignupMutation();

  // Calculate minutes and seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const route = useRoute();

  const signupInfo = route.params?.signupInfo ? route.params.signupInfo : {};

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useMemo(() => {
    const verify = async () => {
      try {
        if (
          value.length === 6 &&
          signupInfo &&
          route.params.name !== SCREEN.FORGOT_PASSWORD
        ) {
          // await verifyPhoneNumber({
          //   otp: value,
          //   signUpModel: signupInfo,
          // }).unwrap();

          await setDoc(doc(firestoreDB, 'users', signupInfo.phoneNumber), {
            name: signupInfo.name,
            phoneNumber: signupInfo.phoneNumber,
          });

          await setDoc(
            doc(firestoreDB, 'userChats', signupInfo.phoneNumber),
            {}
          );
          // dispatch(setLoginToken({ user: res.user, token: res.token }));
        }
      } catch (error) {
        console.log(error);
      }
    };

    const resetPass = async () => {
      if (
        value.length === 6 &&
        route.params.phoneNumber &&
        route.params.name === SCREEN.FORGOT_PASSWORD
      ) {
        try {
          await checkOtp({
            otp: value,
            phoneNumber: route.params.phoneNumber,
          }).unwrap();
          navigation.navigate(SCREEN.NEW_PASSWORD, {
            phoneNumber: route.params.phoneNumber,
          });
          // dispatch(setLoginToken({ user: res.user, token: res.token }));
        } catch (error) {
          console.log(error);
        }
      }
    };

    verify();
    resetPass();
  }, [value]);

  useMemo(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);
    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useMemo(() => {
    setTimeout(() => {
      setIsTimeout(true);
    }, 60000);
  }, []);

  const onResend = async () => {
    try {
      setIsTimeout(false);
      await signup(signupInfo).unwrap();
    } catch (error) {
      setIsPopupShow(true);
      console.log(error);
    }
  };

  const onClosePopup = () => {
    setIsPopupShow(false);
  };

  return (
    <View style={styles.container}>
      <Popup
        type={POPUP_TYPE.SUCCESS}
        open={isPopupShow}
        onCancel={onClosePopup}
        onSubmit={() => {}}
        title='Code sent'
        content='Please check your message!'
      />
      <Text style={styles.title}>Sign up</Text>
      <Text style={styles.sent}>
        Verification code sent to:{' '}
        <Text style={[styles.sent, { color: COLORS.blackContent }]}>
          01234312123
        </Text>
      </Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType='number-pad'
        textContentType='oneTimeCode'
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <View style={styles.resendWrapper}>
        {
          <Text style={styles.sent}>
            Resend verification code{' '}
            {!isTimeout && seconds > 0 && (
              <Text style={[styles.sent, { color: COLORS.blackContent }]}>
                {`${minutes}:${
                  remainingSeconds < 10 ? '0' : ''
                }${remainingSeconds}`}
              </Text>
            )}
          </Text>
        }
        {isTimeout && (
          <TouchableOpacity onPress={onResend}>
            <Text style={[styles.sent, { color: COLORS.primary }]}>Resend</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default VerifyScreen;

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

  sent: {
    ...FONTS.body2,
    color: COLORS.grayPrimary,
    marginTop: scaleSize(10),
  },

  resendWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },

  root: { flex: 1, padding: 20 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    ...FONTS.h3,
    width: scaleSize(42),
    height: scaleSize(42),
    lineHeight: 38,
    fontSize: 24,
    borderWidth: scaleSize(1),
    borderRadius: scaleSize(10),
    borderColor: COLORS.grayLight,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: COLORS.primary,
  },
});
