import React from 'react';
import { Image, Modal, StyleSheet, Text, View } from 'react-native';
import { scaleSize } from '../../../../utils/DeviceUtils';
import { COLORS, SIZES, FONTS } from '../../../../config';
import Button from '../../../../components/Button';
import { MaterialIcons } from '@expo/vector-icons';

type PredictModalProps = {
  open: boolean;
  onClose: () => void;
  data: { speciesLabels: string[]; speciesScores: number[] };
  uri: string;
};

function PredictModal({ open, onClose, data, uri }: PredictModalProps) {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={open}
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={{ ...FONTS.h3, marginBottom: 20 }}>
            Animal Prediction
          </Text>
          <Image
            source={{ uri: uri }}
            style={{
              width: '100%',
              aspectRatio: 1,
              borderRadius: 10,
              backgroundColor: COLORS.background,
              marginBottom: 10,
            }}
          />
          <View style={{ width: '100%', gap: 10 }}>
            {data &&
              data.speciesLabels?.map((item, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 2,
                      flex: 1,
                    }}
                  >
                    <MaterialIcons
                      name='pets'
                      size={20}
                      color={COLORS.secondary}
                    />
                    <Text style={[styles.name, { flex: 1 }]}>{item}</Text>
                  </View>
                  <Text style={styles.score}>
                    {(data.speciesScores[index] * 100).toFixed(3)}%
                  </Text>
                </View>
              ))}
          </View>
          <Button
            title='Close'
            onPress={onClose}
            isLoading={false}
            style={{ marginTop: 20, backgroundColor: COLORS.secondary }}
          />
        </View>
      </View>
    </Modal>
  );
}

export default PredictModal;

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
    alignItems: 'center',
  },
  name: {
    ...FONTS.h5,
    color: COLORS.primary,
  },
  score: {
    ...FONTS.body4,
    color: COLORS.grayPrimary,
  },
});
