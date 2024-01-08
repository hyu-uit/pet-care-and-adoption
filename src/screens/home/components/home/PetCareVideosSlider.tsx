import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { scaleSize } from '../../../../utils/DeviceUtils';
import { COLORS } from '../../../../config';

const PetCareVideosSlider = () => {
  const carouselData = [
    {
      title: 'Slide 1',
      image:
        'https://images.unsplash.com/photo-1615751072497-5f5169febe17?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      title: 'Slide 2',
      image:
        'https://i.pinimg.com/736x/a0/b8/f9/a0b8f9f0626229914b1716a94d9533e8.jpg',
    },
    {
      title: 'Slide 3',
      image:
        'https://i.pinimg.com/originals/0f/3f/e4/0f3fe4c1901f2784b9e2a42b6b8b99db.jpg',
    },
    {
      title: 'Slide 4',
      image:
        'https://i.pinimg.com/736x/14/cc/8e/14cc8e5b7285693cf637aee8660d7ed1.jpg',
    },
    {
      title: 'Slide 5',
      image:
        'https://hips.hearstapps.com/goodhousekeeping/assets/17/30/pembroke-welsh-corgi.jpg',
    },
  ];

  const [activeSlide, setActiveSlide] = useState<number>(0);

  const renderCarouselItem = ({ item, index }) => {
    const isMainImage = index === activeSlide;

    return (
      <View
        style={[
          styles.slide,
          {
            height: isMainImage ? scaleSize(165) : scaleSize(140),
            width: isMainImage ? scaleSize(130) : scaleSize(103),
          },
        ]}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
    );
  };

  const carouselRef = React.useRef(null);

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={carouselData}
        renderItem={renderCarouselItem}
        sliderWidth={390}
        itemWidth={110}
        autoplay={true}
        loop={true}
        autoplayInterval={3000} // Adjust the interval for auto slide (in milliseconds)
        decelerationRate={'fast'} // Set the speed of the slide animation
      />
    </View>
  );
};

export default PetCareVideosSlider;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(25),
    width: '100%',
    height: scaleSize(170),
  },
  slide: {
    height: scaleSize(140),
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    borderRadius: scaleSize(20),
  },
});
