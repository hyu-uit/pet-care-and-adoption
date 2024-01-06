import { View, Text, StyleSheet } from 'react-native';
import React, { FC, useState } from 'react';
import { scaleSize } from '../../../../utils/DeviceUtils';
import Checkbox from 'expo-checkbox';
import { COLORS, FONTS } from '../../../../config';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

type NotificationProps = {
  title: string;
  content: string;
  read: boolean;
  selected: boolean;
  onSelect: () => void;
};
const NotificationItem: FC<NotificationProps> = ({
  title,
  content,
  read,
  selected,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      <Checkbox
        style={styles.checkbox}
        value={selected}
        onValueChange={onSelect}
        color={selected ? COLORS.primary : undefined}
      />
      <View
        style={[
          styles.notificationWrapper,
          { backgroundColor: read ? COLORS.tertiary : COLORS.secondary },
        ]}
      >
        <View style={styles.iconWrapper}>
          <MaterialIcons name='pets' size={24} color={COLORS.primary} />
        </View>
        <View
          style={{
            gap: scaleSize(10),
          }}
        >
          <Text style={[styles.title, { fontFamily: 'CercoDEMO-Bold' }]}>
            {title}
          </Text>
          <Text style={styles.title}>{content}</Text>
        </View>
        {!read && <View style={styles.dot} />}
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
    // justifyContent: 'space-between',
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
    color: COLORS.black2A3738,
    width: '80%',
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
