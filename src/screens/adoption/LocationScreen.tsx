import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES, STYLES, FONTS } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import {
  Entypo,
  Feather,
  FontAwesome5,
  MaterialIcons,
} from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Button from '../../components/Button';

const LocationScreen = () => {
  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          setCenter({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        } else {
          setError('Location permission not granted');
        }
      } catch (error) {
        console.error('Error getting location:', error);
        setError('Error getting location');
      } finally {
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  const handleRegionChange = async (region) => {
    setCenter({
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };

  const handleChooseLocation = async () => {
    console.log('Selected Location:', center);
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${center.latitude},${center.longitude}&key=AIzaSyDEokOCthVrnmMPiI_fLEZKQtV1SjFvjxQ`
    );
    const data = await response.json();

    if (data.results.length > 0) {
      const address = data.results[0].formatted_address;

      // You can use the 'address' variable as needed in your app
    }

    // You can perform any action with the selected location here
  };

  return (
    <View style={styles.container}>
      <View>
        <Entypo
          name='location'
          size={scaleSize(24)}
          color={COLORS.grayLight}
          style={styles.iconLocation}
        />
        <TextInput
          placeholder={'Near me'}
          onChangeText={() => {}}
          secureTextEntry={false}
          placeholderTextColor={COLORS.grayC2C2CE}
          style={styles.input}
        />
      </View>

      <TouchableOpacity
        style={{
          ...STYLES.horizontal,
          marginTop: scaleSize(20),
          justifyContent: 'flex-start',
          gap: scaleSize(8),
        }}
      >
        <MaterialIcons
          name='my-location'
          size={scaleSize(20)}
          color={COLORS.primary}
        />
        <Text style={styles.text}>Current location</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          ...STYLES.horizontal,
          marginTop: scaleSize(20),
          justifyContent: 'flex-start',
          gap: scaleSize(8),
        }}
      >
        <Feather name='map' size={scaleSize(20)} color={COLORS.primary} />
        <Text style={styles.text}>Select search area on map</Text>
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : (
          <MapView
            style={{
              flex: 1,
              marginVertical: scaleSize(20),
              borderRadius: scaleSize(10),
            }}
            onRegionChangeComplete={handleRegionChange}
            region={{
              latitude: center.latitude,
              longitude: center.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: center.latitude,
                longitude: center.longitude,
              }}
            />
          </MapView>
        )}
        <Button
          title='Choose Location'
          onPress={handleChooseLocation}
          isLoading={false}
          style={styles.chooseButton}
        />
      </View>
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.background,
    flex: 1,
  },
  input: {
    ...STYLES.input,
    paddingLeft: scaleSize(42),
  },
  iconLocation: {
    position: 'absolute',
    top: scaleSize(25) - scaleSize(24) / 2,
    zIndex: 1000,
    left: scaleSize(10),
  },
  text: {
    ...FONTS.body3,
    color: COLORS.primary,
  },
  chooseButton: {
    height: scaleSize(40),
    position: 'absolute',
    bottom: scaleSize(30),
    width: '90%',
    alignSelf: 'center',
  },
});
