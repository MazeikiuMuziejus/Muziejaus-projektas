import {View, Dimensions} from 'react-native';

import Carousel from 'react-native-reanimated-carousel';

// Displays the carousel of images

export interface IImageCarouselProps {
  images: string[];
  selectedImage: number;
  setSelectedImage: (index: number) => void;
  renderItem: ({item, index}: {item: string; index: number}) => JSX.Element;
}

export default function ImageCarousel({
  images,
  setSelectedImage,
  selectedImage,
  renderItem,
}: IImageCarouselProps) {
  const w = Dimensions.get('window').width; // Width of the screen
  return (
    <>
      <Carousel
        key={JSON.stringify(images)}
        width={w}
        height={w / 2}
        autoPlay={false}
        style={{
          marginVertical: 10,
          borderRadius: 5,
          display: images.length >= 1 ? 'flex' : 'none',
          zIndex: 110,
        }}
        loop={false}
        data={images}
        snapEnabled
        enabled={images.length > 1}
        onProgressChange={(_, progress: number) => {
          if (progress <= images.length) setSelectedImage(Math.round(progress)); // Sets the selected image to the current image
        }}
        renderItem={renderItem}
      />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          display: images.length > 1 ? 'flex' : 'none',
        }}>
        {images.map((_, index) => {
          // Renders the carousel indicator if there are more than 1 images
          return (
            <View
              key={index}
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 5,
                backgroundColor:
                  selectedImage === index ? '#574031' : 'transparent',
                borderColor: '#574031',
                borderWidth: 1,
              }}
            />
          );
        })}
      </View>
    </>
  );
}
