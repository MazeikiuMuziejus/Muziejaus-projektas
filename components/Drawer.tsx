import {useCallback, useEffect, useState} from 'react';
import {
  Text,
  Dimensions,
  Pressable,
  BackHandler,
} from 'react-native';

import Animated, { withSpring } from 'react-native-reanimated';

import {ScrollView, Gesture, GestureDetector} from 'react-native-gesture-handler';

import Carousel from 'react-native-reanimated-carousel';
import ImageView from 'react-native-image-viewing';

import { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Separator } from './Separator';
import { useFocusEffect } from '@react-navigation/native';

import ImageWithBlurhash from './ImageWithBlurhash';

import { houseData } from '../types/houseData';
import { person } from '../types/person';

export const Drawer = ({
  open,
  setOpen,
  data,
  images,
  blurhash
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: houseData;
  images: string[];
  blurhash: string;
}) => {
  const w = Dimensions.get('window').width; // Width of the screen
  const h = Dimensions.get('window').height; // Height of the screen

  const MAX_HEIGHT = h / 2;  // Max height of the drawer

  const [imageViewVisible, setImageViewVisible] = useState(false);  // Whether the large image viewer is visible
  const [imageIndex, setImageIndex] = useState<number>(0);  // Index of the image in the carousel

  const context = useSharedValue({y: 0})
  const translateY = useSharedValue(0);

  const setTranslateValue = (value: number) => {
    translateY.value = withSpring(value, {
      damping: 50,
    });
  }

  const gesture = Gesture.Pan()
  .onStart(() => {
    context.value = {y: translateY.value};
  })
  .onUpdate((e) => {
    translateY.value = e.translationY + context.value.y;
    translateY.value = Math.max(translateY.value, -MAX_HEIGHT); // Prevents the drawer from being dragged too far up
  })
  .onEnd(() => {
      if (translateY.value < -200) { // If the drawer is dragged less than 200px, bounce it back
        runOnJS(setTranslateValue)(-MAX_HEIGHT)
      } else {  // Otherwise , close the drawer
        runOnJS(setTranslateValue)(0)
        runOnJS(setOpen)(false);
      }
  })

  useEffect(() => {
    runOnJS(setTranslateValue)(open ? -MAX_HEIGHT : 0)
  }, [open])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        }
      ]
    }
  })

  useFocusEffect(                   // Rewrites the back button to close the drawer
    useCallback(() => {
      const backHandler = () => {
        if (open) {
          setOpen(false);
          return true;
        }
        return false;
      }

      const sub = BackHandler.addEventListener('hardwareBackPress', backHandler);
      return () => sub.remove();
    }, [open])
  )

  if (imageViewVisible && images) {           // Renders large image viewer
    return (
      <ImageView
        images={images.map((i) => ({uri: i}))}
        imageIndex={imageIndex}
        visible={imageViewVisible}
        animationType='fade'
        onRequestClose={() => setImageViewVisible(false)}
      />
    );
  }

  return (
    <GestureDetector
      gesture={gesture}
    >
      <Animated.View
        style={[{
          position: 'absolute',
          backgroundColor: '#E8DCCA',
          zIndex: 100,
          height: MAX_HEIGHT,
          top: h,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }, animatedStyle]}>
        <Separator text={data.nr}/>
        <ScrollView
          style={{
            maxHeight: MAX_HEIGHT - 50,
            // Full height of the drawer - 350px for the separator and 50px for number header
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
            {images?.length > 0 && (   // Renders carousel if there are images
              <Carousel
                width={w}
                height={w / 2}
                autoPlay={false}
                style={{
                  marginVertical: 10,
                  borderRadius: 5,
                  elevation: 5,
                }}
                data={images}
                enabled={images.length > 1}
                renderItem={({item, index}) => (        // Renders images          
                    <Pressable
                      onPress={() => {
                        setImageViewVisible(true);
                        setImageIndex(index);
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                      }}>
                        <ImageWithBlurhash
                          image={item}
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                          blurhashStyle={{
                            zIndex: 110,
                          }}
                          blurhash={blurhash}
                        />
                    </Pressable>
                )}
              />
            )}
            <Text
              allowFontScaling={false}
              style={{
                color: 'black',
                textAlign: 'left',
                fontSize: 20,
                paddingHorizontal: 10,
                marginVertical: 10,
                fontStyle: 'italic',
                fontWeight: 'bold',
              }}
            >
              Aprašymas:
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                color: 'black',
                textAlign: 'justify',
                width: '100%',
                paddingHorizontal: 10,
                paddingBottom: 15,
                fontSize: 15,

              }}
            >
              {data.tekstas}
            </Text>
              {data.zmones && <> 
                <Text
                  allowFontScaling={false}
                  style={{
                    color: 'black',
                    textAlign: 'left',
                    fontSize: 20,
                    paddingHorizontal: 10,
                    marginVertical: 10,
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                  }}
                >
                  Žymūs žmonės:
                </Text>
                {
                  data.zmones.map((person: person, index: number) => ( // Renders famous people
                    <>
                      <Text 
                        allowFontScaling={false}
                        style={{
                          color: 'black',
                          textAlign: 'justify',
                          width: '100%',
                          paddingHorizontal: 10,
                          paddingBottom: 8,
                          fontSize: 17,
                          fontWeight: "500"

                        }}
                      >
                        {person.vardas}
                      </Text>
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: 'black',
                          textAlign: 'justify',
                          width: '100%',
                          paddingHorizontal: 10,
                          paddingBottom: 15,
                          fontSize: 15,
          
                        }}
                      >
                        {person.tekstas}
                      </Text>
                  </>
                  ))
                }
                </>
              }
        </ScrollView>
      </Animated.View>
    </GestureDetector>
  );
};
