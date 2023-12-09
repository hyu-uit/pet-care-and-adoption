import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, IMAGES, SIZES, FONTS, STYLES } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import { Entypo } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AdoptionStackParamList } from '../../navigators/config';
import { SCREEN } from '../../navigators/AppRoute';
import * as ImagePicker from 'expo-image-picker';

type ImageType = {
  uri: string;
};

const AddPostScreen = ({
  navigation,
}: NativeStackScreenProps<AdoptionStackParamList, SCREEN.LOCATION>) => {
  const [img, setImg] = useState([]);

  const onLocation = () => {
    navigation.navigate(SCREEN.LOCATION);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      const image = {
        uri: result.assets[0].uri,
        base64: result.assets[0].base64,
      };
      const isMatch = img.some(
        (item) => item.base64 === result.assets[0].base64
      );
      if (isMatch) {
        return;
      }

      setImg([...img, image]);
    }
  };

  const renderImage = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.imageWrapper}
        onPress={() => {
          console.log(img);
        }}
      >
        <Image source={{ uri: item.uri }} style={styles.image} />
      </TouchableOpacity>
    );
  };

  const renderListFooter = () => {
    if (img.length < 6)
      return (
        <TouchableOpacity style={styles.imageWrapper} onPress={pickImage}>
          <Entypo name='plus' size={scaleSize(30)} color={COLORS.primary} />
        </TouchableOpacity>
      );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Images</Text>
      <View style={styles.imageContainer}>
        <FlatList
          data={img}
          keyExtractor={(item) => item.image}
          renderItem={renderImage} //method to render the data in the way you want using styling u need
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={renderListFooter}
        />
      </View>
      <Text style={[styles.title, { marginTop: scaleSize(20) }]}>Name</Text>
      <TextInput
        placeholder={`Enter your pet\'s name`}
        onChangeText={() => {}}
        secureTextEntry={false}
        placeholderTextColor={COLORS.grayC2C2CE}
        style={[styles.input, { marginTop: scaleSize(5) }]}
      />

      <Text style={[styles.title, { marginTop: scaleSize(20) }]}>Age</Text>
      <View style={{ marginTop: scaleSize(5) }}>
        <View style={styles.unitWrapper}>
          <Text style={styles.unit}>Month</Text>
        </View>
        <TextInput
          placeholder={`Enter your pet\'s age`}
          onChangeText={() => {}}
          secureTextEntry={false}
          placeholderTextColor={COLORS.grayC2C2CE}
          style={[styles.input]}
          keyboardType='numeric'
        />
      </View>

      <Text style={[styles.title, { marginTop: scaleSize(20) }]}>Breed</Text>
      <TextInput
        placeholder={`Enter your pet\'s breed`}
        onChangeText={() => {}}
        secureTextEntry={false}
        placeholderTextColor={COLORS.grayC2C2CE}
        style={[styles.input, { marginTop: scaleSize(5) }]}
      />

      <Text style={[styles.title, { marginTop: scaleSize(20) }]}>Weight</Text>
      <View style={{ marginTop: scaleSize(5) }}>
        <View style={styles.unitWrapper}>
          <Text style={styles.unit}>Kg</Text>
        </View>
        <TextInput
          placeholder={`Enter your pet\'s weight`}
          onChangeText={() => {}}
          secureTextEntry={false}
          placeholderTextColor={COLORS.grayC2C2CE}
          style={[styles.input]}
          keyboardType='numeric'
        />
      </View>

      <Text style={[styles.title, { marginTop: scaleSize(20) }]}>Height</Text>
      <View style={{ marginTop: scaleSize(5) }}>
        <View style={styles.unitWrapper}>
          <Text style={styles.unit}>cm</Text>
        </View>
        <TextInput
          placeholder={`Enter your pet\'s weight`}
          onChangeText={() => {}}
          secureTextEntry={false}
          placeholderTextColor={COLORS.grayC2C2CE}
          style={[styles.input]}
          keyboardType='numeric'
        />
      </View>

      <View style={styles.selectionContainer}>
        <View>
          <Text style={styles.title}>Sex</Text>
          <View style={{ ...STYLES.horizontal, marginTop: scaleSize(5) }}>
            <View style={styles.optionWrapper}>
              <Text style={styles.optionText}>Male</Text>
            </View>
            <View style={styles.optionWrapper}>
              <Text style={styles.optionText}>Female</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.title}>Friendly</Text>
          <View style={{ ...STYLES.horizontal, marginTop: scaleSize(5) }}>
            <View style={styles.optionWrapper}>
              <Text style={styles.optionText}>Yes</Text>
            </View>
            <View style={styles.optionWrapper}>
              <Text style={styles.optionText}>No</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.title}>Vaccinated</Text>
          <View style={{ ...STYLES.horizontal, marginTop: scaleSize(5) }}>
            <View style={styles.optionWrapper}>
              <Text style={styles.optionText}>Yes</Text>
            </View>
            <View style={styles.optionWrapper}>
              <Text style={styles.optionText}>No</Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={[styles.title, { marginTop: scaleSize(20) }]}>Location</Text>
      <TouchableOpacity
        style={[
          styles.optionWrapper,
          {
            width: scaleSize(120),
            height: scaleSize(40),
            marginTop: scaleSize(5),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: scaleSize(10),
          },
        ]}
        onPress={onLocation}
      >
        <Text
          style={[styles.optionText, { ...FONTS.body1, color: COLORS.primary }]}
        >
          Select
        </Text>
      </TouchableOpacity>

      <Text style={[styles.title, { marginTop: scaleSize(20) }]}>Describe</Text>
      <TextInput
        placeholder={`Enter your pet\'s breed`}
        onChangeText={() => {}}
        secureTextEntry={false}
        placeholderTextColor={COLORS.grayC2C2CE}
        style={[
          styles.input,
          {
            marginTop: scaleSize(5),
            height: scaleSize(200),
          },
        ]}
        multiline={true}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Upload</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.background,
  },
  title: {
    ...FONTS.body1,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: scaleSize(30),
  },
  imageWrapper: {
    width: scaleSize(60),
    height: scaleSize(60),
    borderRadius: scaleSize(30),
    borderWidth: scaleSize(2),
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleSize(10),
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: scaleSize(10),
    alignItems: 'center',
    marginTop: scaleSize(10),
  },
  input: {
    ...STYLES.input,
  },
  unitWrapper: {
    position: 'absolute',
    right: 0,
    borderRadius: SIZES.radius,
    height: '100%',
    width: scaleSize(73),
    zIndex: 1000,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unit: {
    ...FONTS.body4,
    color: COLORS.whitePrimary,
  },
  selectionContainer: {
    ...STYLES.horizontal,
    marginTop: scaleSize(20),
  },
  optionWrapper: {
    paddingHorizontal: scaleSize(8),
    paddingVertical: scaleSize(3),
    backgroundColor: COLORS.tertiary,
    borderWidth: scaleSize(1),
    borderColor: COLORS.grayLight,
    borderRadius: scaleSize(5),
    marginRight: scaleSize(10),
  },
  optionText: {
    ...FONTS.body6,
    color: COLORS.primary,
  },
  button: {
    ...STYLES.button,
    marginTop: scaleSize(20),
    marginBottom: SIZES.bottomPadding,
  },
  buttonText: {
    ...STYLES.buttonText,
  },
});
