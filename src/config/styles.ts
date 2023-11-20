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
});
