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

const PetCareHandBookScreen = () => {
  const [tab, setTab] = useState(0);
  const data = [
    'Pet care',
    'Pet care',
    'Pet care',
    'Pet care',
    'Pet care',
    'Pet care',
    'Pet care',
    'Pet care',
    'Pet care',
  ];

  const renderItem = ({ item }) => {
    return <HandBookItem title={item} />;
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setTab(0)} style={styles.tabWrapper}>
          <Image source={IMAGES.BOOK} style={styles.icon} />
          <Text style={styles.tabText}>Hand book</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab(1)} style={styles.tabWrapper}>
          <Image source={IMAGES.BOT} style={styles.icon} />
          <Text style={styles.tabText}>Bot advices</Text>
        </TouchableOpacity>
      </View>
      {tab === 0 &&
      <FlatList
        data={data}
        keyExtractor={(item) => item.title}
        renderItem={renderItem} //method to render the data in the way you want using styling u need
        horizontal={false}
        numColumns={2}
        style={{ marginTop: scaleSize(20) }}
      />
    }
    {tab ===1 &&
     <BotService/>
    }
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
