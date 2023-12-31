import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Linking,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES, STYLES, FONTS } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import { Ionicons } from '@expo/vector-icons';
import NearbyClinicItem from './components/nearby-clinic/NearbyClinicItem';
import * as Location from 'expo-location';
import NearByCard from './components/home/NearByCard';
import { Dropdown } from 'react-native-element-dropdown';
import {
  useGetProvincesQuery,
  useLazyGetDistrictQuery,
} from '../../store/province/province.api';

const NearbyClinicScreen = () => {
  const [location, setLocation] = useState(null);
  const [veterinaryList, setVeterinaryList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [visibleData, setVisibleData] = useState(veterinaryList);

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

  useEffect(() => {
    setVisibleData(veterinaryList);
  }, [veterinaryList]);

  useEffect(() => {
    const newData = [...veterinaryList];

    setVisibleData(
      newData.filter((item) => {
        // Add your conditions here
        if (
          searchText !== '' &&
          !(
            item.properties.address_line1 &&
            item.properties.address_line1
              .toLowerCase()
              .includes(searchText.toLowerCase())
          )
        ) {
          return false;
        }

        // Include other conditions as needed

        return true;
      })
    );
  }, [searchText]);

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
        const res = await getNearbyVeterinaryClinics(
          location?.coords.latitude,
          location?.coords.longitude
        );
        setVeterinaryList(res.features);
      }
    };

    getVeterinary();
  }, [location]);

  const renderItem = ({ item }) => {
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
      <View>
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
        <View style={{ marginBottom: scaleSize(10) }}></View>
      </View>
    );
  };

  const onSearchName = (text) => {
    setSearchText(text);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={[styles.searchWrapper, { marginTop: scaleSize(10) }]}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
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
      </View>

      <FlatList
        data={visibleData}
        keyExtractor={(item) => item.name}
        renderItem={renderItem} //method to render the data in the way you want using styling u need
        horizontal={false}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </View>
  );
};

export default NearbyClinicScreen;

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
    // width: scaleSize(140),
    height: scaleSize(40),
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
