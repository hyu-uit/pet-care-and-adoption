import { View, Text, StyleSheet } from 'react-native';
import React, { FC, useState } from 'react';
import { scaleSize } from '../../../../utils/DeviceUtils';
import Checkbox from 'expo-checkbox';
import { COLORS, FONTS } from '../../../../config';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

type NotificationProps = {
  title: string;
  read: boolean;
};
const NotificationItem: FC<NotificationProps> = ({ title, read }) => {
  const [isChecked, setChecked] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={setChecked}
        color={isChecked ? COLORS.primary : undefined}
      />
      <View style={styles.notificationWrapper}>
        <View style={styles.iconWrapper}>
          <FontAwesome5
            name='heart'
            size={scaleSize(25)}
            color={COLORS.primary}
          />
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.dot} />
      </View>
    </View>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scaleSize(100),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scaleSize(20),
  },
  checkbox: {
    borderRadius: scaleSize(5),
    borderColor: COLORS.primary,
  },
  notificationWrapper: {
    backgroundColor: COLORS.secondary,
    width: scaleSize(308),
    height: '100%',
    borderRadius: scaleSize(10),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: scaleSize(10),
    paddingHorizontal: scaleSize(18),
  },
  iconWrapper: {
    width: scaleSize(46),
    height: scaleSize(46),
    backgroundColor: COLORS.tertiary,
    borderRadius: scaleSize(23),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...FONTS.body4,
    flex: 1,
    color: COLORS.black2A3738,
  },
  dot: {
    width: scaleSize(9),
    height: scaleSize(9),
    borderRadius: scaleSize(5),
    backgroundColor: COLORS.primary,
    borderWidth: scaleSize(1),
    borderColor: COLORS.whitePrimary,
    position: 'absolute',
    top: scaleSize(12),
    right: scaleSize(14),
  },
});
