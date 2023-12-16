import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import React, { FC } from 'react';
import { scaleSize } from '../../../../utils/DeviceUtils';
import { COLORS, IMAGES, FONTS } from '../../../../config';
import { CATEGORY } from '../../../../types/enum/category.enum';

type CategoryItemProps = {
  type: CATEGORY;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const CategoryItem: FC<CategoryItemProps> = ({ type, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {type !== CATEGORY.ALL && type !== CATEGORY.OTHER && (
        <Image
          source={type === CATEGORY.CAT ? IMAGES.CAT : IMAGES.DOG}
          style={styles.icon}
        />
      )}
      {type !== CATEGORY.DOG && type !== CATEGORY.CAT && (
        <Text style={styles.title}>
          {type === CATEGORY.ALL ? 'All' : 'Others'}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    width: scaleSize(60),
    height: scaleSize(60),
    borderRadius: scaleSize(15),
    backgroundColor: COLORS.tertiary,
    borderWidth: scaleSize(1),
    borderColor: COLORS.grayLight,
    marginRight: scaleSize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: scaleSize(50),
    height: scaleSize(50),
    resizeMode: 'contain',
  },
  title: {
    ...FONTS.body5,
    color: COLORS.primary,
  },
});
