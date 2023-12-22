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
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
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
  useLazyGetBreedsQuery,
  useGetSpeciesQuery,
} from '../../store/pet-type/pet-type.api';
import { Controller, useForm } from 'react-hook-form';
import { AddPostType } from '../../types/add-post.type';
import { SEX } from '../../types/enum/sex.enum';
import { useAddPostMutation } from '../../store/post/post.api';
import { AddPostREQ } from '../../store/post/request/add-post.request';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Popup from '../../components/Popup';
import { POPUP_TYPE } from '../../types/enum/popup.enum';
import Button from '../../components/Button';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import VaccinatedModal from './components/VaccinatedModal';
import VaccinatedItem from './components/VaccinatedItem';

type ImageType = {
  uri: string;
};

const AddMyPetScreen = ({
  navigation,
}: NativeStackScreenProps<AdoptionStackParamList, SCREEN.LOCATION>) => {
  const { data: dataProvinces } = useGetProvincesQuery();
  const [getDistricts, { data: dataDistricts }] = useLazyGetDistrictQuery();
  const { data: dataSpecices } = useGetSpeciesQuery();
  const [getBreeds, { data: dataBreeds }] = useLazyGetBreedsQuery();
  const [publishPost, { isLoading }] = useAddPostMutation();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<AddPostType>({
    defaultValues: {
      sex: SEX.MALE,
      isAdopt: true,
      isVaccinated: false,
      description: '',
    },
  });

  const vaccinatedHistory = [
    {
      date: '28/12/2023',
      note: 'Tiêm ngừa dại lần 1',
    },
    {
      date: '28/12/2023',
      note: 'Tiêm ngừa dại lần 1',
    },
  ];

  const nextVaccination = [
    {
      date: '28/12/2023',
      note: 'Tiêm ngừa dại lần 1',
    },
    {
      date: '28/12/2023',
      note: 'Tiêm ngừa dại lần 1',
    },
  ];

  const [img, setImg] = useState([]);
  const [url, setUrl] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [species, setSpecies] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [isSuccessPopup, setIsSuccessPopup] = useState<boolean>(false);
  const [isModalShown, setIsModalShown] = useState(false);

  const uriImage = watch('images');

  const myPhoneNumber = useSelector(
    (state: RootState) => state.shared.user.phoneNumber
  );

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

    if (!result.canceled) {
      // const image = result.assets[0].base64;
      const image = result.assets[0].uri;
      const isMatch = img.some((item) => item === result.assets[0].uri);
      if (isMatch) {
        return;
      }
      setImg([...img, image]);
      setValue('images', [...uriImage, image]);
    }
  };

  const renderImage = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity
          style={{ position: 'absolute', right: scaleSize(10), zIndex: 1000 }}
          onPress={() => {
            const newData = [...img];
            newData.splice(index, 1);
            setImg(newData);
            setValue('images', newData);
          }}
        >
          <AntDesign
            name='closecircle'
            size={scaleSize(15)}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item }} style={styles.image} />
        </View>
      </View>
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

  const uploadToFirebaseStorage = async (uri: string) => {
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();

    const name = uri.split('/').pop();

    const imageRef = ref(getStorage(), `images/${name}`);

    const uploadTask = uploadBytesResumable(imageRef, theBlob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('progress', progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
          reject(error);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            downloadUrl,
            metadata: uploadTask.snapshot.metadata,
          });
        }
      );
    });
  };

  const handleUpload = async (data) => {
    const urlArray = [];
    for (let i = 0; i < img.length; i++) {
      const res = await uploadToFirebaseStorage(img[i]);
      urlArray.push(res.downloadUrl);
    }

    try {
      const body: AddPostREQ = {
        postModel: {
          petName: data.name,
          sex: data.sex,
          age: data.age,
          species: data.specie.label,
          breed: data.breed.label,
          weight: data.weight,
          district: data.district.label,
          province: data.province.label,
          isVaccinated: data.isVaccinated,
          isAdopt: data.isAdopt,
          userID: myPhoneNumber,
          description: data.description,
        },
        // images: data.images.map((image) => ({ image })),
        images: Array.isArray(urlArray)
          ? urlArray.map((image) => ({ image }))
          : [],
      };
      await publishPost(body).unwrap();

      setIsSuccessPopup(true);
      setBreeds([]);
      reset();
      setDistricts([]);
      setImg([]);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItemHistory = ({ item }) => {
    return <VaccinatedItem date={item.date} note={item.note} />;
  };

  const validateImageExistence = () => {
    if (img.length <= 0) {
      return false;
    } else return true;
  };

  const onCloseModal = () => {
    setIsModalShown(false);
  };

  const onOpenModal = () => {
    setIsModalShown(true);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <VaccinatedModal open={isModalShown} onClose={onCloseModal} />
      <Popup
        title='Published your post'
        content='Everyone can see your pet now'
        onCancel={() => {
          setIsSuccessPopup(false);
        }}
        type={POPUP_TYPE.SUCCESS}
        open={isSuccessPopup}
      />
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
              keyboardType='number-pad'
            />
          </View>
        )}
        rules={{
          required: 'Age is required',
          pattern: {
            value: /^[0-9]*(\.[0-9]*)?$/,
            message: 'Only numeric values are allowed',
          },
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
            onChange={(value) => {
              onChange(value);
              getBreeds(value.value);
            }}
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
              // keyboardType='numbers-and-punctuation'
              keyboardType='numeric'
            />
          </View>
        )}
        rules={{
          required: 'Weight is required',
          pattern: {
            value: /^[0-9]+(?:,[0-9]+)?$/,
            message:
              'Only numeric values with a comma as decimal separator are allowed',
          },
        }}
      />
      {errors.weight && (
        <Text style={styles.errorText}>{errors.weight.message}</Text>
      )}

      <View style={styles.selectionContainer}>
        <View>
          <Text style={styles.title}>Sex</Text>
          <View style={{ marginTop: scaleSize(5), flexDirection: 'row' }}>
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
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: scaleSize(20),
        }}
      >
        <Text style={styles.title}>Vaccinated</Text>
        <TouchableOpacity
          style={{ marginLeft: scaleSize(5) }}
          onPress={onOpenModal}
        >
          <Ionicons
            name='add-circle'
            size={scaleSize(24)}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.vaccinatedWrapper}>
        <Text style={styles.vaccinatedTitle}>Hisotry</Text>
        <FlatList
          data={vaccinatedHistory}
          keyExtractor={(item) => item.title}
          renderItem={renderItemHistory} //method to render the data in the way you want using styling u need
          horizontal={false}
          numColumns={1}
          showsVerticalScrollIndicator={false}
        />
        <Text style={styles.vaccinatedTitle}>Next Vaccination</Text>
        <FlatList
          data={nextVaccination}
          keyExtractor={(item) => item.title}
          renderItem={renderItemHistory} //method to render the data in the way you want using styling u need
          horizontal={false}
          numColumns={1}
          showsVerticalScrollIndicator={false}
        />
      </View>

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

      <Button
        onPress={handleSubmit(handleUpload.bind(null))}
        title='Publish'
        style={{ marginTop: scaleSize(19), marginBottom: SIZES.bottomPadding }}
        isLoading={isLoading}
      />
    </ScrollView>
  );
};

export default AddMyPetScreen;

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
    paddingHorizontal: scaleSize(15),
    paddingVertical: scaleSize(10),
    backgroundColor: COLORS.tertiary,
    borderWidth: scaleSize(1),
    borderColor: COLORS.grayLight,
    borderRadius: scaleSize(5),
    marginRight: scaleSize(10),
    marginTop: scaleSize(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    ...FONTS.body4,
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
  vaccinatedWrapper: {
    width: '100%',
    minHeight: scaleSize(150),
    borderRadius: scaleSize(10),
    backgroundColor: COLORS.tertiary,
    borderWidth: scaleSize(1),
    borderColor: COLORS.grayLight,
    padding: scaleSize(20),
    marginTop: scaleSize(10),
  },
  vaccinatedTitle: {
    ...FONTS.body3,
    color: COLORS.primary,
    marginBottom: scaleSize(5),
  },
});
