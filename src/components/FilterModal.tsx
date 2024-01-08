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
import { SEX } from '../types/enum/sex.enum';

type FilterModalProps = {
  open: boolean;
  onClose: () => void;

  sex: SEX | null;
  onSelectSex: (sex: SEX) => void;
  age: number[];
  onSelectAges: (ages: number[]) => void;
  vaccinated: boolean | null;
  onSelectVaccinated: (vaccinated: boolean) => void;
};

const FilterModal: FC<FilterModalProps> = ({
  open,
  onClose,
  sex,
  onSelectSex,
  age,
  onSelectAges,
  vaccinated,
  onSelectVaccinated,
}) => {
  const ages = [
    '< 2 months',
    '2 - 4 months',
    '4 - 7 months',
    '7 - 12 months',
    '1 - 2 years',
    '> 2 years',
  ];

  const handlePressItem = (item, index) => {
    const isSelected = age?.includes(index);
    if (isSelected) {
      // Remove the item from the selected list
      const updatedSelectedItems = age.filter(
        (selectedItem) => selectedItem !== index
      );
      onSelectAges(updatedSelectedItems);
    } else {
      // Add the item to the selected list
      onSelectAges([...age, index]);
    }
  };

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
            <TouchableOpacity
              style={[
                styles.optionWrapper,
                {
                  backgroundColor:
                    sex === SEX.MALE ? COLORS.primary : COLORS.tertiary,
                },
              ]}
              onPress={() => {
                onSelectSex(SEX.MALE);
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color:
                      sex === SEX.MALE ? COLORS.whitePrimary : COLORS.primary,
                  },
                ]}
              >
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionWrapper,
                {
                  backgroundColor:
                    sex === SEX.FEMALE ? COLORS.primary : COLORS.tertiary,
                },
              ]}
              onPress={() => {
                onSelectSex(SEX.FEMALE);
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color:
                      sex === SEX.FEMALE ? COLORS.whitePrimary : COLORS.primary,
                  },
                ]}
              >
                Female
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.title, { marginTop: scaleSize(20) }]}>Age</Text>
          <View style={styles.ageWrapper}>
            {ages.map((item, index) => (
              <TouchableOpacity
                onPress={() => handlePressItem(item, index)}
                style={[
                  styles.optionWrapper,
                  {
                    marginTop: scaleSize(5),
                    backgroundColor: age?.includes(index)
                      ? COLORS.primary
                      : COLORS.tertiary,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: age?.includes(index)
                        ? COLORS.whitePrimary
                        : COLORS.primary,
                    },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
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
            <TouchableOpacity
              style={[
                styles.optionWrapper,
                {
                  backgroundColor:
                    vaccinated === true ? COLORS.primary : COLORS.tertiary,
                },
              ]}
              onPress={() => {
                onSelectVaccinated(true);
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color:
                      vaccinated === true
                        ? COLORS.whitePrimary
                        : COLORS.primary,
                  },
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionWrapper,
                {
                  backgroundColor:
                    vaccinated === false ? COLORS.primary : COLORS.tertiary,
                },
              ]}
              onPress={() => {
                onSelectVaccinated(false);
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color:
                      vaccinated === false
                        ? COLORS.whitePrimary
                        : COLORS.primary,
                  },
                ]}
              >
                No
              </Text>
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
