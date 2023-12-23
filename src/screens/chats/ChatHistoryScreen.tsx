import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { firestoreDB } from '../../../firebaseConfig';
import { COLORS, SIZES, FONTS } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { changeOtherUser } from '../../store/chat/chat.slice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigators/config';
import { SCREEN } from '../../navigators/AppRoute';
import { useFocusEffect } from '@react-navigation/native';

const ChatHistoryScreen = ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, SCREEN.CHAT_HISTORY>) => {
  const myPhoneNumber = useSelector(
    (state: RootState) => state.shared.user.phoneNumber
  );

  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [user, setUser] = useState('');
  const [chats, setChats] = useState([]);
  const [imgs, setImgs] = useState([]);

  let avatars = [];

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(firestoreDB, 'userChats', myPhoneNumber),
        (doc) => {
          setChats(doc.data() as []);
        }
      );

      return () => {
        unsub();
      };
    };

    myPhoneNumber && getChats();
  }, [myPhoneNumber]);

  const onSearch = async () => {
    const q = query(
      collection(firestoreDB, 'users'),
      where('name', '==', 'The Vi')
    );

    try {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((user) => {
        // Access the user data using the data() method
        const userData = user.data();
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      // const docRef = doc(firestoreDB, 'users', );
      // const docSnap = await getDoc(docRef);
      // console.log(docSnap.data());
      if (
        Object.entries(chats).length > 0 &&
        Object.entries(chats).length >= imgs.length
      ) {
        if (Object.entries(chats).length >= avatars.length) {
          Object.entries(chats).forEach(async (chat, index) => {
            console.log(chat[1].userInfo.displayName);
            const docRef = doc(firestoreDB, 'users', chat[1].userInfo.id);
            const docSnap = await getDoc(docRef);
            avatars = [...avatars, docSnap.data()?.avatar];
            setImgs(avatars);
          });
        }
      }
    };

    getData();
  }, [Object.entries(chats).length]);

  const onSelect = async () => {
    const id1 = '0848867679';
    const id2 = '0393751403';

    const combinedId = id1 > id2 ? id1 + id2 : id2 + id1;

    const chatDocRef = doc(firestoreDB, 'chats', combinedId);
    try {
      //Check chats exists or not?
      const chatDocSnapshot = await getDoc(chatDocRef);

      if (chatDocSnapshot.exists()) {
        // Access the chat data using the data() method
        const chatData = chatDocSnapshot.data();
        console.log('chat', JSON.stringify(chatData));
      } else {
        //If do not exist will create empty chat in collection chats
        await setDoc(doc(firestoreDB, 'chats', combinedId), { messages: [] });

        //Also create history chat in userChats Collection inside our id
        //Destination is updadte history you belongs to you and other
        await updateDoc(doc(firestoreDB, 'userChats', '0848867679'), {
          [combinedId + '.userInfo']: {
            //user ID of oyou
            id: '0393751403',
            displayName: 'Bin',
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        //Update for other user who you chat with as well
        await updateDoc(doc(firestoreDB, 'userChats', '0393751403'), {
          [combinedId + '.userInfo']: {
            //user ID of other people who you chat with
            id: '0848867679',
            displayName: 'The Vi',
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onDetailChat = (userInfo) => {
    dispatch(
      changeOtherUser({
        displayName: userInfo.userInfo.displayName,
        id: userInfo.userInfo.id,
      })
    );
    navigation.navigate(SCREEN.CHAT_DETAIL);
  };

  const truncateText = (text, limit) => {
    if (text.length <= limit) {
      return text;
    }
    return text.substring(0, limit) + '...';
  };

  const convertTimeStamp = (timestamp) => {
    if (timestamp) {
      timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1e6);

      const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds

      // Calculate the difference in days
      const dayDifference = Math.floor(
        (currentTimestamp - timestamp.seconds) / (24 * 60 * 60)
      );

      let formattedDateTime;

      if (dayDifference === 0) {
        // The timestamp is from today, display only the time
        const dateObject = new Date(
          timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1e6)
        );
        return (formattedDateTime = dateObject.toLocaleTimeString()); // Adjust time format as needed
      } else {
        // The timestamp is from a previous date, display only the date
        const dateObject = new Date(
          timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1e6)
        );
        return (formattedDateTime = dateObject.toLocaleDateString()); // Adjust date format as needed
      }
    }
    return '';
  };

  return (
    <ScrollView style={styles.container}>
      {/* <TouchableOpacity onPress={onSelect}>
        <Text>SSS</Text>
      </TouchableOpacity> */}
      {chats &&
        Object.entries(chats).map((chat, index) => (
          <TouchableOpacity
            onPress={() => {
              onDetailChat(chat[1]);
            }}
            style={styles.chatWrapper}
            key={index}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: scaleSize(11),
              }}
            >
              <Image
                source={{
                  uri: imgs[index]
                    ? imgs[index]
                    : 'https://firebasestorage.googleapis.com/v0/b/pet-care-and-adoption.appspot.com/o/images%2Fdog-puns-1581708208.jpg?alt=media&token=39969852-94c9-41fd-8f4b-afd05f1201f9',
                }}
                style={styles.image}
              ></Image>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{chat[1].userInfo.displayName}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: scaleSize(20),
                  }}
                >
                  <Text
                    style={[
                      styles.message,
                      {
                        color: !chat[1].isRead
                          ? COLORS.grayPrimary
                          : COLORS.blackPrimary,

                        fontFamily: !chat[1].isRead
                          ? 'CercoDEMO-Regular'
                          : 'CercoDEMO-Bold',
                        width: '60%',
                      },
                    ]}
                  >
                    {truncateText(chat[1].lastMessage?.text || '', 20)}
                  </Text>
                  <Text style={styles.message}>
                    {convertTimeStamp(chat[1].date)}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

export default ChatHistoryScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.padding,
  },
  chatWrapper: {
    width: '100%',
    height: scaleSize(76),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaleSize(10),
    alignItems: 'center',
  },
  image: {
    width: scaleSize(60),
    height: scaleSize(60),
    borderRadius: scaleSize(30),
    backgroundColor: COLORS.whitePrimary,
  },
  name: {
    ...FONTS.h4,
    fontWeight: 'bold',
    color: COLORS.blackPrimary,
  },
  message: {
    marginTop: scaleSize(5),
    ...FONTS.body4,
    color: COLORS.grayPrimary,
    width: '40%',
  },
});
