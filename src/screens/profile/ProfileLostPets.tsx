import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { scaleSize } from '../../utils/DeviceUtils';
import { COLORS, FONTS, SIZES } from '../../config';
import AdoptedPetCard from '../home/components/home/AdoptedPetCard';
import {
  useGetAllPostsWithUserQuery,
  useGetPostsQuery,
} from '../../store/post/post.api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getAllPostsWithUserRESP } from '../../store/post/response/get-all-posts.response';
import MyPostCard from './components/MyPostCard';
import { useNavigation } from '@react-navigation/native';
import { SCREEN } from '../../navigators/AppRoute';
import SkeletonHome from '../../components/SkeletonHome';

const ProfileLostPets = () => {
  const { data: allPosts, isFetching } = useGetPostsQuery();
  const navigation = useNavigation();

  const myPhoneNumber = useSelector(
    (state: RootState) => state.shared.user.phoneNumber
  );

  const myProvince = useSelector(
    (state: RootState) => state.shared.user.province
  );
  const myDistrict = useSelector(
    (state: RootState) => state.shared.user.district
  );

  const { data: myPosts } = useGetPostsQuery();

  const myLostList = useMemo(() => {
    if (!allPosts) {
      return [];
    }

    return allPosts.filter(
      (item) => item.postAdoptModel.userID === myPhoneNumber
    );
  }, [allPosts, myPhoneNumber]);

  const nearbyList = useMemo(() => {
    if (!allPosts) {
      return [];
    }

    return allPosts
      .filter(
        (item) =>
          (item.postAdoptModel.province === myProvince ||
            item.postAdoptModel.district === myDistrict) &&
          !item.postAdoptModel.isAdopt &&
          item.postAdoptModel.userID !== myPhoneNumber
      )
      .map((post) => ({
        images: post.images,
        postID: post.postAdoptModel.postID,
        petName: post.postAdoptModel.petName,
        age: post.postAdoptModel.age,
        sex: post.postAdoptModel.sex,
        species: post.postAdoptModel.species,
        breed: post.postAdoptModel.breed,
        weight: post.postAdoptModel.weight,
        district: post.postAdoptModel.district,
        province: post.postAdoptModel.province,
        description: post.postAdoptModel.description,
        isVaccinated: post.postAdoptModel.isVaccinated,
        isAdopt: post.postAdoptModel.isAdopt,
        isDone: post.postAdoptModel.isDone,
        userID: post.postAdoptModel.userID,
      }));
  }, [allPosts, myProvince, myDistrict]);

  const onDetail = (item) => {
    navigation.navigate(SCREEN.UPDATE_MY_POST, { postDetail: item });
  };

  const renderItemLost = ({ item }) => {
    return (
      <MyPostCard
        image={item.images}
        name={item.postAdoptModel.petName}
        gender={item.postAdoptModel.sex}
        isAdopt={item.postAdoptModel.isAdopt}
        onDetail={() => {
          onDetail(item);
        }}
      />
    );
  };

  const renderItemNearby = ({ item }) => {
    return (
      <MyPostCard
        image={item.images}
        name={item.petName}
        gender={item.sex}
        isAdopt={item.isAdopt}
        onDetail={() => {
          navigation.navigate(SCREEN.PET_DETAIL, { postData: item });
        }}
      />
    );
  };

  return (
    <ScrollView
      style={{ paddingHorizontal: SIZES.padding }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.container, { marginBottom: scaleSize(5) }]}>
        <Text style={styles.title}>My posts</Text>
      </View>
      {isFetching ? (
        <FlatList
          data={[1, 2, 3, 4]}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          renderItem={() => <SkeletonHome />} //method to render the data in the way you want using styling u need
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: scaleSize(20) }}
        />
      ) : (
        <></>
      )}
      {myPosts && (
        <FlatList
          data={myLostList}
          keyExtractor={(item) => item.image}
          renderItem={renderItemLost} //method to render the data in the way you want using styling u need
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: scaleSize(20) }}
        />
      )}

      <View style={styles.container}>
        <Text style={styles.title}>Lost Pets Near me</Text>
      </View>

      {isFetching ? (
        <FlatList
          data={[1, 2, 3, 4]}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          renderItem={() => <SkeletonHome />} //method to render the data in the way you want using styling u need
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: scaleSize(20) }}
        />
      ) : (
        <FlatList
          data={nearbyList}
          keyExtractor={(item) => item.image}
          renderItem={renderItemNearby} //method to render the data in the way you want using styling u need
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: scaleSize(20) }}
        />
      )}

      <View style={{ paddingBottom: SIZES.bottomPadding }}></View>
    </ScrollView>
  );
};

export default ProfileLostPets;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scaleSize(40),
    borderRadius: scaleSize(15),
    backgroundColor: COLORS.whitePrimary,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaleSize(15),
    alignItems: 'center',
    marginTop: scaleSize(20),
  },
  title: {
    ...FONTS.body2,
    fontWeight: 'bold',
    color: COLORS.blackPrimary,
  },
});
