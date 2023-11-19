import { Dimensions, Platform } from 'react-native';
import { scaleSize } from '../utils/DeviceUtils';

const bottomBarHeight = Platform.OS === 'ios' ? scaleSize(49) : scaleSize(26);
const tabBarBottom = Platform.OS === 'ios' ? scaleSize(22) : scaleSize(14);

export default {
  12: scaleSize(12),
  17: scaleSize(17),
  24: scaleSize(24),
  28: scaleSize(28),
  22: scaleSize(22),
  20: scaleSize(20),
  16: scaleSize(16),
  15: scaleSize(15),

  padding: scaleSize(24),
  radius: scaleSize(17),

  bottomBarHeight,
  tabBarBottom,
  bottomPadding:
    Platform.OS === 'ios'
      ? bottomBarHeight + tabBarBottom
      : bottomBarHeight + tabBarBottom * 3,
  // app dimensions
  WindowWidth: Dimensions.get('window').width,
  WindowHeight: Dimensions.get('window').height,
};
