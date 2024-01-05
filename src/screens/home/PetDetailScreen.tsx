import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Linking,
  Touchable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, FONTS, IMAGES, STYLES } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { HomeStackParamList } from '../../navigators/config';
import { SCREEN } from '../../navigators/AppRoute';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';
import { Post } from '../../store/post/response/get-add.response';
import { SEX } from '../../types/enum/sex.enum';
import { useGetUserInformationQuery } from '../../store/users/users.api';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import ImageModal from '../../components/ImageModal';
import { firestoreDB } from '../../../firebaseConfig';
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { changeOtherUser } from '../../store/chat/chat.slice';
import { useRequestAdoptionMutation } from '../../store/post/post.api';
import { RequestAdoptionREQ } from '../../store/post/request/request-adoption.request';
import Popup from '../../components/Popup';
import { POPUP_TYPE } from '../../types/enum/popup.enum';

const PetDetailScreen = ({
  navigation,
}: NativeStackScreenProps<HomeStackParamList, SCREEN.PET_DETAIL>) => {
  const route = useRoute();
  const postDetail = route.params?.postData;
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalUri, setModalUri] = useState('');
  const [isSuccessPopup, setIsSuccessPopup] = useState<boolean>(false);

  const myPhoneNumber = useSelector(
    (state: RootState) => state.shared.user.phoneNumber
  );
  const myName = useSelector((state: RootState) => state.shared.user.name);
  const dispatch = useDispatch();

  const { data: postedBy } = useGetUserInformationQuery(postDetail?.userID);
  const [requestAdoption, { isLoading }] = useRequestAdoptionMutation();

  const onSendNotification = async () => {
    const message = {
      to: 'ExponentPushToken[ujtwtSJdFTEaRi4lOnsNLB]',
      title: 'My notification',
      sound: 'default',
      body: 'Body notification ne',
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        host: 'exp.host',
        accept: 'application/json',
        'accept-encoding': 'gzip, deflate',
        'content-type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

  const onGoBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setModalUri(item);
        setShowModal(true);
      }}
    >
      <Image
        source={{
          uri: item,
        }}
        style={styles.image}
      />
    </TouchableOpacity>
  );

  const onMessage = async () => {
    const id1 = myPhoneNumber;
    const id2 = postedBy.userID;

    const combinedId = id1 > id2 ? id1 + id2 : id2 + id1;

    const chatDocRef = doc(firestoreDB, 'chats', combinedId);
    try {
      //Check chats exists or not?
      const chatDocSnapshot = await getDoc(chatDocRef);

      if (chatDocSnapshot.exists()) {
        // Access the chat data using the data() method
        // const chatData = chatDocSnapshot.data();
        // console.log('chat', JSON.stringify(chatData));

        dispatch(
          changeOtherUser({
            displayName: postedBy.name,
            id: postedBy.userID,
          })
        );

        navigation.navigate(SCREEN.CHAT_DETAIL);
      } else {
        //If do not exist will create empty chat in collection chats
        await setDoc(doc(firestoreDB, 'chats', combinedId), { messages: [] });

        //Also create history chat in userChats Collection inside our id
        //Destination is updadte history you belongs to you and other
        await updateDoc(doc(firestoreDB, 'userChats', id1), {
          [combinedId + '.userInfo']: {
            //user ID of oyou
            id: id2,
            displayName: postedBy.name,
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        //Update for other user who you chat with as well
        await updateDoc(doc(firestoreDB, 'userChats', id2), {
          [combinedId + '.userInfo']: {
            //user ID of other people who you chat with
            id: id1,
            displayName: myName,
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        dispatch(
          changeOtherUser({
            displayName: postedBy.name,
            id: postedBy.userID,
          })
        );

        navigation.navigate(SCREEN.CHAT_DETAIL);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onRequestAdoptPet = async () => {
    try {
      const body: RequestAdoptionREQ = {
        postID: postDetail.postID,
        userRequest: myPhoneNumber,
      };
      await onSendNotification();
      // await requestAdoption(body).unwrap();
      setIsSuccessPopup(true);
    } catch (error) {
      console.log('error at request', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Popup
        title='Request sent successfully'
        content={`Your request sent to user\nYou can check that in Profile`}
        onCancel={() => {
          setIsSuccessPopup(false);
          navigation.goBack();
        }}
        type={POPUP_TYPE.SUCCESS}
        open={isSuccessPopup}
      />
      <ImageModal
        uri={modalUri}
        open={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      />
      <View style={{ zIndex: 10000 }}>
        <TouchableOpacity style={styles.backIcon} onPress={onGoBack}>
          <Ionicons
            name='chevron-back-outline'
            size={scaleSize(30)}
            color={COLORS.whitePrimary}
          />
        </TouchableOpacity>
        <Carousel
          data={postDetail?.images}
          renderItem={renderItem}
          sliderWidth={SIZES.WindowWidth}
          itemWidth={SIZES.WindowWidth}
          onSnapToItem={(index) => setActiveIndex(index)}
          loop
        />
        <Pagination
          dotsLength={postDetail?.images?.length}
          activeDotIndex={activeIndex}
          containerStyle={styles.paginationContainer}
          dotStyle={styles.paginationDot}
          inactiveDotStyle={styles.paginationInactiveDot}
          inactiveDotOpacity={0.6}
          inactiveDotScale={0.8}
        />
        {/* <Image
          source={{
            uri: postDetail.images[0],
          }}
          style={styles.image}
        /> */}
        <View style={styles.infoContainer}>
          <View style={styles.horizontalWrapper}>
            <Text style={styles.name}>{postDetail?.petName}</Text>
            <View style={styles.iconWrapper}>
              <Ionicons
                name={postDetail?.sex === SEX.MALE ? 'male' : 'female'}
                size={scaleSize(20)}
                color={
                  postDetail?.sex === SEX.MALE
                    ? COLORS.blue8EB1E5
                    : COLORS.pinkF672E1
                }
              />
            </View>
          </View>
          <View
            style={[
              styles.horizontalWrapper,
              { marginTop: scaleSize(10), paddingRight: scaleSize(36) },
            ]}
          >
            <View style={styles.horizontalWrapper}>
              <Feather
                name='clock'
                size={scaleSize(15)}
                color={COLORS.primary}
              />
              <Text style={styles.infoText}>
                {postDetail?.age} month{postDetail?.age < 1 ? '' : 's'}{' '}
              </Text>
            </View>
            <View style={styles.horizontalWrapper}>
              <Image source={IMAGES.FOOT} style={styles.iconFoot} />
              <Text style={styles.infoText}>{postDetail?.breed}</Text>
            </View>
          </View>
          <View
            style={[
              styles.horizontalWrapper,
              { marginTop: scaleSize(10), justifyContent: 'flex-start' },
            ]}
          >
            <Ionicons
              name='location-sharp'
              size={scaleSize(15)}
              color={COLORS.primary}
            />
            <Text style={styles.infoText}>
              {postDetail?.district}, {postDetail?.province}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <View
          style={[
            styles.horizontalWrapper,
            { marginTop: scaleSize(100), paddingHorizontal: SIZES.padding },
          ]}
        >
          <View style={styles.detailCell}>
            <Text style={styles.detailText}>Status</Text>
            <Text
              style={[
                styles.detailText,
                {
                  ...FONTS.body4,
                  fontFamily: 'CercoDEMO-Black',
                  fontWeight: 'bold',
                  color: COLORS.primary,
                  marginTop: scaleSize(7),
                },
              ]}
            >
              {postDetail?.isAdopt ? 'Adopt' : 'Lost'}
            </Text>
          </View>
          <View style={styles.detailCell}>
            <Text style={styles.detailText}>Category</Text>
            <Text
              style={[
                styles.detailText,
                {
                  ...FONTS.body4,
                  fontFamily: 'CercoDEMO-Black',
                  fontWeight: 'bold',
                  color: COLORS.primary,
                  marginTop: scaleSize(7),
                },
              ]}
            >
              {postDetail?.species}
            </Text>
          </View>
          <View style={styles.detailCell}>
            <Text style={styles.detailText}>Weight</Text>
            <Text
              style={[
                styles.detailText,
                {
                  ...FONTS.body4,
                  fontFamily: 'CercoDEMO-Black',
                  fontWeight: 'bold',
                  color: COLORS.primary,
                  marginTop: scaleSize(7),
                },
              ]}
            >
              {postDetail.weight} KG
            </Text>
          </View>
          <View style={styles.detailCell}>
            <Text style={styles.detailText}>Vaccinated</Text>
            <Text
              style={[
                styles.detailText,
                {
                  ...FONTS.body4,
                  fontFamily: 'CercoDEMO-Black',
                  fontWeight: 'bold',
                  color: COLORS.primary,
                  marginTop: scaleSize(7),
                },
              ]}
            >
              {postDetail.isVaccinated ? 'YES' : 'NO'}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.horizontalWrapper,
            { marginTop: scaleSize(20), paddingHorizontal: SIZES.padding },
          ]}
        >
          <View style={styles.horizontalWrapper}>
            <Image
              source={{
                uri: postedBy?.avatar
                  ? postedBy.avatar
                  : 'https://api.nongthonviet.com.vn/media/2023/08/26/64e9bf46b7eda301891a99db_ca-si-mat-na-tap-4hippohappy-1692978300539212339639-1693035914-70-widthheight.webp',
              }}
              style={styles.ownerImage}
            />
            <View style={{ marginLeft: scaleSize(10) }}>
              <Text style={styles.postedBy}>Posted by</Text>
              <Text style={styles.ownerName}>{postedBy?.name}</Text>
            </View>
          </View>
          <View style={styles.horizontalWrapper}>
            <TouchableOpacity
              style={[styles.contactWrapper, { marginRight: scaleSize(10) }]}
              onPress={() => {
                Linking.openURL(`tel:${postedBy?.userID}`);
              }}
            >
              <FontAwesome
                name='phone'
                size={scaleSize(19)}
                color={COLORS.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onMessage} style={styles.contactWrapper}>
              <MaterialCommunityIcons
                name='email'
                size={scaleSize(19)}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.comment}>{postDetail.description}</Text>
        {postDetail?.isAdopt && (
          <View style={{ paddingHorizontal: SIZES.padding }}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    postedBy?.userID === myPhoneNumber
                      ? COLORS.tertiary
                      : COLORS.primary,
                },
              ]}
              onPress={onRequestAdoptPet}
              disabled={postedBy?.userID === myPhoneNumber}
            >
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color:
                        postedBy?.userID === myPhoneNumber
                          ? COLORS.grayLight
                          : COLORS.whitePrimary,
                    },
                  ]}
                >
                  Adopt me
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PetDetailScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.background,
  },
  image: {
    width: '100%',
    height: scaleSize(360),
    resizeMode: 'cover',
    backgroundColor: COLORS.primary,
  },
  infoContainer: {
    width: scaleSize(342),
    height: scaleSize(118),
    padding: scaleSize(15),
    backgroundColor: COLORS.whitePrimary,
    borderRadius: scaleSize(15),
    position: 'absolute',
    bottom: -scaleSize(77),
    left: SIZES.WindowWidth / 2 - scaleSize(342) / 2,
    borderWidth: scaleSize(1),
    borderColor: COLORS.grayLight,
    paddingHorizontal: scaleSize(22),
  },
  name: {
    ...FONTS.h2,
    color: COLORS.primary,
  },
  iconWrapper: {
    width: scaleSize(30),
    height: scaleSize(30),
    backgroundColor: COLORS.tertiary,
    borderRadius: scaleSize(23),
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoText: {
    ...FONTS.body4,
    color: COLORS.blackContent,
    marginLeft: scaleSize(4),
  },
  iconFoot: {
    width: scaleSize(15),
    height: scaleSize(15),
  },
  favouriteContainer: {
    position: 'absolute',
    backgroundColor: COLORS.primary,
    width: scaleSize(45),
    height: scaleSize(48),
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: scaleSize(20),
    borderBottomLeftRadius: scaleSize(20),
    top: 0,
    right: 0,
  },
  detailCell: {
    width: scaleSize(70),
    height: scaleSize(70),
    backgroundColor: COLORS.tertiary,
    borderRadius: scaleSize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailText: {
    ...FONTS.body7,
    color: COLORS.primary,
  },
  ownerImage: {
    width: scaleSize(40),
    height: scaleSize(40),
    borderRadius: scaleSize(20),
    resizeMode: 'cover',
  },
  postedBy: {
    ...FONTS.body7,
    color: COLORS.blackContent,
  },
  ownerName: {
    ...FONTS.body4,
    fontWeight: 'bold',
    color: COLORS.blackContent,
    marginTop: scaleSize(5),
  },
  contactWrapper: {
    width: scaleSize(30),
    height: scaleSize(30),
    borderRadius: scaleSize(5),
    backgroundColor: COLORS.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comment: {
    ...FONTS.body4,
    paddingHorizontal: SIZES.padding,
    marginTop: scaleSize(20),
  },
  button: {
    ...STYLES.button,
    marginTop: scaleSize(50),
  },
  buttonText: {
    ...STYLES.buttonText,
  },
  backIcon: {
    position: 'absolute',
    top: scaleSize(45),
    left: scaleSize(10),
    zIndex: 1000,
  },
  paginationContainer: {
    position: 'absolute',
    zIndex: 1000,
    bottom: 20,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  paginationInactiveDot: {
    backgroundColor: COLORS.blackContent,
  },
});
