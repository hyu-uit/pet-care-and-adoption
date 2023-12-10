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
import React, { useEffect, useState } from 'react';
import { COLORS, IMAGES, SIZES, FONTS, STYLES } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import { Entypo } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AdoptionStackParamList } from '../../navigators/config';
import { SCREEN } from '../../navigators/AppRoute';
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import {
  useGetProvincesQuery,
  useLazyGetDistrictQuery,
} from '../../store/province/province.api';
import {
  useGetBreedsQuery,
  useGetSpeciesQuery,
} from '../../store/pet-type/pet-type.api';
import { Controller, useForm } from 'react-hook-form';
import { AddPostType } from '../../types/add-post.type';
import { SEX } from '../../types/enum/sex.enum';

type ImageType = {
  uri: string;
};

const AddPostScreen = ({
  navigation,
}: NativeStackScreenProps<AdoptionStackParamList, SCREEN.LOCATION>) => {
  const { data: dataProvinces } = useGetProvincesQuery();
  const [getDistricts, { data: dataDistricts }] = useLazyGetDistrictQuery();
  const { data: dataSpecices } = useGetSpeciesQuery();
  const { data: dataBreeds } = useGetBreedsQuery();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddPostType>({
    defaultValues: {
      sex: SEX.MALE,
      isAdopt: true,
      isVaccinated: false,
    },
  });

  const [img, setImg] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [species, setSpecies] = useState([]);
  const [breeds, setBreeds] = useState([]);

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
    if (!dataSpecices) return;
    const speciesUpdate = dataSpecices.map((item) => ({
      label: item.speciesName,
      value: item.speciesID,
    }));
    setSpecies(speciesUpdate);
  }, [dataSpecices]);

  useEffect(() => {
    if (!dataBreeds) return;
    const breedsUpdate = dataBreeds.map((item) => ({
      label: item.breedName,
      value: item.breedID,
    }));
    setBreeds(breedsUpdate);
  }, [dataBreeds]);

  const onSelectProvince = (value) => {
    getDistricts(value.value);
  };

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
      setValue('images', [...img, image]);
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

  const handleUpload = () => {};

  const validateImageExistence = () => {
    if (img.length <= 0) {
      return false;
    } else return true;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Images</Text>
      <Controller
        control={control}
        name='images'
        defaultValue={img}
        render={({
          field: { value, onBlur, onChange },
          fieldState: { error },
        }) => (
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
        )}
        rules={{
          required: 'Image is required',
          validate: validateImageExistence,
        }}
      />
      {errors.images && (
        <Text style={styles.errorText}>{errors.images.message}</Text>
      )}
      <Text style={[styles.title, { marginTop: scaleSize(20) }]}>Name</Text>
      <Controller
        control={control}
        name='name'
        render={({
          field: { value, onBlur, onChange },
          fieldState: { error },
        }) => (
          <TextInput
            placeholder={`Enter your pet\'s name`}
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            placeholderTextColor={COLORS.grayC2C2CE}
            style={[styles.input, { marginTop: scaleSize(5) }]}
          />
        )}
        rules={{
          required: 'Name is required',
          maxLength: {
            value: 30,
            message: 'Please enter name less than 30 characters',
          },
        }}
      />
      {errors.name && (
        <Text style={styles.errorText}>{errors.name.message}</Text>
      )}

      <Text style={[styles.title, { marginTop: scaleSize(20) }]}>Age</Text>
      <Controller
        control={control}
        name='age'
        render={({
          field: { value, onBlur, onChange },
          fieldState: { error },
        }) => (
          <View style={{ marginTop: scaleSize(5) }}>
            <View style={styles.unitWrapper}>
              <Text style={styles.unit}>Month</Text>
            </View>
            <TextInput
              placeholder={`Enter your pet\'s age`}
              onChangeText={onChange}
              value={value}
              secureTextEntry={false}
              placeholderTextColor={COLORS.grayC2C2CE}
              style={[styles.input]}
              keyboardType='numeric'
            />
          </View>
        )}
        rules={{
          required: 'Age is required',
        }}
      />
      {errors.age && <Text style={styles.errorText}>{errors.age.message}</Text>}

      <Text style={[styles.title, { marginTop: scaleSize(20) }]}>Specie</Text>
      <Controller
        control={control}
        name='specie'
        render={({
          field: { value, onBlur, onChange },
          fieldState: { error },
        }) => (
          <Dropdown
            data={species}
            labelField={'label'}
            valueField={'value'}
            placeholder='Select specie'
            value={value}
            placeholderStyle={{ color: COLORS.grayPrimary }}
            style={[
              styles.input,
              { paddingLeft: scaleSize(20), marginTop: scaleSize(10) },
            ]}
            onChange={onChange}
            containerStyle={{
              minHeight: scaleSize(100),
              borderRadius: scaleSize(10),
            }}
          />
        )}
        rules={{
          required: 'Specie is required',
        }}
      />
      {errors.specie && (
        <Text style={styles.errorText}>{errors.specie.message}</Text>
      )}

      <Text style={[styles.title, { marginTop: scaleSize(20) }]}>Breed</Text>
      <Controller
        control={control}
        name='breed'
        render={({
          field: { value, onBlur, onChange },
          fieldState: { error },
        }) => (
          <Dropdown
            data={breeds}
            labelField={'label'}
            valueField={'value'}
            placeholder='Select breed'
            placeholderStyle={{ color: COLORS.grayPrimary }}
            style={[
              styles.input,
              { paddingLeft: scaleSize(20), marginTop: scaleSize(10) },
            ]}
            onChange={onChange}
            containerStyle={{
              minHeight: scaleSize(100),
              borderRadius: scaleSize(10),
            }}
          />
        )}
        rules={{
          required: 'Breed is required',
        }}
      />
      {errors.breed && (
        <Text style={styles.errorText}>{errors.breed.message}</Text>
      )}

      <Text style={[styles.title, { marginTop: scaleSize(20) }]}>Weight</Text>
      <Controller
        control={control}
        name='weight'
        render={({
          field: { value, onBlur, onChange },
          fieldState: { error },
        }) => (
          <View style={{ marginTop: scaleSize(5) }}>
            <View style={styles.unitWrapper}>
              <Text style={styles.unit}>Kg</Text>
            </View>
            <TextInput
              placeholder={`Enter your pet\'s weight`}
              onChangeText={onChange}
              value={value}
              secureTextEntry={false}
              placeholderTextColor={COLORS.grayC2C2CE}
              style={[styles.input]}
              keyboardType='numeric'
            />
          </View>
        )}
        rules={{
          required: 'Weight is required',
        }}
      />
      {errors.weight && (
        <Text style={styles.errorText}>{errors.weight.message}</Text>
      )}

      <View style={styles.selectionContainer}>
        <View>
          <Text style={styles.title}>Sex</Text>
          <View style={{ ...STYLES.horizontal, marginTop: scaleSize(5) }}>
            <Controller
              control={control}
              name='sex'
              render={({
                field: { value, onBlur, onChange },
                fieldState: { error },
              }) => (
                <TouchableOpacity
                  style={[
                    styles.optionWrapper,
                    {
                      backgroundColor:
                        value === SEX.MALE ? COLORS.primary : COLORS.tertiary,
                    },
                  ]}
                  onPress={() => {
                    onChange(SEX.MALE);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color:
                          value === SEX.MALE
                            ? COLORS.whitePrimary
                            : COLORS.primary,
                      },
                    ]}
                  >
                    Male
                  </Text>
                </TouchableOpacity>
              )}
              rules={{
                required: 'Sex is required',
              }}
            />
            {errors.sex && (
              <Text style={styles.errorText}>{errors.sex.message}</Text>
            )}

            <Controller
              control={control}
              name='sex'
              render={({
                field: { value, onBlur, onChange },
                fieldState: { error },
              }) => (
                <TouchableOpacity
                  style={[
                    styles.optionWrapper,
                    {
                      backgroundColor:
                        value === SEX.FEMALE ? COLORS.primary : COLORS.tertiary,
                    },
                  ]}
                  onPress={() => {
                    onChange(SEX.FEMALE);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color:
                          value === SEX.FEMALE
                            ? COLORS.whitePrimary
                            : COLORS.primary,
                      },
                    ]}
                  >
                    Female
                  </Text>
                </TouchableOpacity>
              )}
              rules={{
                required: 'Sex is required',
              }}
            />
            {errors.sex && (
              <Text style={styles.errorText}>{errors.sex.message}</Text>
            )}
          </View>
        </View>

        <View>
          <Text style={styles.title}>Option</Text>
          <View style={{ ...STYLES.horizontal, marginTop: scaleSize(5) }}>
            <Controller
              control={control}
              name='isAdopt'
              render={({
                field: { value, onBlur, onChange },
                fieldState: { error },
              }) => (
                <TouchableOpacity
                  style={[
                    styles.optionWrapper,
                    {
                      backgroundColor:
                        value === true ? COLORS.primary : COLORS.tertiary,
                    },
                  ]}
                  onPress={() => {
                    onChange(true);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color:
                          value === true ? COLORS.whitePrimary : COLORS.primary,
                      },
                    ]}
                  >
                    Adopt
                  </Text>
                </TouchableOpacity>
              )}
            />

            <Controller
              control={control}
              name='isAdopt'
              render={({
                field: { value, onBlur, onChange },
                fieldState: { error },
              }) => (
                <TouchableOpacity
                  style={[
                    styles.optionWrapper,
                    {
                      backgroundColor:
                        value === false ? COLORS.primary : COLORS.tertiary,
                    },
                  ]}
                  onPress={() => {
                    onChange(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color:
                          value === false
                            ? COLORS.whitePrimary
                            : COLORS.primary,
                      },
                    ]}
                  >
                    Lost
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <View>
          <Text style={styles.title}>Vaccinated</Text>
          <View style={{ ...STYLES.horizontal, marginTop: scaleSize(5) }}>
            <Controller
              control={control}
              name='isVaccinated'
              render={({
                field: { value, onBlur, onChange },
                fieldState: { error },
              }) => (
                <TouchableOpacity
                  style={[
                    styles.optionWrapper,
                    {
                      backgroundColor:
                        value === true ? COLORS.primary : COLORS.tertiary,
                    },
                  ]}
                  onPress={() => {
                    onChange(true);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color:
                          value === true ? COLORS.whitePrimary : COLORS.primary,
                      },
                    ]}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
              )}
            />

            <Controller
              control={control}
              name='isVaccinated'
              render={({
                field: { value, onBlur, onChange },
                fieldState: { error },
              }) => (
                <TouchableOpacity
                  style={[
                    styles.optionWrapper,
                    {
                      backgroundColor:
                        value === false ? COLORS.primary : COLORS.tertiary,
                    },
                  ]}
                  onPress={() => {
                    onChange(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color:
                          value === false
                            ? COLORS.whitePrimary
                            : COLORS.primary,
                      },
                    ]}
                  >
                    No
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>

      <Text style={[styles.title, { marginTop: scaleSize(20) }]}>Location</Text>

      <Controller
        control={control}
        name='province'
        render={({
          field: { value, onBlur, onChange },
          fieldState: { error },
        }) => (
          <Dropdown
            data={provinces}
            labelField={'label'}
            valueField={'value'}
            placeholder='Select province'
            placeholderStyle={{ color: COLORS.grayPrimary }}
            style={[
              styles.input,
              { paddingLeft: scaleSize(20), marginTop: scaleSize(10) },
            ]}
            value={value}
            onChange={(value) => {
              onChange(value);
              onSelectProvince(value);
            }}
            containerStyle={{
              height: scaleSize(200),
              borderRadius: scaleSize(10),
            }}
          />
        )}
        rules={{
          required: 'Province is required',
        }}
      />
      {errors.province && (
        <Text style={styles.errorText}>{errors.province.message}</Text>
      )}

      <Controller
        control={control}
        name='district'
        render={({
          field: { value, onBlur, onChange },
          fieldState: { error },
        }) => (
          <Dropdown
            data={districts}
            labelField={'label'}
            valueField={'value'}
            placeholder='Select district'
            placeholderStyle={{ color: COLORS.grayPrimary }}
            style={[
              styles.input,
              { paddingLeft: scaleSize(20), marginTop: scaleSize(10) },
            ]}
            onChange={onChange}
            containerStyle={{
              height: scaleSize(200),
              borderRadius: scaleSize(10),
            }}
          />
        )}
        rules={{
          required: 'District is required',
        }}
      />
      {errors.district && (
        <Text style={styles.errorText}>{errors.district.message}</Text>
      )}

      <Text style={[styles.title, { marginTop: scaleSize(20) }]}>Describe</Text>
      <Controller
        control={control}
        name='description'
        render={({
          field: { value, onBlur, onChange },
          fieldState: { error },
        }) => (
          <TextInput
            placeholder={`Description about this pet`}
            onChangeText={onChange}
            value={value}
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
        )}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(handleUpload.bind(null))}
      >
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
  errorText: {
    ...FONTS.body5,
    color: COLORS.redPrimary,
    fontSize: scaleSize(12),
    marginTop: scaleSize(3),
  },
});
