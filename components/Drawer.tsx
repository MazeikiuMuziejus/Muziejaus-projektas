import {useEffect, useState} from 'react';
import {Dimensions, Pressable} from 'react-native';

import {
  ScrollView,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

import ImageView from 'react-native-image-viewing';

import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {person} from '../types';

import {
  ImageCarousel,
  PointOfInterestInformation,
  Separator,
  ImageWithBlurhash,
} from './';

// Drawer component that is used to display information about a point of interest

export interface IDrawer {
  open: boolean;
  data: {
    nr: string;
    tekstas: string;
    zmones?: person[];
    coords: {
      lat: number;
      long: number;
    };
  };
  images: string[];
  onClose: () => void;
  blurhash: string;
}

export default function Drawer({
  open,
  data,
  images,
  onClose,
  blurhash,
}: IDrawer) {
  const w: number = Dimensions.get('window').width; // Width of the screen
  const h: number = Dimensions.get('window').height; // Height of the screen

  const MAX_HEIGHT: number = h / 2; // Max height of the drawer

  const [imageViewVisible, setImageViewVisible] = useState<boolean>(false); // Whether the large image viewer is visible
  const [imageIndex, setImageIndex] = useState<number>(0); // Index of the image in the carousel

  const context = useSharedValue({y: 0}); // Y context of the drawer
  const translateY = useSharedValue<number>(0); // Y translation of the drawer

  const setTranslateValue = (value: number) => {
    // Sets the Y translation of the drawer
    translateY.value = withSpring(value, {
      damping: 50,
    });
  };

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value}; // Sets the context to the current translation
    })
    .onUpdate(e => {
      translateY.value = e.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -MAX_HEIGHT); // Prevents the drawer from being dragged too far up
    })
    .onEnd(() => {
      if (translateY.value < -200) {
        // If the drawer is dragged less than 200px, bounce it back
        runOnJS(setTranslateValue)(-MAX_HEIGHT);
      } else {
        // Otherwise , close the drawer
        runOnJS(setTranslateValue)(0);
        runOnJS(onClose)();
      }
    });

  useEffect(() => {
    runOnJS(setTranslateValue)(open ? -MAX_HEIGHT : 0); // Opens the drawer if open is true, closes it otherwise
  }, [open]);

  const animatedStyle = useAnimatedStyle(() => {
    // Animated style for the drawer
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const renderImages = ({
    item,
    index,
  }: {
    // Renders the images in the carousel
    item: string;
    index: number;
  }) => {
    return (
      <Pressable
        onPress={() => {
          setImageViewVisible(true);
        }}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <ImageWithBlurhash
          image={item}
          key={index}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 10,
          }}
          blurhashStyle={{
            zIndex: 120,
          }}
          blurhash={blurhash}
        />
      </Pressable>
    );
  };

  return (
    <>
      {images && imageViewVisible && (
        <ImageView
          images={images.map(i => ({uri: i}))}
          imageIndex={imageIndex}
          visible={imageViewVisible}
          animationType="fade"
          onRequestClose={() => setImageViewVisible(false)}
        />
      )}
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              backgroundColor: '#E8DCCA',
              zIndex: 100,
              height: MAX_HEIGHT,
              width: w,
              top: h,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            },
            animatedStyle,
          ]}>
          <Separator text={data.nr} />
          <ScrollView
            style={{
              maxHeight: MAX_HEIGHT - 50, // Full height of the drawer - 50px for number header
            }}
            key={data.nr}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <ImageCarousel
              images={images}
              renderItem={renderImages}
              setSelectedImage={setImageIndex}
              selectedImage={imageIndex}
            />
            <PointOfInterestInformation data={data} />
          </ScrollView>
        </Animated.View>
      </GestureDetector>
    </>
  );
}
