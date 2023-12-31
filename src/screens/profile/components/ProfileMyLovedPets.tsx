import { View, FlatList, StyleSheet, Text } from 'react-native';
import React from 'react';
import PetSearchCard from '../../home/components/search/PetSearchCard';
import { scaleSize } from '../../../utils/DeviceUtils';
import { SIZES, FONTS, COLORS } from '../../../config';
import {
  useGetFavoritePostsQuery,
  useRemoveFavoriteMutation,
} from '../../../store/favorite-post/favorite-post.api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useNavigation } from '@react-navigation/native';
import { SCREEN } from '../../../navigators/AppRoute';
import { RemoveFavoriteREQ } from '../../../store/favorite-post/request/remove-favorite.request';

const ProfileMyLovedPets = () => {
  const myPhoneNumber = useSelector(
    (state: RootState) => state.shared.user.phoneNumber
  );

  const { data: lovedPosts } = useGetFavoritePostsQuery(myPhoneNumber);
  const [removeFavorite] = useRemoveFavoriteMutation();

  const navigation = useNavigation();

  const data = [
    {
      image:
        'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
      name: 'Bobo',
      age: 4,
      type: 'Labrador Retriever',
      location: 'Thu Duc City, Vietnam',
      kilometer: 2.5,
    },
    {
      image:
        'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
      name: 'Bobo',
      age: 4,
      type: 'Labrador Retriever',
      location: 'Thu Duc City, Vietnam',
      kilometer: 2.5,
    },
    {
      image:
        'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
      name: 'Bobo',
      age: 4,
      type: 'Labrador Retriever',
      location: 'Thu Duc City, Vietnam',
      kilometer: 2.5,
    },
    {
      image:
        'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
      name: 'Bobo',
      age: 4,
      type: 'Labrador Retriever',
      location: 'Thu Duc City, Vietnam',
      kilometer: 2.5,
    },
  ];

  const onDetail = (item) => {
    const data = {
      userID: item.postAdoptModel.userID,
      postID: item.postAdoptModel.postID,
      images: item.images,
      petName: item.postAdoptModel.petName,
      sex: item.postAdoptModel.sex,
      age: item.postAdoptModel.age,
      breed: item.postAdoptModel.breed,
      district: item.postAdoptModel.district,
      province: item.postAdoptModel.province,
      isAdopt: item.postAdoptModel.isAdopt,
      species: item.postAdoptModel.species,
      weight: item.postAdoptModel.weight,
      isVaccinated: item.postAdoptModel.isVaccinated,
      description: item.postAdoptModel.description,
    };
    navigation.navigate(SCREEN.PET_DETAIL, { postData: data });
  };

  const onRemoveFavorite = async (postID) => {
    try {
      console.log(postID);
      const body: RemoveFavoriteREQ = {
        postID: postID,
        userID: myPhoneNumber,
      };

      await removeFavorite(body).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <PetSearchCard
        key={index}
        image={item?.images}
        name={item?.postAdoptModel?.petName}
        age={item?.postAdoptModel?.age}
        type={item?.postAdoptModel?.breed}
        district={item?.postAdoptModel?.district}
        province={item?.postAdoptModel?.province}
        gender={item?.postAdoptModel?.sex}
        isFav={true}
        onDetail={() => {
          onDetail(item);
        }}
        onRemoveFavorite={() => {
          onRemoveFavorite(item.postAdoptModel.postID);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={lovedPosts}
        keyExtractor={(item) => item.favID}
        renderItem={renderItem} //method to render the data in the way you want using styling u need
        horizontal={false}
        numColumns={1}
        style={{ marginTop: scaleSize(20) }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProfileMyLovedPets;

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
