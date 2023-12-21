import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES, FONTS, STYLES } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import LostPetsItem from './components/lost-pets/LostPetsItem';
import { useGetPostsQuery } from '../../store/post/post.api';
import { Dropdown } from 'react-native-element-dropdown';
import {
  useGetProvincesQuery,
  useLazyGetDistrictQuery,
} from '../../store/province/province.api';
import { SCREEN } from '../../navigators/AppRoute';
import { HomeStackParamList } from '../../navigators/config';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const LostPetsScreen = ({
  navigation,
}: NativeStackScreenProps<HomeStackParamList, SCREEN.LOST_PETS>) => {
  const { data: allPosts } = useGetPostsQuery();
  const { data: dataProvinces } = useGetProvincesQuery();
  const [getDistricts, { data: dataDistricts }] = useLazyGetDistrictQuery();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [visibleData, setVisibleData] = useState([]);
  const [filteredProvinces, setFilteredProvinces] = useState('');
  const [filteredDistricts, setFilteredDistricts] = useState('');
  const [searchText, setSearchText] = useState('');

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

  useEffect(() => {
    const visible = allPosts
      ?.filter((post) => post.postAdoptModel.isAdopt !== true)
      .map((post) => ({
        images: post.images,
        postID: post.postAdoptModel.postID,
        petName: post.postAdoptModel.petName,
        age: post.postAdoptModel.age,
        sex: post.postAdoptModel.sex,
        species: post.postAdoptModel.species,
        breed: post.postAdoptModel.breed,
        weight: post.postAdoptModel.weight,
        district: post.postAdoptModel.district,
        province: post.postAdoptModel.province,
        description: post.postAdoptModel.description,
        isVaccinated: post.postAdoptModel.isVaccinated,
        isAdopt: post.postAdoptModel.isAdopt,
        isDone: post.postAdoptModel.isDone,
        userID: post.postAdoptModel.userID,
      }));

    setVisibleData(visible);
  }, [allPosts]);

  console.log('aa', visibleData);
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

  const onDetail = (item) => {
    console.log(item);
    navigation.navigate(SCREEN.PET_DETAIL, { postData: item });
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
          value={filteredProvinces}
          onChange={(value) => {
            getDistricts(value.value);
            setFilteredProvinces(value);
            if (filteredDistricts && filteredDistricts.label !== '')
              setFilteredDistricts(null);
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
          value={filteredDistricts}
          placeholderStyle={{ color: COLORS.grayPrimary }}
          style={[styles.input, { paddingLeft: scaleSize(20) }]}
          onChange={(value) => {
            setFilteredDistricts(value);
          }}
          containerStyle={{
            height: scaleSize(200),
            borderRadius: scaleSize(10),
          }}
        />

        <TouchableOpacity
          onPress={() => {
            setFilteredDistricts('');
            setFilteredProvinces('');
            setSearchText('');
            setDistricts([]);
          }}
        >
          <AntDesign name='closecircle' size={24} color='black' />
        </TouchableOpacity>
      </View>
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.input}
          placeholder='Search...'
          onChangeText={(text) => {
            setSearchText(text);
          }}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons
            name='search'
            size={scaleSize(25)}
            color={COLORS.whitePrimary}
          />
        </TouchableOpacity>
      </View>

      {/* <FlatList
        data={lostPetList}
        keyExtractor={(item) => item.name}
        renderItem={renderItem} //method to render the data in the way you want using styling u need
        horizontal={false}
        numColumns={2}
        style={{ marginTop: scaleSize(20) }}
      /> */}
      <ScrollView style={{ flex: 1, paddingTop: scaleSize(20) }}>
        {visibleData
          .filter((item) => {
            if (
              searchText !== '' &&
              !item.petName.toLowerCase().includes(searchText.toLowerCase())
            ) {
              return false;
            }
            if (
              filteredDistricts &&
              !item.district
                .toLowerCase()
                .includes(filteredDistricts.label.toLowerCase())
            ) {
              return false;
            }
            if (
              filteredProvinces &&
              !item.province
                .toLowerCase()
                .includes(filteredProvinces.label.toLowerCase())
            ) {
              return false;
            }
            return true;
          })
          .map((item, index) => (
            <LostPetsItem
              key={index}
              image={item.images[0]}
              gender={item.gender}
              name={item.petName}
              district={item.district}
              province={item.province}
              onDetail={() => {
                onDetail(item);
              }}
            />
            // <PetSearchCard
            //   key={index}
            //   image={item.images}
            //   name={item.petName}
            //   age={item.age}
            //   type={item.breed}
            //   district={item.district}
            //   province={item.province}
            //   gender={item.gender}
            //   onDetail={() => {
            //     onDetail(item);
            //   }}
            // />
          ))}
      </ScrollView>
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
