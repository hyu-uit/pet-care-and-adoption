import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { FC, useState } from 'react';
import { scaleSize } from '../../../utils/DeviceUtils';
import { COLORS, SIZES, STYLES, FONTS } from '../../../config';
import { Dropdown } from 'react-native-element-dropdown';
import { MaterialIcons } from '@expo/vector-icons';
import Button from '../../../components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ButtonVariant } from '../../../enums/ButtonVariant.enum';

type VaccinatedModalProps = {
  open: boolean;
  onClose: () => void;
  update: ({ type, note, date }) => void;
};

const VaccinatedModal: FC<VaccinatedModalProps> = ({
  open,
  update,
  onClose,
}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [note, setNote] = useState<string>('');
  const [type, setType] = useState<{ value: number; label: string }>();

  const convertDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const addVaccination = () => {
    update({ type: type, note: note, date: convertDate(date) });
    setDate(new Date());
    setNote('');
    setType(null);
  };

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={open}
      onRequestClose={() => {}}
    >
      <DateTimePicker value={new Date()} />
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Dropdown
            data={[
              { value: 0, label: 'Add to history' },
              { value: 1, label: 'Next vaccination' },
            ]}
            labelField={'label'}
            valueField={'value'}
            placeholderStyle={{ color: COLORS.grayPrimary }}
            placeholder='Select type of vaccination'
            style={[
              styles.input,
              { paddingLeft: scaleSize(20), marginTop: scaleSize(10) },
            ]}
            value={type}
            onChange={(value) => {
              setType(value);
            }}
            containerStyle={{
              minHeight: scaleSize(100),
              borderRadius: scaleSize(10),
            }}
          />
          <View
            style={{
              width: '50%',
              alignSelf: 'center',
              height: scaleSize(1),
              backgroundColor: COLORS.grayPrimary,
              marginTop: scaleSize(10),
            }}
          ></View>
          <Text style={styles.title}>Note</Text>
          <TextInput
            placeholder={`Vaccinated notes`}
            onChangeText={(value) => {
              setNote(value);
            }}
            secureTextEntry={false}
            value={note}
            placeholderTextColor={COLORS.grayC2C2CE}
            style={[
              styles.input,
              { marginTop: scaleSize(5), paddingLeft: scaleSize(20) },
            ]}
          />
          <Text style={styles.title}>Date</Text>
          <DateTimePicker
            testID='dateTimePicker'
            value={date}
            mode='date'
            is24Hour={true}
            display='calendar' // Set display to 'calendar' to show only the date picker
            onChange={(value) => {
              setDate(new Date(value.nativeEvent.timestamp));
              // setDate(new Date(value.nativeEvent.timestamp));
            }}
          />
          {/* <View>
            <TextInput
              value='28/11/2023'
              onChangeText={() => {}}
              secureTextEntry={false}
              placeholderTextColor={COLORS.grayC2C2CE}
              style={[
                styles.input,
                {
                  marginTop: scaleSize(5),
                  paddingLeft: 0,
                  textAlign: 'center',
                },
              ]}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: scaleSize(10),
                top: scaleSize(15),
              }}
            >
              <MaterialIcons
                name='date-range'
                size={scaleSize(24)}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View> */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: scaleSize(20),
            }}
          >
            <TouchableOpacity style={styles.outlined} onPress={onClose}>
              <Text style={styles.sent}>Cancel</Text>
            </TouchableOpacity>

            <Button
              variant={
                type && note !== ''
                  ? ButtonVariant.ACTIVE
                  : ButtonVariant.DISABLE
              }
              onPress={addVaccination}
              title={'Update'}
              isLoading={false}
              style={{ width: scaleSize(140) }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default VaccinatedModal;

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
  input: {
    ...STYLES.input,
    paddingLeft: scaleSize(58),
  },
  title: {
    ...FONTS.body2,
    fontWeight: '600',
    marginTop: scaleSize(10),
  },
  outlined: {
    backgroundColor: COLORS.tertiary,
    width: scaleSize(140),
    height: scaleSize(50),
    borderRadius: scaleSize(17),
    borderWidth: scaleSize(1),
    borderColor: COLORS.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sent: {
    ...FONTS.h1,
    fontSize: scaleSize(17),
    fontWeight: '800',
    lineHeight: scaleSize(27.2),
    color: COLORS.primary,
  },
});
