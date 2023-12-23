import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useMemo } from 'react';
import { scaleSize } from '../../utils/DeviceUtils';
import { COLORS, FONTS, SIZES } from '../../config';
import AdoptedPetCard from '../home/components/home/AdoptedPetCard';
import { useGetPostsQuery } from '../../store/post/post.api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const ProfileLostPets = () => {
  const { data: allPosts } = useGetPostsQuery();
  const myPhoneNumber = useSelector(
    (state: RootState) => state.shared.user.phoneNumber
  );

  const myLostList = useMemo(() => {
    if (!allPosts) {
      return [];
    }

    return allPosts.filter(
      (item) =>
        item.postAdoptModel.isAdopt === false &&
        item.postAdoptModel.userID === myPhoneNumber
    );
  }, [allPosts, myPhoneNumber]);

  const onDetail = () => {};

  const renderItemLost = ({ item }) => {
    return (
      <AdoptedPetCard
        image={item.images}
        name={item.postAdoptModel.petName}
        gender={item.postAdoptModel.sex}
        district={item.postAdoptModel.district}
        province={item.postAdoptModel.province}
        own={true}
        onDetail={() => {
          onDetail();
        }}
      />
    );
  };

  return (
    <View style={{ paddingHorizontal: SIZES.padding }}>
      {myLostList && (
        <>
          <View style={styles.container}>
            <Text style={styles.title}>My Lost Pets</Text>
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
