import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { FC } from 'react';
import { scaleSize } from '../utils/DeviceUtils';
import { COLORS, SIZES, FONTS, STYLES } from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { SEX } from '../types/enum/sex.enum';

type ImageModalProps = {
  uri: string;
  open: boolean;
  onClose: () => void;
};

const ImageModal: FC<ImageModalProps> = ({ uri, open, onClose }) => {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={open}
      onRequestClose={() => {}}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <Image style={styles.image} source={{ uri: uri }} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ImageModal;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.popupBackground,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: scaleSize(24),
  },
  wrapper: {
    borderRadius: SIZES.radius,

    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
