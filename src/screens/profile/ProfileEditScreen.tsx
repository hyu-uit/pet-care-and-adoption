import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES, STYLES, FONTS, IMAGES } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import { MaterialIcons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import Button from '../../components/Button';
import * as ImagePicker from 'expo-image-picker';
import {
  useGetProvincesQuery,
  useLazyGetDistrictQuery,
} from '../../store/province/province.api';
import { Controller, useForm } from 'react-hook-form';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { EditInformationREQ } from '../../store/users/request/edit-info.request';
import { ButtonVariant } from '../../enums/ButtonVariant.enum';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {
  useEditInformationMutation,
  useGetUserInformationQuery,
} from '../../store/users/users.api';

type EditInfoREQ = {
  avatar: string;
  name: string;
  province: string;
  district: string;
};

const ProfileEditScreen = () => {
  const userData = useSelector((state: RootState) => state.shared.user);
  const [updateInfo, { isLoading }] = useEditInformationMutation();

  const { data: user } = useGetUserInformationQuery(userData.phoneNumber);

  const { data: dataProvinces } = useGetProvincesQuery();
  const [getDistricts, { data: dataDistricts }] = useLazyGetDistrictQuery();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [key, setKey] = useState(0);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EditInformationREQ>({
    defaultValues: {
      name: userData.name,
      avatar: userData.avatar,
    },
  });

  const pro = watch('province');
  const dis = watch('district');
  const name = watch('name');

  const isChanged =
    pro !== userData.province ||
    dis !== userData.district.province ||
    name !== userData.name;

  // const provinces = dataProvinces.map((item) => ({
  //   label: item.name,
  //   value: item.code,
  // }));

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
    const fetchAddess = async () => {
      // if (key === 0) {
      // if (user.province) {
      //   const provinceOrder = provinces.find(
      //     (item) => item.label === user.province
      //   )?.value;
      //   setValue('province', provinceOrder);
      //   if (user.district) {
      //     await getDistricts(provinceOrder);
      //     setValue(
      //       'district',
      //       districts.find((item) => item.label === user.district)?.value
      //     );
      //   }
      //   setKey((pre) => pre + 1);
      // }
      if (userData.province) {
        const provinceOrder = dataProvinces.find(
          (item) => item.name === userData.province
        )?.code;
        setValue('province', provinceOrder);
        if (userData.district) {
          try {
            const districtList = await getDistricts(provinceOrder).unwrap();
            console.log(districtList.districts[0].name);
            setValue(
              'district',
              districtList?.districts?.find(
                (item) => item.name === userData.district
              )?.code
            );
          } catch (error) {
            console.log(error);
          }
        }
      }
    };
    // };

    fetchAddess();
  }, [dataProvinces]);

  const [img, setImg] = useState();

  const pickImage = async (onChange) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const image = {
        uri: result.assets[0].uri,
        base64: result.assets[0].base64,
      };
      setImg(image.uri);
      onChange(image.uri);
    }
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

  const onSelectProvince = (value, onChange) => {
    getDistricts(value.value);
    console.log(value.label);
    onChange(value.value);
  };

  const onUpdateInfo = async (data) => {
    try {
      const provinceSelected = provinces.find(
        (item) => item.value === data.province
      ).label;
      const districtSelected = districts.find(
        (item) => item.value === data.district
      ).label;

      let res;
      if (data.avatar !== userData.avatar) {
        res = (await uploadToFirebaseStorage(data.avatar)) as string;
      }
      console.log(res.downloadUrl);

      await updateInfo({
        userID: userData.phoneNumber,
        name: data.name,
        district: districtSelected,
        province: provinceSelected,
        avatar: res.downloadUrl,
        password: 'fake',
      }).unwrap;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name='avatar'
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginTop: scaleSize(20),
              alignItems: 'flex-end',
            }}
            onPress={() => {
              pickImage(onChange);
            }}
          >
            <Image
              source={{
                // uri: img
                //   ? img
                //   : 'https://images.ctfassets.net/ub3bwfd53mwy/6atCoddzStFzz0RcaztYCh/1c3e8a37eebe3c6a435038f8d9eef7f3/3_Image.jpg?w=750',
                uri: userData.avatar
                  ? userData.avatar
                  : img
                  ? img
                  : 'https://images.unsplash.com/photo-1615751072497-5f5169febe17?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D',
              }}
              style={styles.image}
            />
            <MaterialIcons
              name='mode-edit'
              size={scaleSize(20)}
              color={COLORS.primary}
              style={{ marginRight: scaleSize(10), left: -scaleSize(10) }}
            />
          </TouchableOpacity>
        )}
      />
      {errors.avatar && (
        <Text style={styles.errorText}>{errors.avatar.message}</Text>
      )}

      <Text style={styles.label}>Name</Text>

      <Controller
        control={control}
        name='name'
        render={({
          field: { value, onBlur, onChange },
          fieldState: { error },
        }) => (
          <View style={styles.inputWrapper}>
            <Image
              source={require('../../assets/icons/name.png')}
              height={10}
              width={10}
              style={styles.icon}
            />
            <TextInput
              placeholder={'Enter your name'}
              onChangeText={onChange}
              value={value}
              secureTextEntry={false}
              placeholderTextColor={COLORS.grayC2C2CE}
              style={styles.input}
            />
          </View>
        )}
        rules={{
          required: 'Name is required',
          pattern: {
            value: /^[a-zA-Z\s]+$/,
            message: 'Name must not contain numbers or special characters',
          },
        }}
      />
      {errors.name && (
        <Text style={styles.errorText}>{errors.name.message}</Text>
      )}

      <Text style={styles.label}>Phone</Text>

      <View style={styles.inputWrapper}>
        <Image
          source={require('../../assets/icons/phone.png')}
          height={10}
          width={10}
          style={styles.icon}
        />
        <TextInput
          placeholder={'Enter your name'}
          // onChangeText={onChange}
          // value={value}
          value={userData.phoneNumber}
          secureTextEntry={false}
          placeholderTextColor={COLORS.grayC2C2CE}
          style={[styles.input, { color: COLORS.grayPrimary }]}
          editable={false}
        />
      </View>

      <Text style={styles.label}>Address</Text>

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
            value={value}
            style={[
              styles.input,
              { paddingLeft: scaleSize(20), marginTop: scaleSize(10) },
            ]}
            onChange={(value) => {
              onSelectProvince(value, onChange);
            }}
            containerStyle={{
              height: scaleSize(200),
              borderRadius: scaleSize(10),
            }}
          />
        )}
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
            value={value}
            style={[
              styles.input,
              { paddingLeft: scaleSize(20), marginTop: scaleSize(10) },
            ]}
            onChange={(value) => {
              onChange(value.value);
            }}
            containerStyle={{
              height: scaleSize(200),
              borderRadius: scaleSize(10),
            }}
          />
        )}
      />
      {errors.district && (
        <Text style={styles.errorText}>{errors.district.message}</Text>
      )}

      <Button
        title='Update'
        variant={isChanged ? ButtonVariant.ACTIVE : ButtonVariant.DISABLE}
        onPress={handleSubmit(onUpdateInfo.bind(null))}
        isLoading={false}
        style={{ marginTop: scaleSize(50) }}
      />
    </View>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
  },
  image: {
    width: scaleSize(103),
    height: scaleSize(103),
    borderRadius: scaleSize(52),
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleSize(10),
  },
  icon: {
    ...STYLES.icon,
    position: 'absolute',
    zIndex: 100,
    left: scaleSize(24),
  },
  input: {
    ...STYLES.input,
    paddingLeft: scaleSize(58),
  },
  label: {
    ...FONTS.body3,
    fontFamily: 'CercoDEMO-Bold',
    textAlign: 'left',
    width: '100%',
    fontWeight: '700',
    marginTop: scaleSize(20),
    color: COLORS.primary,
  },
  errorText: {
    ...FONTS.body5,
    color: COLORS.redPrimary,
    fontSize: scaleSize(12),
    marginTop: scaleSize(3),
  },
});
