import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React from 'react';
import { COLORS, SIZES, FONTS, STYLES } from '../../config';
import { Ionicons } from '@expo/vector-icons';
import { scaleSize } from '../../utils/DeviceUtils';
import VideosItem from './components/pet-care-videos/VideosItem';

const PetCareVideosScreen = () => {
  const data = [
    {
      image:
        'https://www.catcareofvinings.com/blog/wp-content/uploads/2017/08/CCV_iStock-154918525-2000x1330.jpg',
      title: 'How to bathe a cat properly 1?',
      link: '',
    },
    {
      image:
        'https://www.catcareofvinings.com/blog/wp-content/uploads/2017/08/CCV_iStock-154918525-2000x1330.jpg',
      title: 'How to bathe a cat properly 2?',
      link: '',
    },
    {
      image:
        'https://www.catcareofvinings.com/blog/wp-content/uploads/2017/08/CCV_iStock-154918525-2000x1330.jpg',
      title: 'How to bathe a cat properly 3?',
      link: '',
    },
    {
      image:
        'https://www.catcareofvinings.com/blog/wp-content/uploads/2017/08/CCV_iStock-154918525-2000x1330.jpg',
      title: 'How to bathe a cat properly 4?',
      link: '',
    },
    {
      image:
        'https://www.catcareofvinings.com/blog/wp-content/uploads/2017/08/CCV_iStock-154918525-2000x1330.jpg',
      title: 'How to bathe a cat properly 5?',
      link: '',
    },
  ];

  const renderItem = ({ item }) => {
    return <VideosItem image={item.image} title={item.title} link='' />;
  };
  return (
    <View style={styles.container}>
      {/* <View
        style={[
          styles.horizontalWrapper,
          { gap: scaleSize(10), marginBottom: scaleSize(20) },
        ]}
      >
        <TextInput style={styles.input} placeholder='Search...' />
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons
            name='search'
            size={scaleSize(25)}
            color={COLORS.whitePrimary}
          />
        </TouchableOpacity>
      </View> */}

      {/* <FlatList
        data={data}
        keyExtractor={(item) => item.title}
        renderItem={renderItem} //method to render the data in the way you want using styling u need
        horizontal={false}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      /> */}
    </View>
  );
};

export default PetCareVideosScreen;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.padding,
    paddingTop: scaleSize(20),
  },
  horizontalWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    ...STYLES.input,
    ...FONTS.body6,
    flex: 1,
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
