import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { scaleSize } from '../../../../utils/DeviceUtils';
import { COLORS, FONTS } from '../../../../config';
import YoutubePlayer from 'react-native-youtube-iframe';

const PetCareVideosSlider = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const videoData = [
    {
      link: 'https://www.youtube.com/watch?v=BH4rlk0NLkc',
      thumbnail:
        'https://drive.google.com/file/d/1WGsPkjUAaAK5_MRCyt-HXS_kq3bNSCMX/view?usp=drive_link',
      videoId: 'BH4rlk0NLkc',
      title: 'How to Gain the Trust of a Cat',
    },
    {
      link: 'https://www.youtube.com/watch?v=lrCFOlM8GnU',
      thumbnail:
        'https://drive.google.com/file/d/1DqYGGNUBE2rVMxurfFKgCgJZYBvVUSlU/view?usp=drive_link',
      videoId: 'lrCFOlM8GnU',
      title:
        'How to give a SUBCUTANEOUS INJECTION to a dog 🐶💉 | Step-by-Step Explanation',
    },
    {
      link: 'https://www.youtube.com/watch?v=m8WFxmGxatA',
      thumbnail:
        'https://drive.google.com/file/d/1dBwedmTA9hrha1rmLkPEvkeVqdESWHC3/view?usp=sharing',
      videoId: 'm8WFxmGxatA',
      title: 'Why Dogs Get Stuck After MATING - Breeding Explanation',
    },
    {
      link: 'https://www.youtube.com/watch?v=wI9xARUzo1E',
      thumbnail:
        'https://drive.google.com/file/d/1dATR4mWZ6SPHqiBhmg2zoA2Lzp6A3yBy/view?usp=drive_link',
      videoId: 'wI9xARUzo1E',
      title: 'How to Cut a Dogs Hair? 🐶 BASIC GROOMING Tutorial',
    },
    {
      link: 'https://www.youtube.com/watch?v=Rn1WnrH-pdw',
      thumbnail:
        'https://drive.google.com/file/d/1jab84Q0AtA32Z9-h-yNL3oI7vM6ygSQT/view?usp=drive_link',
      videoId: 'Rn1WnrH-pdw',
      title: 'How to Get a Cat to Like You | Lifehacker',
    },
  ];

  const YoutubeVideo = ({ videoId }) => {
    return (
      <YoutubePlayer
        height={'80%'}
        width={'100%'}
        play={true}
        videoId={videoId}
      />
    );
  };

  const renderCarouselItem = ({ item, index }) => {
    return (
      <>
        <YoutubeVideo videoId={item.videoId} />
        <Text style={styles.title}>{item.title}</Text>
      </>
    );
  };

  // const renderCarouselItem = ({ item, index }) => {
  //   return (
  //     <>
  //       <YoutubePlayer
  //         key={index}
  //         height={'80%'}
  //         width={'100%'}
  //         play={true}
  //         videoId={item.videoId}
  //       />
  //       <Text style={styles.title}>{item.title}</Text>
  //     </>
  //   );
  // };
  // const renderCarouselItem = ({ item, index }) => {
  //   const isMainImage = index === activeSlide;

  //   return (
  //     <View
  //       style={[
  //         styles.slide,
  //         {
  //           height: isMainImage ? scaleSize(165) : scaleSize(140),
  //           width: isMainImage ? scaleSize(130) : scaleSize(103),
  //         },
  //       ]}
  //     >
  //       <Image source={{ uri: item.image }} style={styles.image} />
  //     </View>
  //   );
  // };

  const carouselRef = React.useRef(null);

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={videoData}
        renderItem={renderCarouselItem}
        sliderWidth={390}
        itemWidth={390}
        autoplay={false}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
    </View>
  );
};

export default PetCareVideosSlider;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',

    marginTop: scaleSize(25),
    width: '100%',
    height: scaleSize(300),
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
  title: {
    ...FONTS.h5,
    textAlign: 'left',
    marginTop: scaleSize(10),
  },
});
