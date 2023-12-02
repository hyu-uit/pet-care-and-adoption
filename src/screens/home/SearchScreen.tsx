import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, STYLES, FONTS, SIZES, IMAGES } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import { Ionicons } from '@expo/vector-icons';
import CategoryItem from './components/search/CategoryItem';
import PetSearchCard from './components/search/PetSearchCard';
import FilterItem from './components/search/FilterItem';
import FilterModal from '../../components/FilterModal';

const SearchScreen = () => {
  const [filterShown, setFilterShown] = useState<boolean>(false);
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

  const onFilter = () => {
    setFilterShown(true);
  };

  const onCloseFilter = () => {
    setFilterShown(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <FilterModal open={filterShown} onClose={onCloseFilter} />
      <ScrollView showsVerticalScrollIndicator={false}>
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

        <View style={{ height: scaleSize(60), marginTop: scaleSize(20) }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <CategoryItem />
            <CategoryItem />
            <CategoryItem />
            <CategoryItem />
            <CategoryItem />
          </ScrollView>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: scaleSize(20),
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: scaleSize(10),
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity style={styles.filterButton} onPress={onFilter}>
              <Image source={IMAGES.FILTER} style={styles.filterIcon} />
            </TouchableOpacity>
            <FilterItem title='Male' />
            <FilterItem title='4 months' />
            <FilterItem title='Puppy' />
          </View>

          <TouchableOpacity
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={styles.clear}>Clear</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Pets near me</Text>

        {data.map((item, index) => (
          <PetSearchCard
            key={index}
            image={item.image}
            name={item.name}
            age={item.age}
            type={item.type}
            location={item.location}
            kilometer={item.kilometer}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

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
  filterButton: {
    width: scaleSize(30),
    height: scaleSize(30),
    backgroundColor: COLORS.tertiary,
    borderWidth: scaleSize(1),
    borderColor: COLORS.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleSize(5),
  },
  filterIcon: {
    width: scaleSize(16),
    height: scaleSize(16),
    resizeMode: 'contain',
  },
  title: {
    ...FONTS.body4,
    fontWeight: 'bold',
    marginTop: scaleSize(20),
    color: COLORS.primary,
    marginBottom: scaleSize(20),
  },
  clear: {
    ...FONTS.body5,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
});
