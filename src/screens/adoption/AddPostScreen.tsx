import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React from 'react';
import { COLORS, IMAGES, SIZES, FONTS, STYLES } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import { Entypo } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AdoptionStackParamList } from '../../navigators/config';
import { SCREEN } from '../../navigators/AppRoute';

const AddPostScreen = ({
  navigation,
}: NativeStackScreenProps<AdoptionStackParamList, SCREEN.LOCATION>) => {
  const onLocation = () => {
    navigation.navigate(SCREEN.LOCATION);
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Images</Text>
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.imageWrapper}>
          <Image
            source={{
              uri: 'https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*',
            }}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageWrapper}>
          <Entypo name='plus' size={scaleSize(30)} color={COLORS.primary} />
        </TouchableOpacity>
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
    resizeMode: 'contain',
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
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: scaleSize(10),
    alignItems: 'center',
    marginTop: scaleSize(5),
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
