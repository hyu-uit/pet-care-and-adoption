import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  FlatList,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { COLORS, STYLES, FONTS, SIZES, IMAGES } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import { Ionicons } from '@expo/vector-icons';
import CategoryItem from './components/search/CategoryItem';
import PetSearchCard from './components/search/PetSearchCard';
import FilterItem from './components/search/FilterItem';
import FilterModal from '../../components/FilterModal';
import { useGetPostsQuery } from '../../store/post/post.api';
import { CATEGORY } from '../../types/enum/category.enum';
import {
  useGetProvincesQuery,
  useLazyGetDistrictQuery,
} from '../../store/province/province.api';
import { Dropdown } from 'react-native-element-dropdown';

const SearchScreen = () => {
  const { data: allPosts } = useGetPostsQuery();
  const { data: dataProvinces } = useGetProvincesQuery();
  const [getDistricts, { data: dataDistricts }] = useLazyGetDistrictQuery();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [allPostList, setAllPostList] = useState([]);

  const [visibleData, setVisibleData] = useState([]);
  const [renderedCount, setRenderedCount] = useState(10); // Initial number of items to render
  const loading = useRef(false);
  const pageSize = 10; // Number of items to load on each scroll event
  const flatListRef = useRef(null);

  const handleLoadMore = useCallback(() => {
    if (loading.current || renderedCount >= allPostList.length) {
      return;
    }

    loading.current = true;

    // Simulate a delay for better visualization (remove in a real-world scenario)
    setTimeout(() => {
      const newRenderedCount = Math.min(
        renderedCount + pageSize,
        allPostList.length
      );
      setVisibleData(allPostList.slice(0, newRenderedCount));
      setRenderedCount(newRenderedCount);
      loading.current = false;
    }, 1000); // Adjust the delay as needed
  }, [allPostList, renderedCount]);

  useEffect(() => {
    // Initial rendering
    handleLoadMore();
  }, [handleLoadMore]);

  useEffect(() => {
    setAllPostList(allPosts);
  }, allPosts);

  // const data = allPostList.map((post) => ({
  //   image:
  //     'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
  //   name: post.petName,
  //   gender: post.sex,
  //   age: 4,
  //   type: post.breed,
  //   district: post.district,
  //   province: post.province,
  // }));

  const [filterShown, setFilterShown] = useState<boolean>(false);
  // const data = [
  //   {
  //     image:
  //       'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
  //     name: 'Bobo',
  //     age: 4,
  //     type: 'Labrador Retriever',
  //     location: 'Thu Duc City, Vietnam',
  //     kilometer: 2.5,
  //   },
  //   {
  //     image:
  //       'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
  //     name: 'Bobo',
  //     age: 4,
  //     type: 'Labrador Retriever',
  //     location: 'Thu Duc City, Vietnam',
  //     kilometer: 2.5,
  //   },
  //   {
  //     image:
  //       'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
  //     name: 'Bobo',
  //     age: 4,
  //     type: 'Labrador Retriever',
  //     location: 'Thu Duc City, Vietnam',
  //     kilometer: 2.5,
  //   },
  //   {
  //     image:
  //       'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
  //     name: 'Bobo',
  //     age: 4,
  //     type: 'Labrador Retriever',
  //     location: 'Thu Duc City, Vietnam',
  //     kilometer: 2.5,
  //   },
  // ];

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

  const onFilter = () => {
    setFilterShown(true);
  };

  const onCloseFilter = () => {
    setFilterShown(false);
  };

  const onSearchName = () => {};

  const renderAdoptPost = ({ item, index }) => (
    <PetSearchCard
      key={index}
      image={item.image}
      name={item.name}
      age={item.age}
      type={item.type}
      district={item.district}
      province={item.province}
      gender={item.gender}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <FilterModal open={filterShown} onClose={onCloseFilter} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchWrapper}>
          <Dropdown
            data={provinces}
            labelField={'label'}
            valueField={'value'}
            placeholder='Select province'
            placeholderStyle={{ color: COLORS.grayPrimary }}
            style={[
              styles.input,
              { paddingLeft: scaleSize(20), ...FONTS.body7 },
            ]}
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
        <View style={[styles.searchWrapper, { marginTop: scaleSize(10) }]}>
          <TextInput
            style={styles.input}
            placeholder='Search...'
            onChangeText={onSearchName}
          />
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
            <CategoryItem type={CATEGORY.CAT} />
            <CategoryItem type={CATEGORY.DOG} />
            <CategoryItem type={CATEGORY.OTHER} />
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

        <FlatList
          ref={flatListRef}
          data={visibleData}
          renderItem={renderAdoptPost}
          keyExtractor={(item, index) => index}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
        />

        {/* {data.map((item, index) => (
          <PetSearchCard
            key={index}
            image={item.image}
            name={item.name}
            age={item.age}
            type={item.type}
            district={item.district}
            province={item.province}
            gender={item.gender}
          />
        ))} */}
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
