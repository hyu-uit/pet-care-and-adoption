import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { FC, useState } from 'react';
import { COLORS, SIZES, FONTS } from '../../../config';
import { scaleSize } from '../../../utils/DeviceUtils';
import { Entypo } from '@expo/vector-icons';

type HandBookItemProps = {
  title: string;
};
const HandBookItem: FC<HandBookItemProps> = ({ title }) => {
  const [detail, setDetail] = useState<boolean>(false);

  const data = [
    [
      {
        title: 'General Care Guidelines',
        content:
          'Dogs: Tips on exercise, socialization, and basic obedience training. Information on breed-specific needs.\nCats: Litter box training, interactive play, and feline enrichment ideas.\nRabbits: Advice on indoor or outdoor housing and proper diet.\nBirds: Information on cage setup, socialization, and flight time.',
      },
      {
        title: 'Feeding Recommendations',
        content:
          "Guidance on selecting high-quality pet food.\nPortion sizes tailored to the pet's age, size, and activity level.\nSuggested feeding schedules for puppies, kittens, and adult pets.\nSpecial dietary considerations for pets with allergies or medical conditions",
      },
      {
        title: 'Grooming',
        content:
          'Brushing recommendations based on pet hair type and length.\nBathing frequency and techniques.\nNail trimming instructions, emphasizing safety and caution.\nSpecific grooming needs for breeds with long or thick coats.',
      },
      {
        title: 'Housing and Environment',
        content:
          'Information on creating a safe and comfortable home environment for pets.\nHousing options for different species (e.g., crates, enclosures, cages, aquariums).\nTips on pet-proofing your home, including securing toxic substances and hazards.',
      },
      { title: '', content: '' },
    ],
  ];

  console.log(
    data[0].map((item) => {
      console.log('item', item.content);
    })
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setDetail((pre) => !pre);
      }}
    >
      <View style={styles.horizontal}>
        <View style={styles.horizontal}>
          <View style={styles.square}></View>
          <Text style={styles.title}>{title}</Text>
        </View>
        {detail ? (
          <Entypo
            name='chevron-up'
            size={scaleSize(21)}
            color={COLORS.grayPrimary}
          />
        ) : (
          <Entypo
            name='chevron-down'
            size={scaleSize(21)}
            color={COLORS.grayPrimary}
          />
        )}
      </View>

      {detail && <View style={styles.line}></View>}
      {detail &&
        data.map((handbook) =>
          handbook.map((item) => (
            <View>
              <Text style={styles.textTitle}>{item.title}</Text>
              <Text style={styles.textContent}>{item.content}</Text>
            </View>
          ))
        )}
    </TouchableOpacity>
  );
};

export default HandBookItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.tertiary,
    paddingHorizontal: scaleSize(17),
    paddingTop: scaleSize(22),
    minHeight: scaleSize(70),
    borderRadius: scaleSize(15),
    marginTop: scaleSize(16),
    width: '100%',
  },
  horizontal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  square: {
    width: scaleSize(27),
    height: scaleSize(27),
    backgroundColor: COLORS.primary,
    borderRadius: scaleSize(5),
  },
  title: {
    marginLeft: scaleSize(15),
    ...FONTS.h4,
    color: COLORS.blackPrimary,
  },
  textTitle: {
    ...FONTS.body4,
    fontWeight: '600',
    marginTop: scaleSize(10),
  },
  textContent: {
    ...FONTS.body6,
    marginTop: scaleSize(5),
  },
  line: {
    height: scaleSize(1),
    width: '100%',
    backgroundColor: COLORS.grayLight,
    marginTop: scaleSize(10),
  },
});
