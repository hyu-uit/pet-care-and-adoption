import { View, Text, StyleSheet, Modal, Image } from 'react-native';
import React, { FC } from 'react';
import { scaleSize } from '../utils/DeviceUtils';
import { COLORS, IMAGES, SIZES, FONTS } from '../config';
import Button from './Button';
import { POPUP_TYPE } from '../types/enum/popup.enum';

type PopupProps = {
  open: boolean;
  title: string;
  content: string;
  type?: POPUP_TYPE;
  onCancel: () => void;
  onSubmit?: () => void;
  isLoading?: boolean;
};

const Popup: FC<PopupProps> = ({
  open,
  onCancel,
  onSubmit,
  title,
  content,
  type,
  isLoading,
}) => {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={open}
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Image
            source={
              type === POPUP_TYPE.SUCCESS
                ? IMAGES.SUCCESS_ICON
                : IMAGES.ERROR_ICON
            }
            style={styles.icon}
          />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{content}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button
              title={onSubmit ? 'Cancel' : 'OK'}
              onPress={onCancel}
              isLoading={false}
              style={{
                marginTop: scaleSize(40),
                marginBottom: scaleSize(23),
                width: onSubmit ? '48%' : '100%',
                backgroundColor: onSubmit ? COLORS.tertiary : COLORS.secondary,
              }}
              textStyle={{
                color: onSubmit ? COLORS.primary : COLORS.whitePrimary,
              }}
            />
            {onSubmit && (
              <Button
                title='OK'
                onPress={onSubmit}
                isLoading={isLoading}
                style={{
                  marginTop: scaleSize(40),
                  marginBottom: scaleSize(23),
                  width: '48%',
                }}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;

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
    backgroundColor: COLORS.whitePrimary,
    borderRadius: SIZES.radius,
    minHeight: scaleSize(275),
    paddingHorizontal: scaleSize(23),
    width: '100%',
  },
  icon: {
    width: scaleSize(106),
    height: scaleSize(106),
    resizeMode: 'contain',
    alignSelf: 'center',
    position: 'absolute',
    top: -scaleSize(36),
  },
  title: {
    ...FONTS.h2,
    marginTop: scaleSize(89),
    textAlign: 'center',
  },
  content: {
    ...FONTS.body3,
    color: COLORS.blackContent,
    marginTop: scaleSize(24),
    textAlign: 'center',
  },
});
