import { StyleSheet } from 'react-native';
import { scaleSize } from '../utils/DeviceUtils';
import COLORS from './colors';
import FONTS from './fonts';
import SIZES from './sizes';

export default StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: COLORS.whitePrimary,
    borderColor: COLORS.grayLight,
    borderWidth: scaleSize(1),
    borderRadius: SIZES.radius,
    height: scaleSize(50),
    ...FONTS.body1,
  },
  icon: {
    width: scaleSize(24),
    height: scaleSize(24),
  },
  button: {
    backgroundColor: COLORS.primary,
    width: '100%',
    height: scaleSize(55),
    borderRadius: scaleSize(17),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    ...FONTS.body2,
    fontWeight: 'bold',
    color: COLORS.whitePrimary,
  },
});
