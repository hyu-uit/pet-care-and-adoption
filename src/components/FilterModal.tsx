import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { FC } from 'react';
import { scaleSize } from '../utils/DeviceUtils';
import { COLORS, SIZES, FONTS, STYLES } from '../config';
import { FontAwesome } from '@expo/vector-icons';

type FilterModalProps = {
  open: boolean;
  onClose: () => void;
};

const FilterModal: FC<FilterModalProps> = ({ open, onClose }) => {
  const ages = [
    '< 2 months',
    '2 - 4 months',
    '4 - 7 months',
    '7 - 12 months',
    '1 - 2 years',
    '> 2 years',
  ];

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={open}
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.closeWrapper}>
            <TouchableOpacity onPress={onClose}>
              <FontAwesome
                name='close'
                size={scaleSize(20)}
                color={COLORS.whitePrimary}
              />
            </TouchableOpacity>
          </View>
          <Text style={[styles.title, { marginTop: scaleSize(20) }]}>Sex</Text>
          <View
            style={{
              ...STYLES.horizontal,
              marginTop: scaleSize(5),
              justifyContent: 'flex-start',
            }}
          >
            <TouchableOpacity style={styles.optionWrapper}>
              <Text style={styles.optionText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionWrapper}>
              <Text style={styles.optionText}>Female</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.title, { marginTop: scaleSize(20) }]}>Age</Text>
          <View style={styles.ageWrapper}>
            {ages.map((age) => (
              <TouchableOpacity
                style={[styles.optionWrapper, { marginTop: scaleSize(5) }]}
              >
                <Text style={styles.optionText}>{age}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.title, { marginTop: scaleSize(20) }]}>
            Friendly
          </Text>
          <View
            style={{
              ...STYLES.horizontal,
              marginTop: scaleSize(5),
              justifyContent: 'flex-start',
            }}
          >
            <TouchableOpacity style={styles.optionWrapper}>
              <Text style={styles.optionText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionWrapper}>
              <Text style={styles.optionText}>No</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.title, { marginTop: scaleSize(20) }]}>
            Vaccinated
          </Text>
          <View
            style={{
              ...STYLES.horizontal,
              marginTop: scaleSize(5),
              justifyContent: 'flex-start',
            }}
          >
            <TouchableOpacity style={styles.optionWrapper}>
              <Text style={styles.optionText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionWrapper}>
              <Text style={styles.optionText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: scaleSize(10),
  },
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.popupBackground,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: scaleSize(24),
  },
  wrapper: {
    backgroundColor: COLORS.whitePrimary,
    borderRadius: SIZES.radius,
    minHeight: scaleSize(333),
    padding: scaleSize(20),
    width: '100%',
  },
  closeWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderTopRightRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
    width: scaleSize(40),
    height: scaleSize(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: SIZES.radius,
  },
  title: {
    ...FONTS.body1,
    fontWeight: '600',
    color: COLORS.primary,
  },
  optionWrapper: {
    paddingHorizontal: scaleSize(8),
    paddingVertical: scaleSize(3),
    backgroundColor: COLORS.tertiary,
    borderWidth: scaleSize(1),
    borderColor: COLORS.grayLight,
    borderRadius: scaleSize(5),
    marginRight: scaleSize(10),
    alignSelf: 'flex-start',
  },
  optionText: {
    ...FONTS.body6,
    color: COLORS.primary,
  },
  ageWrapper: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
