import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Touchable,
  ScrollView,
  FlatList,
} from 'react-native';
import React from 'react';
import { COLORS, IMAGES, SIZES, FONTS } from '../../config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scaleSize } from '../../utils/DeviceUtils';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import Banner from './components/home/Banner';
import Title from './components/home/Title';
import AdoptedPetCard from './components/home/AdoptedPetCard';
import PetCareVideosSlider from './components/home/PetCareVideosSlider';
import NearByCard from './components/home/NearByCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  AuthStackParamList,
  HomeStackParamList,
} from '../../navigators/config';
import { SCREEN } from '../../navigators/AppRoute';
import { useGetPostsQuery } from '../../store/post/post.api';
import { Post } from '../../store/post/response/get-add.response';

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<HomeStackParamList, SCREEN.HOME>) => {
  const { data: allPosts } = useGetPostsQuery();

  const limitedAdoptPosts =
    allPosts?.length > 7
      ? allPosts?.filter((post) => post.isAdopt === true).slice(0, 7)
      : allPosts;

  const limitedLostPosts =
    allPosts?.length > 7
      ? allPosts?.filter((post) => post.isAdopt !== true).slice(0, 7)
      : allPosts;

  const adoptedList =
    allPosts &&
    limitedAdoptPosts.map((post) => ({
      image:
        'https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*',
      name: post.petName,
      gender: post.sex,
      district: post.district,
      province: post.province,
      postId: post.postID,
    }));

  const lostList =
    allPosts &&
    limitedLostPosts.map((post) => ({
      image:
        'https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*',
      name: post.petName,
      gender: post.sex,
      district: post.district,
      province: post.province,
      postId: post.postID,
    }));

  console.log('lostne', lostList);
  // const adoptedList = [
  //   {
  //     image:
  //       'https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*',
  //     name: 'Samatha',
  //     gender: 'Male',
  //     address: 'Binh Duong',
  //     kilometer: 2.5,
  //   },
  //   {
  //     image:
  //       'https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*',
  //     name: 'Samatha',
  //     gender: 'Male',
  //     address: 'Binh Duong',
  //     kilometer: 2.5,
  //   },
  //   {
  //     image:
  //       'https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*',
  //     name: 'Samatha',
  //     gender: 'Male',
  //     address: 'Binh Duong',
  //     kilometer: 2.5,
  //   },
  //   {
  //     image:
  //       'https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*',
  //     name: 'Samatha',
  //     gender: 'Male',
  //     address: 'Binh Duong',
  //     kilometer: 2.5,
  //   },
  //   {
  //     image:
  //       'https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*',
  //     name: 'Samatha',
  //     gender: 'Male',
  //     address: 'Binh Duong',
  //     kilometer: 2.5,
  //   },
  //   {
  //     image:
  //       'https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*',
  //     name: 'Samatha',
  //     gender: 'Male',
  //     address: 'Binh Duong',
  //     kilometer: 2.5,
  //   },
  // ];

  const clinicList = [
    {
      name: 'Petzone - 283 VVN',
      star: 4.5,
      rate: 113,
      kilometer: 3.8,
      image:
        'https://cdn1.vectorstock.com/i/1000x1000/13/20/vet-clinic-with-doctor-vector-21191320.jpg',
    },
    {
      name: 'Petzone - 283 VVN',
      star: 4.5,
      rate: 113,
      kilometer: 3.8,
      image:
        'https://cdn1.vectorstock.com/i/1000x1000/13/20/vet-clinic-with-doctor-vector-21191320.jpg',
    },
    {
      name: 'Petzone - 283 VVN',
      star: 4.5,
      rate: 113,
      kilometer: 3.8,
      image:
        'https://cdn1.vectorstock.com/i/1000x1000/13/20/vet-clinic-with-doctor-vector-21191320.jpg',
    },
    {
      name: 'Petzone - 283 VVN',
      star: 4.5,
      rate: 113,
      kilometer: 3.8,
      image:
        'https://cdn1.vectorstock.com/i/1000x1000/13/20/vet-clinic-with-doctor-vector-21191320.jpg',
    },
  ];

  const onSearch = () => {
    navigation.navigate(SCREEN.SEARCH);
  };

  const onAdoptPets = () => {
    navigation.navigate(SCREEN.SEARCH);
  };

  const onPetCareVideos = () => {
    navigation.navigate(SCREEN.PET_CARE_VIDEOS);
  };

  const onNearlyClinic = () => {
    navigation.navigate(SCREEN.NEARBY_CLINIC);
  };

  const onLostPets = () => {
    navigation.navigate(SCREEN.LOST_PETS);
  };

  const onNotification = () => {
    navigation.navigate(SCREEN.NOTIFICATION);
  };

  const onMenu = () => {
    navigation.navigate(SCREEN.MENU);
  };

  const onDetail = (item) => {
    navigation.navigate(SCREEN.PET_DETAIL, { petData: item });
  };

  const renderItemAdopted = ({ item }) => {
    return (
      <AdoptedPetCard
        image={item.image}
        name={item.name}
        gender={item.gender}
        district={item.district}
        province={item.province}
        onDetail={() => {
          onDetail(item);
        }}
      />
    );
  };

  const renderItemClinic = ({ item }) => {
    return (
      <NearByCard
        name={item.name}
        star={item.star}
        rate={item.rate}
        kilometer={item.kilometer}
        image={item.image}
      />
    );
  };

  const renderItemLost = ({ item }) => {
    return (
      <AdoptedPetCard
        image={item.image}
        name={item.name}
        gender={item.gender}
        district={item.district}
        province={item.province}
      />
    );
  };

  const onChat = () => {
    navigation.navigate(SCREEN.CHAT_HISTORY);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoWrapper}>
          <Image
            source={IMAGES.LOGO}
            style={{ width: scaleSize(31), height: scaleSize(31) }}
          />
          <Image
            source={IMAGES.BRAND_NAME}
            style={{
              width: scaleSize(96),
              height: scaleSize(34),
              resizeMode: 'contain',
              marginLeft: scaleSize(3),
            }}
          />
        </View>
        <View style={styles.logoWrapper}>
          <TouchableOpacity
            onPress={onChat}
            style={{ marginRight: scaleSize(3) }}
          >
            <Ionicons
              name='ios-chatbubble-ellipses-outline'
              size={scaleSize(20)}
              color={COLORS.grayPrimary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onNotification}>
            <Ionicons
              name='notifications-outline'
              size={scaleSize(22)}
              color={COLORS.grayPrimary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onMenu}>
            <Ionicons
              name='menu-sharp'
              size={scaleSize(22)}
              color={COLORS.grayPrimary}
              style={{ marginLeft: scaleSize(5) }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.locationContainer}>
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text>Location</Text>
            </View>
            <Text style={styles.address}>Thu Duc City, Vietnam</Text>
          </View>
          <View>
            <TouchableOpacity onPress={onSearch} style={styles.searchWrapper}>
              <Text style={styles.searchText}>Search</Text>
              <Ionicons
                name='search'
                size={scaleSize(15)}
                color={COLORS.grayPrimary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Banner />

        <Title title='Adopt pets' onSeeAll={onAdoptPets} />

        <FlatList
          data={adoptedList}
          keyExtractor={(item) => item.image}
          renderItem={renderItemAdopted} //method to render the data in the way you want using styling u need
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: scaleSize(20) }}
        />

        <Title title='Pet care videos' onSeeAll={onPetCareVideos} />

        <PetCareVideosSlider />

        <Title title='Nearby veterinary clinic' onSeeAll={onNearlyClinic} />

        <FlatList
          data={clinicList}
          keyExtractor={(item) => item.image}
          renderItem={renderItemClinic} //method to render the data in the way you want using styling u need
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: scaleSize(20) }}
        />

        <Title title='Lost pets' onSeeAll={onLostPets} />

        <FlatList
          data={lostList}
          keyExtractor={(item) => item.image}
          renderItem={renderItemLost} //method to render the data in the way you want using styling u need
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: scaleSize(20) }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.background,
    flex: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaleSize(5),
    alignItems: 'center',
  },
  address: {
    ...FONTS.body4,
    fontWeight: 'bold',
    paddingLeft: scaleSize(16),
    color: COLORS.primary,
  },
  searchWrapper: {
    width: scaleSize(100),
    height: scaleSize(27),
    backgroundColor: COLORS.tertiary,
    borderRadius: scaleSize(33),
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: scaleSize(12),
  },
  searchText: {
    ...FONTS.body6,
    color: COLORS.grayPrimary,
  },
  adoptedContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: scaleSize(21),
    marginTop: scaleSize(20),
  },
  nearByContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: scaleSize(16),
    marginTop: scaleSize(20),
  },
});
