import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, FONTS, STYLES } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import Checkbox from 'expo-checkbox';
import NotificationItem from './components/notification/NotificationItem';

const NotificationScreen = () => {
  const [isChecked, setChecked] = useState<boolean>(false);

  const notificationList = [
    {
      title: 'The Vi just expressed his feelings about your post.',
      read: false,
    },
    {
      title: 'The Vi just expressed his feelings about your post.',
      read: false,
    },
    {
      title: 'The Vi just expressed his feelings about your post.',
      read: false,
    },
    {
      title: 'The Vi just expressed his feelings about your post.',
      read: false,
    },
  ];

  const renderItem = ({ item }) => {
    return <NotificationItem title={item.title} read={item.read} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.horizontal}>
        <View style={styles.horizontal}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? COLORS.primary : undefined}
          />
          <Text style={styles.selectAll}>Select all</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            {
              borderWidth: scaleSize(1),
              borderColor: COLORS.grayLight,
              backgroundColor: COLORS.tertiary,
            },
          ]}
        >
          <Text style={[styles.buttonText, { color: COLORS.primary }]}>
            Delete all
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Mark as read</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.date}>June 3 2023</Text>
      <FlatList
        data={notificationList}
        keyExtractor={(item) => item.title}
        renderItem={renderItem} //method to render the data in the way you want using styling u need
        horizontal={false}
      />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.padding,
    paddingTop: scaleSize(20),
  },
  checkbox: {
    borderRadius: scaleSize(5),
    borderColor: COLORS.primary,
  },
  horizontal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectAll: {
    ...FONTS.body6,
    marginLeft: scaleSize(4),
  },
  button: {
    ...STYLES.button,
    width: scaleSize(115),
    height: scaleSize(43),
  },
  buttonText: {
    ...FONTS.body5,
    color: COLORS.whitePrimary,
  },
  date: {
    ...FONTS.body7,
    fontWeight: 'bold',
    marginTop: scaleSize(17),
  },
});
