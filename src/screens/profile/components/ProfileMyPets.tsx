import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { FC } from 'react';
import PetSearchCard from '../../home/components/search/PetSearchCard';
import { scaleSize } from '../../../utils/DeviceUtils';
import { SIZES, FONTS, COLORS } from '../../../config';
import { Foundation } from '@expo/vector-icons';
import { SCREEN } from '../../../navigators/AppRoute';
import { useGetMyPetsQuery } from '../../../store/my-pet/my-pet.api';

type ProfileMyPetProps = {
  navigation: any;
};

const ProfileMyPets: FC<ProfileMyPetProps> = ({ navigation }) => {
  const { data: myPets } = useGetMyPetsQuery();

  const renderItem = ({ item }) => {
    return (
      <PetSearchCard
        image={item.images}
        name={item.petInfoModel.petName}
        age={item.petInfoModel.age}
        gender={item.petInfoModel.sex}
        type={item.petInfoModel.breed}
        myPet={true}
        onDetail={() => {
          navigation.navigate(SCREEN.MY_PET_DETAIL, { myPetInfo: item });
        }}
      />
    );
  };

  const onAddMyPet = () => {
    navigation.navigate(SCREEN.ADD_MY_PET);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={myPets}
        keyExtractor={(item) => item.title}
        renderItem={renderItem} //method to render the data in the way you want using styling u need
        horizontal={false}
        numColumns={1}
        style={{ marginTop: scaleSize(20) }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <TouchableOpacity style={styles.addButton} onPress={onAddMyPet}>
            <Foundation
              name='plus'
              size={scaleSize(24)}
              color={COLORS.primary}
            />
            <Text style={styles.addText}>My pet</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

export default ProfileMyPets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scaleSize(10),
    marginVertical: scaleSize(20),
    borderWidth: scaleSize(1),
    padding: scaleSize(10),
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    borderRadius: scaleSize(10),
  },
  addText: {
    ...FONTS.body1,
    color: COLORS.primary,
  },
});
