import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Touchable,
  ScrollView,
  FlatList,
  RefreshControl,
  Linking,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, IMAGES, SIZES, FONTS } from '../../config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scaleSize } from '../../utils/DeviceUtils';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
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
import {
  useGetAllPostsWithUserQuery,
  useGetPostsQuery,
} from '../../store/post/post.api';
import { Post } from '../../store/post/response/get-add.response';
import { doc, onSnapshot } from 'firebase/firestore';
import { firestoreDB } from '../../../firebaseConfig';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useGetUserInformationQuery } from '../../store/users/users.api';
import * as Location from 'expo-location';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import SkeletonHome from '../../components/SkeletonHome';

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<HomeStackParamList, SCREEN.HOME>) => {
  // const myPhoneNumber = '0848867679';
  const myPhoneNumber = useSelector(
    (state: RootState) => state.shared.user.phoneNumber
  );

  const {
    data: allPosts,
    refetch,
    isFetching: isFetchingPosts,
  } = useGetAllPostsWithUserQuery(myPhoneNumber);
  const { data: userData } = useGetUserInformationQuery(myPhoneNumber);

  const [chats, setChats] = useState([]);
  const [newMessage, setNewMessage] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [veterinaryList, setVeterinaryList] = useState([]);
  const [isFetchingVeterinary, setIsFetchingVeterinary] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Call your API or perform any asynchronous task
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(firestoreDB, 'userChats', myPhoneNumber),
        (doc) => {
          setChats(doc.data() as []);
        }
      );

      return () => {
        unsub();
      };
    };

    myPhoneNumber && getChats();
  }, [myPhoneNumber]);

  useEffect(() => {
    if (!chats) return;
    const has = Object.entries(chats).find((item) => item[1].isRead);
    if (has) {
      setNewMessage(true);
    } else setNewMessage(false);
  }, [chats]);

  useEffect(() => {
    // Listener for notifications received while the app is in the foreground
    const foregroundSubscription =
      Notifications.addNotificationReceivedListener(handleNotification);

    // Listener for notifications when the app is in the background or terminated
    const backgroundSubscription =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationResponse
      );

    return () => {
      foregroundSubscription.remove();
      backgroundSubscription.remove();
    };
  }, []);

  const handleNotification = (notification) => {
    // Handle the notification when received while the app is in the foreground
    console.log('Notification received in the foreground:', notification);
  };

  const handleNotificationResponse = (response) => {
    // Handle the notification when the user presses on it (foreground, background, or terminated)
    console.log('Notification response received:', response);

    navigation.navigate(SCREEN.BOTTOM_TABS, {
      screen: 'Profile',
      params: { isRequest: true },
    });
  };

  // const limitedAdoptPosts =
  //   allPosts?.length > 7
  //     ? allPosts
  //         ?.filter((post) => post.postAdoptModel.isAdopt === true)
  //         .slice(0, 7)
  //     : allPosts;

  // const limitedLostPosts =
  //   allPosts?.length > 7
  //     ? allPosts
  //         ?.filter((post) => post.postAdoptModel.isAdopt !== true)
  //         .slice(0, 7)
  //     : allPosts;

  const limitedAdoptPosts = allPosts
    ?.filter((post) => post.postAdoptModel.isAdopt === true)
    .slice(0, 7)
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

  const limitedLostPosts = allPosts
    ?.filter((post) => post.postAdoptModel.isAdopt === false)
    .slice(0, 7)
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

  // const adoptedList =
  //   allPosts &&
  //   allPosts.map((post) => ({
  //     images:
  //       'https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*',
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

  const [location, setLocation] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission not granted');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const getNearbyVeterinaryClinics = async (latitude, longitude) => {
    const apiUrl = `https://api.geoapify.com/v2/places?categories=pet.veterinary&filter=rect%3A${
      longitude - 0.2
    }%2C${latitude - 0.2}%2C${longitude + 0.2}%2C${
      latitude + 0.2
    }&limit=20&apiKey=ba79b1d022c24db7854a7fff87d9814d`;

    try {
      const response = await fetch(apiUrl);
      return response.json();
    } catch (error) {
      console.error('Error fetching nearby clinics', error);
      return [];
    }
  };

  useEffect(() => {
    const getVeterinary = async () => {
      if (location?.coords) {
        try {
          setIsFetchingVeterinary(true);
          const res = await getNearbyVeterinaryClinics(
            location?.coords.latitude,
            location?.coords.longitude
          );
          setVeterinaryList(res.features);
          setIsFetchingVeterinary(false);
        } catch (error) {
          setIsFetchingVeterinary(false);
          console.log(error);
        }
      }
    };

    getVeterinary();
  }, [location]);

  const onSearch = () => {
    navigation.navigate('Adoption', { screen: SCREEN.SEARCH });
  };

  const onAdoptPets = () => {
    navigation.navigate('Adoption', { screen: SCREEN.SEARCH });
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
    navigation.navigate(SCREEN.PET_DETAIL, { postData: item });
  };

  const renderItemAdopted = ({ item }) => {
    return (
      <AdoptedPetCard
        key={item.images[0]}
        image={item.images}
        name={item.petName}
        gender={item.sex}
        district={item.district}
        province={item.province}
        onDetail={() => {
          onDetail(item);
        }}
      />
    );
  };

  const renderItemClinic = ({ item, index }) => {
    const random = Math.floor(Math.random() * 5);

    const onNavigateToMaps = async () => {
      const url = `https://www.google.com/maps/search/?api=1&query=${item.properties.lat},${item.properties.lon}&query_place_id=${item.properties.name}`;
      Linking.openURL(url);
      // const url = `https://www.google.com/maps/dir/?api=1&destination=${item.properties.lat},${item.properties.lon}`;
      // Linking.openURL(url).catch((err) =>
      //   console.error('An error occurred', err)
      // );
    };

    return (
      <NearByCard
        name={item.properties.name || 'No named'}
        star={item.star}
        rate={item.rate}
        kilometer={item.kilometer}
        address={item.properties.address_line2}
        onNavigateToMap={onNavigateToMaps}
        image={
          random === 0
            ? 'https://cdn2.vectorstock.com/i/1000x1000/06/11/veterinary-medicine-hospital-clinic-or-pet-shop-vector-15880611.jpg'
            : random === 1
            ? 'https://cdn1.vectorstock.com/i/1000x1000/13/20/vet-clinic-with-doctor-vector-21191320.jpg'
            : random === 2
            ? 'https://img.freepik.com/premium-vector/veterinary-clinic-doctor-examining-vaccination-health-care-pets-like-dogs-cats-flat-cartoon-background-vector-illustration-poster-banner_2175-3384.jpg'
            : random === 3
            ? 'https://cdn2.vectorstock.com/i/1000x1000/97/86/vet-and-cats-at-pet-hospital-vector-8479786.jpg'
            : random === 4
            ? 'https://previews.123rf.com/images/fivestarspro/fivestarspro1912/fivestarspro191200049/135504589-pets-caring-owners-walking-dogs-in-front-of-veterinary-clinic-or-hospital-modern-building-people-and.jpg'
            : 'https://static.vecteezy.com/system/resources/previews/005/447/141/non_2x/veterinary-clinic-doctor-examining-vaccination-and-health-care-for-pets-like-dogs-and-cats-in-flat-cartoon-background-illustration-for-poster-or-banner-vector.jpg'
        }
      />
    );
  };

  const renderItemLost = ({ item }) => {
    return (
      <AdoptedPetCard
        image={item.images}
        name={item.petName}
        gender={item.sex}
        district={item.district}
        province={item.province}
        onDetail={() => {
          onDetail(item);
        }}
      />
    );
  };

  const onChat = () => {
    navigation.navigate(SCREEN.CHAT_HISTORY);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <TouchableOpacity onPress={onSendNotification}>
        <Text>Send</Text>
      </TouchableOpacity> */}
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
            {newMessage && (
              <View
                style={{
                  width: scaleSize(8),
                  height: scaleSize(8),
                  borderRadius: scaleSize(5),
                  backgroundColor: COLORS.primary,
                  position: 'absolute',
                  right: 0,
                  zIndex: 1000,
                }}
              ></View>
            )}
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.locationContainer}>
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                // alignItems: 'center',
              }}
            >
              <MaterialIcons
                name='location-on'
                size={24}
                color={COLORS.primary}
              />
              {userData?.district && userData?.province && (
                <Text style={styles.address}>
                  {userData?.district + `,\n` + userData?.province}
                </Text>
              )}
            </View>
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

        {isFetchingPosts ? (
          <FlatList
            data={[1, 2, 3]}
            renderItem={(item) => (
              <>
                <SkeletonHome key={item.index} />
              </>
            )}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: scaleSize(20) }}
          />
        ) : (
          <FlatList
            data={limitedAdoptPosts}
            keyExtractor={(item) => item.image}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            renderItem={renderItemAdopted}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: scaleSize(20) }}
          />
        )}

        <Title title='Pet care videos' />

        <PetCareVideosSlider />

        <Title title='Nearby veterinary clinic' />

        {isFetchingVeterinary ? (
          <FlatList
            data={[1, 2, 3]}
            keyExtractor={(item) => item}
            renderItem={(item) => <SkeletonHome key={item.index} />}
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: scaleSize(20) }}
          />
        ) : (
          <FlatList
            data={veterinaryList}
            keyExtractor={(item) => item.image}
            renderItem={renderItemClinic}
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: scaleSize(20) }}
          />
        )}

        <Title title='Lost pets' />

        {isFetchingPosts ? (
          <FlatList
            data={[1, 2, 3]}
            keyExtractor={(item) => item}
            renderItem={(item) => (
              <>
                <SkeletonHome key={item.index} />
              </>
            )}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: scaleSize(20) }}
          />
        ) : (
          <FlatList
            data={limitedLostPosts}
            keyExtractor={(item) => item.image}
            renderItem={renderItemLost}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: scaleSize(20) }}
          />
        )}

        <View style={{ paddingBottom: SIZES.bottomPadding }}></View>
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
    ...FONTS.body5,
    fontWeight: 'bold',
    // paddingLeft: scaleSize(16),
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
