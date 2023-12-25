import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES, FONTS, STYLES } from '../../../config';
import Button from '../../../components/Button';
import { scaleSize } from '../../../utils/DeviceUtils';
import ProfileRequestItem from './ProfileRequestItem';
import PetSearchCard from '../../home/components/search/PetSearchCard';
import {
  useAcceptRequestMutation,
  useCancelRequestMutation,
  useDeniedRequestMutation,
  useGetPostsWithRequestQuery,
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

  const { data: requestedPosts, refetch: refetchRequested } =
    useGetRequestedPostsQuery(myPhoneNumber);
  const { data: postsRequestedFromOthers, refetch: refetchFromOthers } =
    useGetPostsWithRequestQuery(myPhoneNumber);
  const [cancelRequest, { isLoading }] = useCancelRequestMutation();
  const [acceptRequest] = useAcceptRequestMutation();
  const [denyRequest] = useDeniedRequestMutation();

  const [isPopupShow, setIsPopupShow] = useState<boolean>(false);
  const [isSuccessPopup, setIsSuccessPopup] = useState<boolean>(false);
  const [isFailedPopup, setIsFailedPopup] = useState<boolean>(false);
  const [cancelPostID, setCancelPostID] = useState<string>('');
  const [cancelUserID, setCancelUserID] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Call your API or perform any asynchronous task
    await refetchFromOthers();
    await refetchRequested();
    setRefreshing(false);
  };

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

  const onAccept = async (postID, userID) => {
    try {
      await acceptRequest({
        postID: postID?.postID,
        receiverID: userID,
      }).unwrap();
      setIsPopupShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onDenied = async (postID, userID) => {
    try {
      await denyRequest({ postID: postID.postID, userID: userID }).unwrap();
      setIsPopupShow(true);
    } catch (error) {
      console.log(error);
    }
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

  const renderRequests = ({ item }) => {
    return (
      <ProfileRequestItem
        imagePet={item.images[0]}
        imageUser={item.userInfo?.avatar}
        name={item.userInfo?.name}
        sent={true}
        userID={item.postAdoptModel.userID}
        onCancel={() => {
          // onCancelRequest(item.postAdoptModel?.postID, myPhoneNumber);
          // setIsPopupShow(true);
        }}
      />
    );
  };

  const renderItem = ({ item, index }) => {
    // return (
    //   <ProfileRequestItem
    //     imagePet={item.imagePet}
    //     imageUser={item.imageUser}
    //     name={item.name}
    //   />
    // );
    <FlatList
      data={item}
      keyExtractor={index}
      renderItem={renderRequests} //method to render the data in the way you want using styling u need
      horizontal={false}
      numColumns={1}
      style={{ marginTop: scaleSize(20) }}
      showsVerticalScrollIndicator={false}
    />;
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
      <Popup
        title='Accepted Request'
        content='Hope your pet will have a nice new family!'
        onCancel={() => {
          setIsSuccessPopup(false);
        }}
        type={POPUP_TYPE.SUCCESS}
        open={isSuccessPopup}
      />
      <Popup
        title='Denied this request'
        content='May be this person not match with this pet!'
        onCancel={() => {
          setIsFailedPopup(false);
        }}
        type={POPUP_TYPE.SUCCESS}
        open={isFailedPopup}
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
        // <FlatList
        //   data={postsRequestedFromOthers}
        //   keyExtractor={(item) => item.title}
        //   renderItem={renderItem}
        //   horizontal={false}
        //   numColumns={1}
        //   style={{ marginTop: scaleSize(20) }}
        //   showsVerticalScrollIndicator={false}
        // />
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          data={postsRequestedFromOthers}
          keyExtractor={(item) => item.postID.postID}
          renderItem={({ item }) => (
            <View>
              <FlatList
                style={{ paddingTop: SIZES.bottomPadding }}
                data={item.request}
                keyExtractor={(requestItem) => requestItem.userID}
                renderItem={({ item: requestItem }) => (
                  <ProfileRequestItem
                    imagePet={item.images[0]}
                    imageUser={requestItem.avatar}
                    name={requestItem.name}
                    userID={requestItem.userID}
                    onAccept={() => {
                      onAccept(item.postID, requestItem.userID);
                    }}
                    onDenied={() => {
                      onDenied(item.postID, requestItem.userID);
                    }}
                  />
                )}
              />
            </View>
          )}
        />
      )}

      {tab === 1 && (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={requestedPosts}
          keyExtractor={(item) => item.title}
          renderItem={renderItemSent}
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
