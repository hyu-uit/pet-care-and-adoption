import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, { FC } from 'react';
import { scaleSize } from '../../../utils/DeviceUtils';
import { COLORS, SIZES, FONTS, IMAGES } from '../../../config';
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { firestoreDB } from '../../../../firebaseConfig';
import { changeOtherUser } from '../../../store/chat/chat.slice';
import { useNavigation } from '@react-navigation/native';
import { SCREEN } from '../../../navigators/AppRoute';

type ProfileRequestProps = {
  imagePet: string;
  imageUser: string;
  name: string;
  sent?: boolean;
  userID: string;
  onCancel?: () => void;
  onAccept?: () => void;
  onDenied?: () => void;
};

const ProfileRequestItem: FC<ProfileRequestProps> = ({
  imagePet,
  imageUser,
  name,
  sent,
  userID,
  onCancel,
  onAccept,
  onDenied,
}) => {
  const myPhoneNumber = useSelector(
    (state: RootState) => state.shared.user.phoneNumber
  );
  const myName = useSelector((state: RootState) => state.shared.user.name);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onMessage = async () => {
    const id1 = myPhoneNumber;
    const id2 = userID;

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
            displayName: name,
            id: userID,
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
            displayName: name,
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
            displayName: name,
            id: userID,
          })
        );

        navigation.navigate(SCREEN.CHAT_DETAIL);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: imagePet,
        }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <View style={styles.horizontalWrapper}>
          <View style={styles.horizontalWrapper}>
            <Image
              source={{
                uri: imageUser,
              }}
              style={styles.profileImg}
            />
            <Text style={styles.name}>{name}</Text>
          </View>
          <View style={styles.horizontalWrapper}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${userID}`);
              }}
              style={[styles.contactWrapper, { marginRight: scaleSize(10) }]}
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

        {!sent && (
          <TouchableOpacity
            onPress={onAccept}
            style={[
              styles.horizontalWrapper,
              {
                marginTop: scaleSize(10),
                width: '50%',
                alignSelf: 'center',
                backgroundColor: COLORS.tertiary,
                padding: scaleSize(5),
                borderRadius: scaleSize(5),
              },
            ]}
          >
            <Text style={styles.option}>Accept</Text>

            <AntDesign
              name='checkcircle'
              size={scaleSize(24)}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.horizontalWrapper,
            {
              marginTop: scaleSize(10),
              width: '50%',
              alignSelf: 'center',
              backgroundColor: COLORS.tertiary,
              padding: scaleSize(5),
              borderRadius: scaleSize(5),
            },
          ]}
          onPress={sent ? onCancel : onDenied}
        >
          <Text style={styles.option}>{sent ? 'Cancel' : 'Denied'}</Text>

          <AntDesign
            name='closecircle'
            size={scaleSize(24)}
            color={COLORS.redPrimary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileRequestItem;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scaleSize(350),
    marginBottom: scaleSize(20),
  },
  image: {
    width: '100%',
    height: scaleSize(300),
    borderRadius: scaleSize(20),
  },
  infoContainer: {
    width: scaleSize(227),
    minHeight: scaleSize(110),
    padding: scaleSize(15),
    backgroundColor: COLORS.whitePrimary,
    borderRadius: scaleSize(15),
    position: 'absolute',
    bottom: 0,
    left: (SIZES.WindowWidth - scaleSize(48)) / 2 - scaleSize(227) / 2,
    borderWidth: scaleSize(1),
    borderColor: COLORS.grayLight,
  },
  name: {
    ...FONTS.body4,
    marginLeft: scaleSize(5),
  },
  iconWrapper: {
    width: scaleSize(23),
    height: scaleSize(23),
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
  profileImg: {
    width: scaleSize(36),
    height: scaleSize(36),
    borderRadius: scaleSize(18),
    resizeMode: 'cover',
  },
  contactWrapper: {
    width: scaleSize(30),
    height: scaleSize(30),
    borderRadius: scaleSize(5),
    backgroundColor: COLORS.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    ...FONTS.body6,
  },
});
