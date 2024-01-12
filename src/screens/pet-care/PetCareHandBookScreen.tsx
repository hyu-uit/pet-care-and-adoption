import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, IMAGES, SIZES, FONTS } from '../../config';
import { scaleSize } from '../../utils/DeviceUtils';
import { SafeAreaView } from 'react-native-safe-area-context';
import HandBookItem from './components/HandBookItem';
import BotService from './components/BotService';
import { HandBook } from '../../constants/Handbook.constant';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigation } from '@react-navigation/native';
import { SCREEN } from '../../navigators/AppRoute';

const PetCareHandBookScreen = () => {
  const [tab, setTab] = useState(0);
  const handbookData = HandBook;
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return <HandBookItem bigTitle={item.bigTitle} sections={item.sections} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setTab(0)}
          style={[
            styles.tabWrapper,
            {
              backgroundColor: tab === 0 ? COLORS.primary : COLORS.transparent,
              borderColor: tab === 0 ? COLORS.transparent : COLORS.grayLight,
              borderWidth: tab === 0 ? 0 : scaleSize(1),
            },
          ]}
        >
          <Image source={IMAGES.BOOK} style={styles.icon} />
          <Text
            style={[
              styles.tabText,
              { color: tab === 0 ? COLORS.whitePrimary : COLORS.primary },
            ]}
          >
            Hand book
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(SCREEN.BOT_CHAT);
          }}
          style={[
            styles.tabWrapper,
            {
              backgroundColor: tab === 1 ? COLORS.primary : COLORS.transparent,
              borderColor: tab === 1 ? COLORS.transparent : COLORS.grayLight,
              borderWidth: tab === 1 ? 1 : scaleSize(1),
            },
          ]}
        >
          <Image source={IMAGES.BOT} style={styles.icon} />
          <Text
            style={[
              styles.tabText,
              { color: tab === 1 ? COLORS.whitePrimary : COLORS.primary },
            ]}
          >
            Bot advices
          </Text>
        </TouchableOpacity>
      </View>
      {tab === 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={handbookData}
          keyExtractor={(item) => item.title}
          renderItem={renderItem} //method to render the data in the way you want using styling u need
          horizontal={false}
          style={{ marginTop: scaleSize(20) }}
          ListFooterComponent={
            <View style={{ marginBottom: SIZES.bottomPadding }}></View>
          }
        />
      )}
      {/* {tab === 1 && <BotService />} */}
    </SafeAreaView>
  );
};

export default PetCareHandBookScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.padding,
    paddingTop: scaleSize(20),
  },
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: scaleSize(16),
  },
  tabWrapper: {
    width: scaleSize(163),
    height: scaleSize(43),
    borderRadius: scaleSize(10),
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    width: scaleSize(22),
    height: scaleSize(22),
    resizeMode: 'contain',
  },
  tabText: {
    ...FONTS.body5,
    fontWeight: '600',
    color: COLORS.whitePrimary,
    marginLeft: scaleSize(5),
  },
});
