import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
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

  const onSelect = async () => {
    const id1 = '0848867679';
    const id2 = '0377340140';

    const combinedId = id1 > id2 ? id1 + id2 : id2 + id1;

    const chatDocRef = doc(firestoreDB, 'chats', '01234');
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
            id: '0377340140',
            displayName: 'Hong Le',
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        //Update for other user who you chat with as well
        await updateDoc(doc(firestoreDB, 'userChats', '0377340140'), {
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
    <SafeAreaView style={styles.container}>
      {/* <TouchableOpacity onPress={onSelect}>
        <Text>SSS</Text>
      </TouchableOpacity> */}
      {Object.entries(chats).map((chat, index) => (
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
                uri: 'https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*',
              }}
              style={styles.image}
            ></Image>
            <View>
              <Text style={styles.name}>{chat[1].userInfo.displayName}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: scaleSize(20),
                }}
              >
                <Text style={styles.message}>
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
    </SafeAreaView>
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
    paddingHorizontal: scaleSize(16),
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
  },
});
