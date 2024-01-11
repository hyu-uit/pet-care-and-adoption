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
  RefreshControl,
  Platform,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { COLORS, STYLES, FONTS, SIZES, IMAGES } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import { Ionicons } from '@expo/vector-icons';
import CategoryItem from './components/search/CategoryItem';
import PetSearchCard from './components/search/PetSearchCard';
import FilterItem from './components/search/FilterItem';
import FilterModal from '../../components/FilterModal';
import {
  useGetAllPostsWithUserQuery,
  useGetPostsQuery,
} from '../../store/post/post.api';
import { CATEGORY } from '../../types/enum/category.enum';
import {
  useGetProvincesQuery,
  useLazyGetDistrictQuery,
} from '../../store/province/province.api';
import { Dropdown } from 'react-native-element-dropdown';
import { SEX } from '../../types/enum/sex.enum';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  AdoptionStackParamList,
  HomeStackParamList,
} from '../../navigators/config';
import { SCREEN } from '../../navigators/AppRoute';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from '../../store/favorite-post/favorite-post.api';
import { AddFavoriteREQ } from '../../store/favorite-post/request/add-favorite.request';
import { RemoveFavoriteREQ } from '../../store/favorite-post/request/remove-favorite.request';
import SkeletonSearch from '../../components/SkeletonSearch';

