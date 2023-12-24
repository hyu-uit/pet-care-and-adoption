import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES, FONTS, STYLES } from '../../../config';
import Button from '../../../components/Button';
import { scaleSize } from '../../../utils/DeviceUtils';
import ProfileRequestItem from './ProfileRequestItem';
import PetSearchCard from '../../home/components/search/PetSearchCard';
import {
  useCancelRequestMutation,
  useGetRequestedPostsQuery,
} from '../../../store/post/post.api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useGetUserInformationQuery } from '../../../store/users/users.api';
import { cancelRequestREQ } from '../../../store/post/request/cancel-request.request';
import Popup from '../../../components/Popup';
import { POPUP_TYPE } from '../../../types/enum/popup.enum';

const ProfileRequest = () => {
  const [tab, setTab] = useState<number>(0);

  const myPhoneNumber = useSelector(
    (state: RootState) => state.shared.user.phoneNumber
  );

  const { data: requestedPosts } = useGetRequestedPostsQuery(myPhoneNumber);
  const [cancelRequest, { isLoading }] = useCancelRequestMutation();

  const [isPopupShow, setIsPopupShow] = useState<boolean>(false);
  const [cancelPostID, setCancelPostID] = useState<string>('');
  const [cancelUserID, setCancelUserID] = useState<string>('');

  console.log(requestedPosts);

  const data = [
    {
      imagePet:
        'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
      imageUser:
        'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
      name: 'Vincent',
    },
    {
      imagePet:
        'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
      imageUser:
        'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
      name: 'Vincent',
    },
    {
      imagePet:
        'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
      imageUser:
        'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
      name: 'Vincent',
    },
    {
      imagePet:
        'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
      imageUser:
        'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?cs=srgb&dl=pexels-simona-kidri%C4%8D-2607544.jpg&fm=jpg',
      name: 'Vincent',
    },
  ];

  const onCancelRequest = async (postID, userID) => {
    setCancelPostID(postID);
    setCancelUserID(userID);
  };

  const onConfirmCancel = async () => {
    try {
      await cancelRequest({
        postID: cancelPostID,
        userID: cancelUserID,
      }).unwrap();
      setIsPopupShow(false);
    } catch (error) {
      setIsPopupShow(false);
      console.log(error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <ProfileRequestItem
        imagePet={item.imagePet}
        imageUser={item.imageUser}
        name={item.name}
      />
    );
  };

  const renderItemSent = ({ item }) => {
    return (
      <ProfileRequestItem
        imagePet={item.images[0]}
        imageUser={item.userInfo?.avatar}
        name={item.userInfo?.name}
        sent={true}
        userID={item.postAdoptModel.userID}
        onCancel={() => {
          onCancelRequest(item.postAdoptModel?.postID, myPhoneNumber);
          setIsPopupShow(true);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Popup
        title='Cancel request'
        content='Do you really want to cancel your request?'
        onCancel={() => {
          setIsPopupShow(false);
        }}
        type={POPUP_TYPE.ERROR}
        open={isPopupShow}
        onSubmit={onConfirmCancel}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: scaleSize(20),
        }}
      >
        <TouchableOpacity
          style={tab === 0 ? styles.primary : styles.outlined}
          onPress={() => {
            setTab(0);
          }}
        >
          <Text style={tab === 0 ? styles.primaryText : styles.sent}>
            Wating requests
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tab === 0 ? styles.outlined : styles.primary}
          onPress={() => {
            setTab(1);
          }}
        >
          <Text style={tab === 0 ? styles.sent : styles.primaryText}>
            My requests
          </Text>
        </TouchableOpacity>
      </View>

      {tab === 0 && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.title}
          renderItem={renderItem} //method to render the data in the way you want using styling u need
          horizontal={false}
          numColumns={1}
          style={{ marginTop: scaleSize(20) }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {tab === 1 && (
        <FlatList
          data={requestedPosts}
          keyExtractor={(item) => item.title}
          renderItem={renderItemSent} //method to render the data in the way you want using styling u need
          horizontal={false}
          numColumns={1}
          style={{ marginTop: scaleSize(20) }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default ProfileRequest;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.padding,
  },
  outlined: {
    backgroundColor: COLORS.tertiary,
    width: '48%',
    height: scaleSize(50),
    borderRadius: scaleSize(17),
    borderWidth: scaleSize(1),
    borderColor: COLORS.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sent: {
    ...FONTS.h1,
    fontSize: scaleSize(17),
    fontWeight: '800',
    lineHeight: scaleSize(27.2),
    color: COLORS.primary,
  },
  primary: {
    ...STYLES.button,
    width: '48%',
  },
  primaryText: {
    ...STYLES.buttonText,
    ...FONTS.h1,
    fontSize: scaleSize(17),
    fontWeight: '800',
    lineHeight: scaleSize(27.2),
    color: COLORS.whitePrimary,
  },
});
