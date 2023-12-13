import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES, FONTS, STYLES } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import { Ionicons } from '@expo/vector-icons';
import LostPetsItem from './components/lost-pets/LostPetsItem';
import { useGetPostsQuery } from '../../store/post/post.api';
import { Dropdown } from 'react-native-element-dropdown';
import {
  useGetProvincesQuery,
  useLazyGetDistrictQuery,
} from '../../store/province/province.api';

const LostPetsScreen = () => {
  const { data: allPosts } = useGetPostsQuery();
  const { data: dataProvinces } = useGetProvincesQuery();
  const [getDistricts, { data: dataDistricts }] = useLazyGetDistrictQuery();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    if (!dataProvinces) return;
    const provincesUpdate = dataProvinces.map((item) => ({
      label: item.name,
      value: item.code,
    }));
    setProvinces(provincesUpdate);
  }, [dataProvinces]);

  useEffect(() => {
    if (!dataDistricts) return;
    const districtsUpdate = dataDistricts.districts.map((item) => ({
      label: item.name,
      value: item.code,
    }));
    setDistricts(districtsUpdate);
  }, [dataDistricts]);

  const lostPetList = allPosts
    ?.filter((post) => post.isAdopt !== true)
    .map((post) => ({
      image:
        'https://www.catcareofvinings.com/blog/wp-content/uploads/2017/08/CCV_iStock-154918525-2000x1330.jpg',
      name: post.petName,
      gender: post.sex,
      district: post.district,
      province: post.province,
    }));
  // const lostPetList = [
  //   {
  //     image:
  //       'https://www.catcareofvinings.com/blog/wp-content/uploads/2017/08/CCV_iStock-154918525-2000x1330.jpg',
  //     name: 'Puppy',
  //     gender: 'Male',
  //     address: 'Binh Duong',
  //     kilometer: 2.5,
  //   },
  //   {
  //     image:
  //       'https://www.catcareofvinings.com/blog/wp-content/uploads/2017/08/CCV_iStock-154918525-2000x1330.jpg',
  //     name: 'Puppy',
  //     gender: 'Male',
  //     address: 'Binh Duong',
  //     kilometer: 2.5,
  //   },
  //   {
  //     image:
  //       'https://www.catcareofvinings.com/blog/wp-content/uploads/2017/08/CCV_iStock-154918525-2000x1330.jpg',
  //     name: 'Puppy',
  //     gender: 'Male',
  //     address: 'Binh Duong',
  //     kilometer: 2.5,
  //   },
  //   {
  //     image:
  //       'https://www.catcareofvinings.com/blog/wp-content/uploads/2017/08/CCV_iStock-154918525-2000x1330.jpg',
  //     name: 'Puppy',
  //     gender: 'Male',
  //     address: 'Binh Duong',
  //     kilometer: 2.5,
  //   },
  // ];

  const renderItem = ({ item }) => {
    return (
      <LostPetsItem
        image={item.image}
        gender={item.gender}
        name={item.name}
        district={item.district}
        province={item.province}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <Dropdown
          data={provinces}
          labelField={'label'}
          valueField={'value'}
          placeholder='Select province'
          placeholderStyle={{ color: COLORS.grayPrimary }}
          style={[styles.input, { paddingLeft: scaleSize(20), ...FONTS.body7 }]}
          value={provinces}
          onChange={(value) => {
            getDistricts(value.value);
          }}
          containerStyle={{
            height: scaleSize(200),
            borderRadius: scaleSize(10),
          }}
        />
        <Dropdown
          data={districts}
          labelField={'label'}
          valueField={'value'}
          placeholder='Select district'
          placeholderStyle={{ color: COLORS.grayPrimary }}
          style={[styles.input, { paddingLeft: scaleSize(20) }]}
          onChange={(value) => {}}
          containerStyle={{
            height: scaleSize(200),
            borderRadius: scaleSize(10),
          }}
        />
      </View>
      <View style={styles.searchWrapper}>
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
    marginTop: scaleSize(10),
  },
  input: {
    ...STYLES.input,
    ...FONTS.body4,
    color: COLORS.blackContent,
    flex: 1,
    height: scaleSize(40),
    borderRadius: scaleSize(10),
    backgroundColor: COLORS.tertiary,
    paddingHorizontal: scaleSize(11),
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    width: scaleSize(40),
    height: scaleSize(40),
    borderRadius: scaleSize(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
