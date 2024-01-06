import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES, FONTS, STYLES } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import Checkbox from 'expo-checkbox';
import NotificationItem from './components/notification/NotificationItem';
import {
  useGetNotificationQuery,
  useLazyGetNotificationQuery,
  useMarkAsReadMutation,
} from '../../store/notification/notification.api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const NotificationScreen = () => {
  const [isSelectAll, setIsSelectAll] = useState(false);
  const myPhoneNumber = useSelector(
    (state: RootState) => state.shared.user.phoneNumber
  );

  const { data: notificationData } = useGetNotificationQuery(myPhoneNumber);
  const [markAsRead, { isLoading }] = useMarkAsReadMutation();

  const [data, setData] = useState([]);

  useEffect(() => {
    notificationData &&
      setData(
        notificationData.map((item, index) => ({
          index: index,
          selected: false,
          id: item.notiID,
        }))
      );
  }, notificationData);

  const handleCheckboxChange = (itemId) => {
    const updatedData = data.map((item) => {
      if (item.index === itemId) {
        return { ...item, selected: !item?.selected };
      }
      return item;
    });

    setData(updatedData);
    setIsSelectAll(updatedData.every((item) => item?.selected));
  };

  const handleSelectAllChange = () => {
    const updatedData = data.map((item) => ({
      ...item,
      selected: !isSelectAll,
    }));

    setData(updatedData);
    setIsSelectAll(!isSelectAll);
  };
  // const [notifications, setNotifications] = useState([]);
  // const [getNotifications] = useLazyGetNotificationQuery(myPhoneNumber);
  // useEffect(() => {
  //   const getNoti = async () => {
  //     try {
  //       const res = await getNotifications(myPhoneNumber).unwrap();
  //       setNotifications(res);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  // }, [myPhoneNumber]);

  const renderItem = ({ item, index }) => {
    return (
      <NotificationItem
        title={item.title}
        content={item.content}
        read={item.isRead}
        selected={data.find((item) => item.index === index)?.selected}
        onSelect={() => {
          handleCheckboxChange(index);
        }}
      />
    );
  };

  const onMarkAsRead = async () => {
    try {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].selected);
        if (data[i].selected) {
          console.log(data[i].id);
          await markAsRead(data[i].id).unwrap();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.horizontal}>
        <View style={styles.horizontal}>
          <Checkbox
            style={styles.checkbox}
            value={isSelectAll}
            onValueChange={handleSelectAllChange}
            color={isSelectAll ? COLORS.primary : undefined}
          />
          <Text style={styles.selectAll}>Select all</Text>
        </View>
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
        <TouchableOpacity onPress={onMarkAsRead} style={styles.button}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.buttonText}>Mark as read</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* <Text style={styles.date}>June 3 2023</Text> */}
      <FlatList
        data={notificationData}
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
