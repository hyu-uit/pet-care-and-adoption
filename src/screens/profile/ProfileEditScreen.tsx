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

type EditInfoREQ = {
  avatar: string;
  name: string;
  province: string;
  district: string;
};

const ProfileEditScreen = () => {
  const { data: dataProvinces } = useGetProvincesQuery();
  const [getDistricts, { data: dataDistricts }] = useLazyGetDistrictQuery();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditInfoREQ>();

  // const provinces = dataProvinces.map((item) => ({
  //   label: item.name,
  //   value: item.code,
  // }));
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

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

  const [img, setImg] = useState();

  const pickImage = async () => {
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
      console.log(image);
      setImg(image.uri);
    }
  };

  const onSelectProvince = (value) => {
    getDistricts(value.value);
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
            onPress={pickImage}
          >
            <Image
              source={{
                uri: img
                  ? img
                  : 'https://images.ctfassets.net/ub3bwfd53mwy/6atCoddzStFzz0RcaztYCh/1c3e8a37eebe3c6a435038f8d9eef7f3/3_Image.jpg?w=750',
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
          value='0848867679'
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
            onChange={onSelectProvince}
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
            onChange={() => {}}
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
        onPress={() => {}}
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
