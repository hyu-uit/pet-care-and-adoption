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
  FlatList,
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
import {
  HomeStackParamList,
  ProfileStackParamList,
} from '../../navigators/config';
import { SCREEN } from '../../navigators/AppRoute';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ImageModal from '../../components/ImageModal';
import VaccinatedItem from './components/VaccinatedItem';

const MyPetDetailScreen = ({
  navigation,
}: NativeStackScreenProps<ProfileStackParamList, SCREEN.PROFILE>) => {
  const route = useRoute();
  // const postDetail = route.params?.postData;
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalUri, setModalUri] = useState('');

  const myPhoneNumber = useSelector(
    (state: RootState) => state.shared.user.phoneNumber
  );

  const vaccinatedHistory = [
    {
      date: '28/12/2023',
      note: 'Tiêm ngừa dại lần 1',
    },
    {
      date: '28/12/2023',
      note: 'Tiêm ngừa dại lần 1',
    },
  ];

  const nextVaccination = [
    {
      date: '28/12/2023',
      note: 'Tiêm ngừa dại lần 1',
    },
    {
      date: '28/12/2023',
      note: 'Tiêm ngừa dại lần 1',
    },
  ];

  const renderItemHistory = ({ item }) => {
    return <VaccinatedItem date={item.date} note={item.note} detail={true} />;
  };

  // const { data: postedBy } = useGetUserInformationQuery(postDetail?.userID);

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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle='dark-content' />
      <ImageModal
        uri={modalUri}
        open={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      />
      <View style={{ zIndex: 10000 }}>
        <Carousel
          // data={postDetail?.images}
          data={[
            'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Labrador_Retriever_portrait.jpg/1200px-Labrador_Retriever_portrait.jpg',
          ]}
          renderItem={renderItem}
          sliderWidth={SIZES.WindowWidth}
          itemWidth={SIZES.WindowWidth}
          onSnapToItem={(index) => setActiveIndex(index)}
          loop
        />
        <Pagination
          // dotsLength={postDetail?.images?.length}
          dotsLength={1}
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
            <Text style={styles.name}>name</Text>
            {/* <Text style={styles.name}>{postDetail?.petName}</Text> */}
            <View style={styles.iconWrapper}>
              <Ionicons
                // name={postDetail?.sex === SEX.MALE ? 'male' : 'female'}
                name={'male'}
                size={scaleSize(20)}
                color={
                  COLORS.blue8EB1E5
                  // postDetail?.sex === SEX.MALE
                  //   ? COLORS.blue8EB1E5
                  //   : COLORS.pinkF672E1
                }
              />
            </View>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.horizontalWrapper,
          {
            marginTop: scaleSize(80),
            paddingHorizontal: SIZES.padding,
            width: '80%',
            alignSelf: 'center',
          },
        ]}
      >
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
            {/* {postDetail?.isAdopt ? 'Adopt' : 'Lost'} */}
            Adopt
          </Text>
        </View>
        <View style={styles.detailCell}>
          <Text style={styles.detailText}>Breed</Text>
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
            {/* {postDetail?.species} */}
            DOG
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
            {/* {postDetail.weight} KG */}2 KG
          </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: SIZES.padding }}>
        <View style={styles.vaccineContainer}>
          <Text
            style={{
              ...FONTS.h5,
              textAlign: 'center',
              color: COLORS.primary,
              fontFamily: 'CercoDEMO-Bold',
            }}
          >
            Vaccination
          </Text>
          <View
            style={[styles.horizontalWrapper, { marginTop: scaleSize(10) }]}
          >
            <View>
              <Text style={styles.vaccineTitle}>History</Text>
              <FlatList
                data={vaccinatedHistory}
                keyExtractor={(item) => item.title}
                renderItem={renderItemHistory} //method to render the data in the way you want using styling u need
                horizontal={false}
                numColumns={1}
                showsVerticalScrollIndicator={false}
              />
            </View>
            <View>
              <Text style={styles.vaccineTitle}>Next</Text>
              <FlatList
                data={nextVaccination}
                keyExtractor={(item) => item.title}
                renderItem={renderItemHistory} //method to render the data in the way you want using styling u need
                horizontal={false}
                numColumns={1}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: SIZES.padding }}>
        <Text
          style={{
            ...FONTS.body4,
            marginTop: scaleSize(20),
            fontFamily: 'CercoDEMO-Bold',
          }}
        >
          Note
        </Text>
        <Text style={{ ...FONTS.body4 }}>note description</Text>
      </View>

      <View
        style={{
          paddingHorizontal: SIZES.padding,
          marginBottom: SIZES.bottomPadding,
          marginTop: scaleSize(20),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity
          style={[styles.button, { backgroundColor: COLORS.tertiary }]}
        >
          <Text style={[styles.buttonText, { color: COLORS.primary }]}>
            Delete
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MyPetDetailScreen;

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
    width: scaleSize(300),
    height: scaleSize(80),
    padding: scaleSize(15),
    backgroundColor: COLORS.whitePrimary,
    justifyContent: 'center',
    borderRadius: scaleSize(15),
    position: 'absolute',
    bottom: -scaleSize(50),
    left: SIZES.WindowWidth / 2 - scaleSize(300) / 2,
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
    marginTop: scaleSize(10),
  },
  button: {
    ...STYLES.button,
    marginTop: scaleSize(20),
    width: '48%',
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
  vaccineContainer: {
    padding: SIZES.padding,
    marginTop: scaleSize(18),
    backgroundColor: COLORS.tertiary,
    borderRadius: scaleSize(20),
    minHeight: scaleSize(100),
  },
  vaccineTitle: {
    ...FONTS.body4,
    fontFamily: 'CercoDEMO-Medium',
    color: '#776DC6',
    marginBottom: scaleSize(5),
  },
});
