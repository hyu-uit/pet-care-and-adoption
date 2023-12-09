import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import PetSearchCard from '../../home/components/search/PetSearchCard';
import { scaleSize } from '../../../utils/DeviceUtils';
import { SIZES, FONTS, COLORS } from '../../../config';
import { Foundation } from '@expo/vector-icons';

const ProfileMyPets = () => {
  const data = [
    {
      image:
        'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
      name: 'Bobo',
      age: 4,
      type: 'Labrador Retriever',
      location: 'Thu Duc City, Vietnam',
      kilometer: 2.5,
    },
    {
      image:
        'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
      name: 'Bobo',
      age: 4,
      type: 'Labrador Retriever',
      location: 'Thu Duc City, Vietnam',
      kilometer: 2.5,
    },
    {
      image:
        'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
      name: 'Bobo',
      age: 4,
      type: 'Labrador Retriever',
      location: 'Thu Duc City, Vietnam',
      kilometer: 2.5,
    },
    {
      image:
        'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
      name: 'Bobo',
      age: 4,
      type: 'Labrador Retriever',
      location: 'Thu Duc City, Vietnam',
      kilometer: 2.5,
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <PetSearchCard
        image={item.image}
        name={item.name}
        age={item.age}
        type={item.type}
        location={item.location}
        kilometer={item.kilometer}
        myPet={true}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.title}
        renderItem={renderItem} //method to render the data in the way you want using styling u need
        horizontal={false}
        numColumns={1}
        style={{ marginTop: scaleSize(20) }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <TouchableOpacity style={styles.addButton}>
            <Foundation
              name='plus'
              size={scaleSize(24)}
              color={COLORS.primary}
            />
            <Text style={styles.addText}>My pet</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

export default ProfileMyPets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scaleSize(10),
    marginVertical: scaleSize(20),
    borderWidth: scaleSize(1),
    padding: scaleSize(10),
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    borderRadius: scaleSize(10),
  },
  addText: {
    ...FONTS.body1,
    color: COLORS.primary,
  },
});
