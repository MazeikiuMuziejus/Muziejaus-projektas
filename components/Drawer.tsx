import {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Text,
  Easing,
  Dimensions,
  Pressable,
} from 'react-native';

import {ScrollView, Gesture, GestureDetector} from 'react-native-gesture-handler';

import Carousel from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';
import ImageView from 'react-native-image-viewing';

import { runOnJS } from 'react-native-reanimated';
import { Separator } from './Separator';

export const Drawer = ({
  open,
  setOpen,
  data,
  images,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any;
  images: string[];
}) => {
  const openAnim = useRef(new Animated.Value(0)).current;
  const w = Dimensions.get('window').width;

  const [imageViewVisible, setImageViewVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState<number>(0);

  const animateClose = () => {
    Animated.timing(openAnim, {
      toValue: 0,
      duration: 450,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.ease),
    }).start();
    setOpen(false);
  }

  const onSwipeDown = Gesture.Pan()
    .onEnd((e) => {
      if (e.velocityY > 0)
        runOnJS(animateClose)();
    })

  useEffect(() => {
    Animated.timing(openAnim, {
      toValue: open ? 400 : 0,
      duration: 450,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, [open]);

  if (imageViewVisible && images) {
    console.log(images);
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
        <Separator text={data.nr} w={w}/>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{
            flex: 1,
          }}>
            {images?.length > 0 && (
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
                renderItem={({item, index}) => (                
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
                        <FastImage
                          defaultSource={require('../assets/placeholder.jpg')}
                          source={{uri: item}}
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                          resizeMode={'cover'}
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
                  data.zmones.map((person: any, index: number) => (
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
