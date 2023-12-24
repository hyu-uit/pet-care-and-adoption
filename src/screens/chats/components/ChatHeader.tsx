import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { COLORS, SIZES, FONTS } from '../../../config';
import { scaleSize } from '../../../utils/DeviceUtils';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { doc, getDoc } from 'firebase/firestore';
import { firestoreDB } from '../../../../firebaseConfig';

type ChatHeaderProps = {
  displayName: string;
  onBack: () => void;
};

const ChatHeader: FC<ChatHeaderProps> = ({ displayName, onBack }) => {
  const [img, setImg] = useState();

  const otherPhoneNumber = useSelector(
    (state: RootState) => state.chat.otherUser.id
  );

  useEffect(() => {
    const getOtherUserAvatar = async () => {
      const docRef = doc(firestoreDB, 'users', otherPhoneNumber);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setImg(docSnap.data().avatar);
      }
    };

    getOtherUserAvatar();
  }, [otherPhoneNumber]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={onBack}>
          <AntDesign
            name='left'
            size={scaleSize(24)}
            color={COLORS.blackContent}
          />
        </TouchableOpacity>
        <Image
          source={{
            uri: img
              ? img
              : 'https://firebasestorage.googleapis.com/v0/b/pet-care-and-adoption.appspot.com/o/images%2Fdog-puns-1581708208.jpg?alt=media&token=39969852-94c9-41fd-8f4b-afd05f1201f9',
          }}
          style={styles.image}
        />
        <Text style={styles.name}>{displayName}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(`tel:${otherPhoneNumber}`);
        }}
      >
        <FontAwesome name='phone' size={scaleSize(24)} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default ChatHeader;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    minHeight: scaleSize(50),
    backgroundColor: COLORS.background,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: scaleSize(36),
    height: scaleSize(36),
    borderRadius: scaleSize(18),
    resizeMode: 'cover',
    marginLeft: scaleSize(20),
  },
  name: {
    ...FONTS.body2,
    fontWeight: '600',
    color: COLORS.blackPrimary,
    marginLeft: scaleSize(10),
  },
});