const SearchScreen = ({
  navigation,
}: NativeStackScreenProps<AdoptionStackParamList, SCREEN.SEARCH>) => {
  // const myPhoneNumber = '0848867679';
  const myPhoneNumber = useSelector(
    (state: RootState) => state.shared.user.phoneNumber
  );

  const {
    data: allPosts,
    refetch,
    isFetching: isFetchingPosts,
  } = useGetAllPostsWithUserQuery(myPhoneNumber);
  const { data: dataProvinces } = useGetProvincesQuery();
  const [getDistricts, { data: dataDistricts }] = useLazyGetDistrictQuery();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [filteredProvinces, setFilteredProvinces] = useState();
  const [filteredDistricts, setFilteredDistricts] = useState();
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CATEGORY>(
    CATEGORY.ALL
  );

  const [filteredSex, setFilteredSex] = useState<SEX | null>(null);
  const [filteredAge, setFilteredAge] = useState<number[]>([]);
  const [filteredVaccinated, setFilteredVaccinated] = useState<boolean | null>(
    null
  );
  const [refreshing, setRefreshing] = useState(false);

  const [allPostList, setAllPostList] = useState([]);

  const [visibleData, setVisibleData] = useState([]);
  const [renderedCount, setRenderedCount] = useState(10); // Initial number of items to render
  const loading = useRef(false);
  const pageSize = 10; // Number of items to load on each scroll event

  const onRefresh = async () => {
    setRefreshing(true);
    // Call your API or perform any asynchronous task
    await refetch();
    setRefreshing(false);
  };

  // useEffect(() => {
  //   const data = allPosts?.map((post) => ({
  //     image:
  //       'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
  //     postID: post.postID,
  //     petName: post.petName,
  //     age: post.age,
  //     sex: post.sex,
  //     species: post.species,
  //     breed: post.breed,
  //     weight: post.weight,
  //     district: post.district,
  //     province: post.province,
  //     description: post.description,
  //     isVaccinated: post.isVaccinated,
  //     isAdopt: post.isAdopt,
  //     isDone: post.isDone,
  //     userID: post.userID,
  //   }));
  //   setAllPostList(data);
  // }, allPosts);

  useEffect(() => {
    const visible = allPosts
      ?.filter((post) => post.postAdoptModel.isAdopt === true)
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
        isFav: post.isFav,
      }));

    setAllPostList(visible);
  }, [allPosts]);

  useEffect(() => {
    switch (selectedCategory) {
      case CATEGORY.CAT:
        const newData1 = allPostList?.filter((post) => post.species === 'Cat');
        setVisibleData(newData1);
        break;
      case CATEGORY.DOG:
        const newData2 = allPostList?.filter((post) => post.species === 'Dog');
        setVisibleData(newData2);
        break;
      case CATEGORY.OTHER:
        const newData3 = allPostList?.filter(
          (post) => post.species !== 'Cat' && post.species !== 'Dog'
        );
        setVisibleData(newData3);
    }
  }, [selectedCategory]);

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

  const onSearchName = (text) => {
    setSearchText(text);
    // if (selectedCategory !== CATEGORY.ALL) {
    //   switch (selectedCategory) {
    //     case CATEGORY.CAT:
    //       const newList1 = allPostList?.filter(
    //         (post) =>
    //           post.name.toLowerCase().includes(text.toLowerCase()) &&
    //           post.species === 'Cat'
    //       );
    //       setVisibleData(newList1);
    //     case CATEGORY.DOG:
    //       const newList2 = allPostList?.filter(
    //         (post) =>
    //           post.name.toLowerCase().includes(text.toLowerCase()) &&
    //           post.species === 'Dog'
    //       );
    //       setVisibleData(newList2);
    //     case CATEGORY.OTHER:
    //       const newList3 = allPostList?.filter(
    //         (post) =>
    //           post.name.toLowerCase().includes(text.toLowerCase()) &&
    //           post.species === 'Others'
    //       );
    //       setVisibleData(newList3);
    //   }
    // } else {
    //   const newList = allPostList?.filter((post) =>
    //     post.name.toLowerCase().includes(text.toLowerCase())
    //   );
    //   setVisibleData(newList); // Update the visible data based on the search
    // }
  };

  useEffect(() => {
    if (allPosts) {
      setVisibleData(allPostList); // Initially, set visible data to all data
    }
  }, [allPostList]);

  useEffect(() => {
    // Update visible data whenever allPostList changes
    setVisibleData(allPostList?.slice(0, renderedCount));
  }, [allPostList, renderedCount]);

  const ages = [
    '< 2 months',
    '2 - 4 months',
    '4 - 7 months',
    '7 - 12 months',
    '1 - 2 years',
    '> 2 years',
  ];

  const onDetail = (item) => {
    console.log(item);
    // navigation.navigate(SCREEN.PET_DETAIL, { postData: item });
  };

  const getAgeRangeIndex = (ageInMonths) => {
    if (ageInMonths < 2) {
      return 0;
    } else if (ageInMonths >= 2 && ageInMonths < 4) {
      return 1;
    } else if (ageInMonths >= 4 && ageInMonths < 7) {
      return 2;
    } else if (ageInMonths >= 7 && ageInMonths < 12) {
      return 3;
    } else if (ageInMonths >= 12 && ageInMonths < 24) {
      return 4;
    } else return 5;
  };

  const onAddFavorite = async (postID) => {
    try {
      const body: AddFavoriteREQ = {
        postID: postID,
        userID: myPhoneNumber,
      };

      await addFavorite(body).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveFavorite = async (postID) => {
    try {
      const body: RemoveFavoriteREQ = {
        postID: postID,
        userID: myPhoneNumber,
      };
      await removeFavorite(body).unwrap();
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <FilterModal
        open={filterShown}
        onClose={onCloseFilter}
        sex={filteredSex}
        onSelectSex={setFilteredSex}
        age={filteredAge}
        onSelectAges={setFilteredAge}
        vaccinated={filteredVaccinated}
        onSelectVaccinated={setFilteredVaccinated}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingTop: Platform.OS === 'ios' && scaleSize(20),
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <TouchableOpacity
          style={{
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginBottom: scaleSize(5),
          }}
          onPress={() => {
            setSearchText('');
            setFilteredDistricts(null);
            setFilteredProvinces(null);
            setDistricts([]);
            setFilteredAge([]);
            setFilteredSex(null);
            setFilteredVaccinated(null);
          }}
        >
          <Text style={styles.clear}>Clear all</Text>
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <Dropdown
            data={provinces}
            labelField={'label'}
            valueField={'value'}
            value={filteredProvinces}
            placeholder='Select province'
            placeholderStyle={{ color: COLORS.grayPrimary }}
            style={[
              styles.input,
              { paddingLeft: scaleSize(20), ...FONTS.body7 },
            ]}
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
            value={filteredDistricts}
            placeholder='Select district'
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
            <CategoryItem
              type={CATEGORY.ALL}
              onPress={() => {
                setSelectedCategory(CATEGORY.ALL);
                setVisibleData(allPostList);
              }}
              style={{
                borderColor:
                  selectedCategory === CATEGORY.ALL
                    ? COLORS.primary
                    : COLORS.grayLight,
              }}
            />
            <CategoryItem
              type={CATEGORY.CAT}
              onPress={() => {
                setSelectedCategory(CATEGORY.CAT);
              }}
              style={{
                borderColor:
                  selectedCategory === CATEGORY.CAT
                    ? COLORS.primary
                    : COLORS.grayLight,
              }}
            />
            <CategoryItem
              type={CATEGORY.DOG}
              onPress={() => {
                setSelectedCategory(CATEGORY.DOG);
              }}
              style={{
                borderColor:
                  selectedCategory === CATEGORY.DOG
                    ? COLORS.primary
                    : COLORS.grayLight,
              }}
            />
            <CategoryItem
              type={CATEGORY.OTHER}
              onPress={() => {
                setSelectedCategory(CATEGORY.OTHER);
              }}
              style={{
                borderColor:
                  selectedCategory === CATEGORY.OTHER
                    ? COLORS.primary
                    : COLORS.grayLight,
              }}
            />
          </ScrollView>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: scaleSize(20),
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: scaleSize(20),
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: scaleSize(10),
              maxWidth: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity style={styles.filterButton} onPress={onFilter}>
              <Image source={IMAGES.FILTER} style={styles.filterIcon} />
            </TouchableOpacity>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {filteredSex && (
                <FilterItem
                  title={filteredSex === SEX.MALE ? 'Male' : 'Female'}
                />
              )}
              {filteredAge &&
                filteredAge.map((age, index) => (
                  <FilterItem key={index} title={ages[age]} />
                ))}
              {filteredVaccinated === true && <FilterItem title='vaccinated' />}
              {filteredVaccinated === false && (
                <FilterItem title='non-vaccinated' />
              )}
            </ScrollView>
            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginBottom: scaleSize(5),
              }}
              onPress={() => {
                setFilteredAge([]);
                setFilteredSex(null);
                setFilteredVaccinated(null);
                setFilteredAge([]);
              }}
            >
              <Text style={styles.clear}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <Text style={styles.title}>Pets near me</Text> */}

        {/* <FlatList
          ref={flatListRef}
          data={visibleData}
          renderItem={renderAdoptPost}
          keyExtractor={(item, index) => index}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
        /> */}
        {/* post.name.toLowerCase().includes(text.toLowerCase()) */}

        {isFetchingPosts ? (
          <>
            <SkeletonSearch />
            <SkeletonSearch />
            <SkeletonSearch />
            <SkeletonSearch />
          </>
        ) : (
          <>
            {visibleData
              ?.filter((item) => {
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
                if (filteredSex && item.sex !== filteredSex) {
                  return false;
                }
                if (filteredVaccinated !== null) {
                  return filteredVaccinated === item.isVaccinated;
                }
                if (filteredAge.length > 0) {
                  return filteredAge.includes(getAgeRangeIndex(item.age));
                }
                return true;
              })
              .map((item, index) => (
                <PetSearchCard
                  key={index}
                  image={item.images}
                  name={item.petName}
                  age={item.age}
                  type={item.breed}
                  district={item.district}
                  province={item.province}
                  gender={item.sex}
                  isFav={item.isFav}
                  onDetail={() => {
                    onDetail(item);
                  }}
                  onAddFavorite={() => {
                    onAddFavorite(item.postID);
                  }}
                  onRemoveFavorite={() => {
                    onRemoveFavorite(item.postID);
                  }}
                />
              ))}
          </>
        )}
        <View style={{ marginBottom: SIZES.bottomPadding * 2 }}></View>
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
