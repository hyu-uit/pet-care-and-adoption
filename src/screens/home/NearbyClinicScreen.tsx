import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import React from 'react';
import { COLORS, SIZES, STYLES, FONTS } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import { Ionicons } from '@expo/vector-icons';
import NearbyClinicItem from './components/nearby-clinic/NearbyClinicItem';

const NearbyClinicScreen = () => {
  const clinicList = [
    {
      name: 'Petzone - 3 VVN',
      star: 4.5,
      rate: 113,
      kilometer: 3.8,
      image:
        'https://cdn1.vectorstock.com/i/1000x1000/13/20/vet-clinic-with-doctor-vector-21191320.jpg',
    },
    {
      name: 'Petzone - 2 VVN',
      star: 4.5,
      rate: 113,
      kilometer: 3.8,
      image:
        'https://cdn1.vectorstock.com/i/1000x1000/13/20/vet-clinic-with-doctor-vector-21191320.jpg',
    },
    {
      name: 'Petzone - 28 VVN',
      star: 4.5,
      rate: 113,
      kilometer: 3.8,
      image:
        'https://cdn1.vectorstock.com/i/1000x1000/13/20/vet-clinic-with-doctor-vector-21191320.jpg',
    },
    {
      name: 'Petzone - 23 VVN',
      star: 4.5,
      rate: 113,
      kilometer: 3.8,
      image:
        'https://cdn1.vectorstock.com/i/1000x1000/13/20/vet-clinic-with-doctor-vector-21191320.jpg',
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <NearbyClinicItem
        image={item.image}
        star={item.star}
        rate={item.rate}
        kilometer={item.kilometer}
        name={item.name}
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
        data={clinicList}
        keyExtractor={(item) => item.name}
        renderItem={renderItem} //method to render the data in the way you want using styling u need
        horizontal={false}
        numColumns={2}
      />
    </View>
  );
};

export default NearbyClinicScreen;

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
