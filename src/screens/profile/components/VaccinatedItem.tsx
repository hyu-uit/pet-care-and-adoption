import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { COLORS, FONTS } from '../../../config';
import { scaleSize } from '../../../utils/DeviceUtils';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

type VaccinatedItemProps = {
  date: string;
  note: string;
  detail?: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
};
const VaccinatedItem: FC<VaccinatedItemProps> = ({
  date,
  note,
  detail,
  onDelete,
  onEdit,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.date}>{date}</Text>
        <Text
          style={[
            styles.date,
            { marginLeft: scaleSize(10), color: COLORS.black2A3738 },
          ]}
        >
          {note}
        </Text>
      </View>
      {!detail && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: scaleSize(10),
          }}
        >
          <TouchableOpacity onPress={onEdit}>
            <MaterialIcons
              name='mode-edit'
              size={scaleSize(15)}
              color={COLORS.primary}
              style={{ marginRight: scaleSize(2) }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={onDelete}>
            <AntDesign
              name='delete'
              size={scaleSize(15)}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default VaccinatedItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleSize(10),
  },
  date: {
    ...FONTS.body5,
    color: COLORS.blackPrimary,
  },
});
