import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, FONTS, STYLES } from '../../../config';
import Button from '../../../components/Button';
import { scaleSize } from '../../../utils/DeviceUtils';
import ProfileRequestItem from './ProfileRequestItem';
import PetSearchCard from '../../home/components/search/PetSearchCard';

const ProfileRequest = () => {
  const [tab, setTab] = useState<number>(0);

  const data = [
    {
      imagePet:
        'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
      imageUser:
        'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
      name: 'Vincent',
    },
    {
      imagePet:
        'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
      imageUser:
        'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
      name: 'Vincent',
    },
    {
      imagePet:
        'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
      imageUser:
        'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
      name: 'Vincent',
    },
    {
      imagePet:
        'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
      imageUser:
        'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
      name: 'Vincent',
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <ProfileRequestItem
        imagePet={item.imagePet}
        imageUser={item.imageUser}
        name={item.name}
      />
    );
  };

  const renderItemSent = ({ item }) => {
    return (
      <ProfileRequestItem
        imagePet={item.imagePet}
        imageUser={item.imageUser}
        name={item.name}
        sent={true}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: scaleSize(20),
        }}
      >
        <TouchableOpacity
          style={tab === 0 ? styles.primary : styles.outlined}
          onPress={() => {
            setTab(0);
          }}
        >
          <Text style={tab === 0 ? styles.primaryText : styles.sent}>
            Requested
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tab === 0 ? styles.outlined : styles.primary}
          onPress={() => {
            setTab(1);
          }}
        >
          <Text style={tab === 0 ? styles.sent : styles.primaryText}>Sent</Text>
        </TouchableOpacity>
      </View>

      {tab === 0 && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.title}
          renderItem={renderItem} //method to render the data in the way you want using styling u need
          horizontal={false}
          numColumns={1}
          style={{ marginTop: scaleSize(20) }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {tab === 1 && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.title}
          renderItem={renderItemSent} //method to render the data in the way you want using styling u need
          horizontal={false}
          numColumns={1}
          style={{ marginTop: scaleSize(20) }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default ProfileRequest;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.padding,
  },
  outlined: {
    backgroundColor: COLORS.tertiary,
    width: scaleSize(145),
    height: scaleSize(50),
    borderRadius: scaleSize(17),
    borderWidth: scaleSize(1),
    borderColor: COLORS.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sent: {
    ...FONTS.h1,
    fontSize: scaleSize(17),
    fontWeight: '800',
    lineHeight: scaleSize(27.2),
    color: COLORS.primary,
  },
  primary: {
    ...STYLES.button,
    width: scaleSize(145),
  },
  primaryText: {
    ...STYLES.buttonText,
    ...FONTS.h1,
    fontSize: scaleSize(17),
    fontWeight: '800',
    lineHeight: scaleSize(27.2),
    color: COLORS.whitePrimary,
  },
});
