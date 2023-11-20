import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { COLORS, FONTS, SIZES } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigators/config';
import { SCREEN } from '../../navigators/AppRoute';

const VerifyScreen = ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, SCREEN.VERIFY>) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const inputRefs = useRef<TextInput[]>(Array.from({ length: 6 }, () => null));

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // If there is a character entered and the current input is not the last one
    if (text && index < code.length - 1) {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    } else if (!text && index > 0) {
      // If the current input becomes empty, focus on the previous input
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleKeyPress = (
    event: { nativeEvent: { key: string } },
    index: number
  ) => {
    // If the backspace key is pressed and the current input is empty, focus on the previous input
    if (event.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <Text style={styles.sent}>
        Verification code sent to:{' '}
        <Text style={[styles.sent, { color: COLORS.blackContent }]}>
          01234312123
        </Text>
      </Text>
      <View style={styles.codeContainer}>
        {code.map((value, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.codeInput}
            value={value}
            onChangeText={(text) => handleCodeChange(text, index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            maxLength={1}
            keyboardType='numeric'
          />
        ))}
      </View>
      <View style={styles.resendWrapper}>
        <Text style={styles.sent}>
          Resend verification code{' '}
          <Text style={[styles.sent, { color: COLORS.blackContent }]}>
            00:59
          </Text>
        </Text>
        <TouchableOpacity>
          <Text style={[styles.sent, { color: COLORS.primary }]}>Resend</Text>
        </TouchableOpacity>
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
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: scaleSize(20),
  },
  codeInput: {
    ...FONTS.body4,
    width: scaleSize(48),
    height: scaleSize(48),
    borderWidth: scaleSize(1),
    borderRadius: scaleSize(10),
    borderColor: COLORS.grayLight,
    textAlign: 'center',
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
});
