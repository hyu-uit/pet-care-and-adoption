import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import React, { FC } from 'react';
import { COLORS, SIZES, FONTS } from '../config';
import { scaleSize } from '../utils/DeviceUtils';
import { ButtonVariant } from '../enums/ButtonVariant.enum';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  style?: StyleProp<ViewStyle>;
};
const Button: FC<ButtonProps> = ({ title, onPress, variant, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!variant || variant === ButtonVariant.ACTIVE ? false : true}
      style={[
        styles.buttonWrapper,
        {
          backgroundColor:
            !variant || variant === ButtonVariant.ACTIVE
              ? COLORS.primary
              : COLORS.grayLight,
        },
        style,
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    borderRadius: SIZES.radius,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: scaleSize(55),
  },
  title: {
    ...FONTS.h1,
    fontSize: scaleSize(17),
    fontWeight: '800',
    lineHeight: scaleSize(27.2),
    color: COLORS.whitePrimary,
  },
});
