import {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Text,
  Easing,
  Dimensions,
  Pressable,
  BackHandler,
} from 'react-native';

import {ScrollView, Gesture, GestureDetector} from 'react-native-gesture-handler';

import Carousel from 'react-native-reanimated-carousel';
import ImageView from 'react-native-image-viewing';

import { runOnJS } from 'react-native-reanimated';
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
  const openAnim = useRef(new Animated.Value(0)).current; // Animation value
  const w = Dimensions.get('window').width; // Width of the screen

  const [imageViewVisible, setImageViewVisible] = useState(false);  // Whether the large image viewer is visible
  const [imageIndex, setImageIndex] = useState<number>(0);  // Index of the image in the carousel

  const animateClose = () => {    // Closes the drawer
    Animated.timing(openAnim, {
      toValue: 0,
      duration: 450,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.ease),
    }).start();
    setOpen(false);
  }

  const onSwipeDown = Gesture.Pan()  // Closes the drawer on swipe down
    .onEnd((e) => {
      if (e.velocityY > 0)
        runOnJS(animateClose)();
    })

  useFocusEffect(                   // Rewrites the back button to close the drawer
    useCallback(() => {
      const backHandler = () => {
        if (open) {
          animateClose();
          return true;
        }
        return false;
      }

      const sub = BackHandler.addEventListener('hardwareBackPress', backHandler);
      return () => sub.remove();
    }, [open])
  )

  useEffect(() => {               // Animates the drawer on open/close
    Animated.timing(openAnim, {
      toValue: open ? 400 : 0,
      duration: 450,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, [open]);

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
    <GestureDetector gesture={onSwipeDown}>
      <Animated.View
        style={{
          position: 'absolute',
          backgroundColor: '#E8DCCA',
          zIndex: 100,
          bottom: 0,
          width: '100%',
          height: 400,
          transform:[
            {
              translateY: openAnim.interpolate({
                inputRange: [0, 400],
                outputRange: [400, 0],
                extrapolate: 'clamp',
              })
            }
          ],
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
        }}>
        <Separator text={data.nr}/>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{
            flex: 1,
          }}>
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
