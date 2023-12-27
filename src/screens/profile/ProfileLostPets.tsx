import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
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

const ProfileLostPets = () => {
  const { data: allPosts } = useGetPostsQuery();
  const navigation = useNavigation();

  const myPhoneNumber = useSelector(
    (state: RootState) => state.shared.user.phoneNumber
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

  return (
    <View style={{ paddingHorizontal: SIZES.padding }}>
      {myPosts && (
        <>
          <View style={styles.container}>
            <Text style={styles.title}>My posts</Text>
          </View>

          <FlatList
            data={myLostList}
            keyExtractor={(item) => item.image}
            renderItem={renderItemLost} //method to render the data in the way you want using styling u need
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: scaleSize(20) }}
          />
        </>
      )}

      <View style={styles.container}>
        <Text style={styles.title}>Lost Pets Near me</Text>
      </View>

      {/* <FlatList
        data={adoptedList}
        keyExtractor={(item) => item.image}
        renderItem={renderItemLost} //method to render the data in the way you want using styling u need
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: scaleSize(20) }}
      /> */}
    </View>
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
