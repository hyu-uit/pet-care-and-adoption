import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { scaleSize } from '../../../../utils/DeviceUtils';
import { COLORS, IMAGES } from '../../../../config';

const Banner = () => {
  const carouselData = [
    IMAGES.BANNER_1,
    IMAGES.BANNER_2,
    IMAGES.BANNER_3,
    IMAGES.BANNER_4,
  ];

  const [activeSlide, setActiveSlide] = React.useState(0);

  const renderCarouselItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={carouselData}
        renderItem={renderCarouselItem}
        sliderWidth={scaleSize(342)}
        itemWidth={scaleSize(342)}
        onSnapToItem={(index) => setActiveSlide(index)} // Update the active slide index
        autoplay={true} // Enable auto slide
        loop={true} // Loop through slides
        autoplayInterval={5000} // Set the interval for auto slide (in milliseconds)
        layout='default' // Set the layout type
      />
      <Pagination
        dotsLength={carouselData.length}
        activeDotIndex={activeSlide}
        dotStyle={styles.paginationDot}
        inactiveDotStyle={styles.inactivePaginationDot}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.8}
      />
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(25),
    width: '100%',
  },
  slide: {
    height: scaleSize(119),
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  paginationDot: {
    width: scaleSize(6),
    height: scaleSize(6),
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  inactivePaginationDot: {
    backgroundColor: 'gray',
  },
});
