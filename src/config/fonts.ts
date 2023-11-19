import { StyleSheet } from 'react-native';
import COLORS from './colors';
import { scaleSize } from '../utils/DeviceUtils';

export default StyleSheet.create({
  h1: {
    color: COLORS.blackContent,
    fontSize: scaleSize(22),
    fontFamily: 'CercoDEMO-Bold',
    fontWeight: '700',
  },
  h2: {
    color: COLORS.blackContent,
    fontSize: scaleSize(20),
    fontFamily: 'CercoDEMO-Bold',
    fontWeight: '700',
  },
  h3: {
    color: COLORS.blackContent,
    fontSize: scaleSize(20),
    fontFamily: 'CercoDEMO-Medium',
    fontWeight: '500',
  },
  h5: {
    color: COLORS.blackContent,
    fontSize: scaleSize(18),
    fontFamily: 'CercoDEMO-Medium',
    fontWeight: '500',
  },

  body1: {
    color: COLORS.blackContent,
    fontSize: scaleSize(18),
    fontFamily: 'CercoDEMO-Regular',
    fontWeight: '400',
  },
  body2: {
    color: COLORS.blackContent,
    fontSize: scaleSize(17),
    fontFamily: 'CercoDEMO-Regular',
    fontWeight: '400',
  },
  body3: {
    color: COLORS.blackContent,
    fontSize: scaleSize(16),
    fontFamily: 'CercoDEMO-Regular',
    fontWeight: '400',
  },
  body4: {
    color: COLORS.blackContent,
    fontSize: scaleSize(15),
    fontFamily: 'CercoDEMO-Regular',
    fontWeight: '400',
  },
  body5: {
    color: COLORS.blackContent,
    fontSize: scaleSize(14),
    fontFamily: 'CercoDEMO-Regular',
    fontWeight: '400',
  },
  body6: {
    color: COLORS.blackContent,
    fontSize: scaleSize(12),
    fontFamily: 'CercoDEMO-Regular',
    fontWeight: '400',
  },
  body7: {
    color: COLORS.blackContent,
    fontSize: scaleSize(10),
    fontFamily: 'CercoDEMO-Regular',
    fontWeight: '400',
  },
  body8: {
    color: COLORS.blackContent,
    fontSize: scaleSize(8),
    fontFamily: 'CercoDEMO-Regular',
    fontWeight: '400',
  },
});
