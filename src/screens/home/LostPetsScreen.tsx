import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import { COLORS, SIZES, FONTS, STYLES } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import { Ionicons } from '@expo/vector-icons';
import LostPetsItem from './components/lost-pets/LostPetsItem';

const LostPetsScreen = () => {
  const lostPetList = [
    {
      image:
        'https://www.catcareofvinings.com/blog/wp-content/uploads/2017/08/CCV_iStock-154918525-2000x1330.jpg',
      name: 'Puppy',
      gender: 'Male',
      address: 'Binh Duong',
      kilometer: 2.5,
    },
    {
      image:
        'https://www.catcareofvinings.com/blog/wp-content/uploads/2017/08/CCV_iStock-154918525-2000x1330.jpg',
      name: 'Puppy',
      gender: 'Male',
      address: 'Binh Duong',
      kilometer: 2.5,
    },
    {
      image:
        'https://www.catcareofvinings.com/blog/wp-content/uploads/2017/08/CCV_iStock-154918525-2000x1330.jpg',
      name: 'Puppy',
      gender: 'Male',
      address: 'Binh Duong',
      kilometer: 2.5,
    },
    {
      image:
        'https://www.catcareofvinings.com/blog/wp-content/uploads/2017/08/CCV_iStock-154918525-2000x1330.jpg',
      name: 'Puppy',
      gender: 'Male',
      address: 'Binh Duong',
      kilometer: 2.5,
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <LostPetsItem
        image={item.image}
        gender={item.gender}
        kilometer={item.kilometer}
        name={item.name}
        address={item.address}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <TextInput style={styles.input} placeholder='Location' />
        <TextInput style={styles.input} placeholder='Search...' />
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons
            name='search'
            size={scaleSize(25)}
            color={COLORS.whitePrimary}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={lostPetList}
        keyExtractor={(item) => item.name}
        renderItem={renderItem} //method to render the data in the way you want using styling u need
        horizontal={false}
        numColumns={2}
        style={{ marginTop: scaleSize(20) }}
      />
    </View>
  );
};

export default LostPetsScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.padding,
    paddingTop: scaleSize(20),
  },
  searchWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: scaleSize(10),
    alignItems: 'center',
  },
  input: {
    ...STYLES.input,
    ...FONTS.body6,
    color: COLORS.blackContent,
    width: scaleSize(140),
    height: scaleSize(30),
    borderRadius: scaleSize(10),
    backgroundColor: COLORS.tertiary,
    paddingHorizontal: scaleSize(11),
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    width: scaleSize(30),
    height: scaleSize(30),
    borderRadius: scaleSize(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
