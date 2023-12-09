import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { scaleSize } from '../../utils/DeviceUtils';
import { COLORS, FONTS, SIZES } from '../../config';
import AdoptedPetCard from '../home/components/home/AdoptedPetCard';

const ProfileLostPets = () => {
  const adoptedList = [
    {
      image:
        'https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*',
      name: 'Samatha',
      gender: 'Male',
      address: 'Binh Duong',
      kilometer: 2.5,
    },
    {
      image:
        'https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*',
      name: 'Samatha',
      gender: 'Male',
      address: 'Binh Duong',
      kilometer: 2.5,
    },
    {
      image:
        'https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*',
      name: 'Samatha',
      gender: 'Male',
      address: 'Binh Duong',
      kilometer: 2.5,
    },
    {
      image:
        'https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*',
      name: 'Samatha',
      gender: 'Male',
      address: 'Binh Duong',
      kilometer: 2.5,
    },
    {
      image:
        'https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*',
      name: 'Samatha',
      gender: 'Male',
      address: 'Binh Duong',
      kilometer: 2.5,
    },
    {
      image:
        'https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*',
      name: 'Samatha',
      gender: 'Male',
      address: 'Binh Duong',
      kilometer: 2.5,
    },
  ];

  const renderItemLost = ({ item }) => {
    return (
      <AdoptedPetCard
        image={item.image}
        name={item.name}
        gender={item.gender}
        address={item.address}
        kilometer={item.kilometer}
      />
    );
  };

  return (
    <View style={{ paddingHorizontal: SIZES.padding }}>
      <View style={styles.container}>
        <Text style={styles.title}>My Lost Pets</Text>
      </View>

      <FlatList
        data={adoptedList}
        keyExtractor={(item) => item.image}
        renderItem={renderItemLost} //method to render the data in the way you want using styling u need
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: scaleSize(20) }}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Lost Pets Near me</Text>
      </View>

      <FlatList
        data={adoptedList}
        keyExtractor={(item) => item.image}
        renderItem={renderItemLost} //method to render the data in the way you want using styling u need
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: scaleSize(20) }}
      />
    </View>
  );
};

export default ProfileLostPets;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scaleSize(40),
    borderRadius: scaleSize(15),
    backgroundColor: COLORS.whitePrimary,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaleSize(15),
    alignItems: 'center',
    marginTop: scaleSize(20),
  },
  title: {
    ...FONTS.body2,
    fontWeight: 'bold',
    color: COLORS.blackPrimary,
  },
});
