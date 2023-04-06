import {useEffect, useRef, useState} from 'react';
import {Animated, Text, View, Easing, Dimensions} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

import Carousel from 'react-native-reanimated-carousel';

import ImageModal from 'react-native-image-modal';

export const Drawer = ({
  open,
  style,
  data,
  images
}: {
  open: boolean;
  style?: any;
  data: any;
  images: any[]
}) => {
  const openAnim = useRef(new Animated.Value(0)).current;
  const w = Dimensions.get('window').width;
  const carouselMode = images.length > 1 ? 'parallax' : undefined
  const [selected, setSelected] = useState<number | null>(null)

  useEffect(() => {
    Animated.timing(openAnim, {
      toValue: open ? 400 : 0,
      duration: 450,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, [open]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        backgroundColor: 'white',
        zIndex: 100,
        bottom: 0,
        width: '100%',
        height: openAnim,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        ...style,
      }}>
        <View
          style={{
            width: '100%',
          }}>
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontSize: 30,
            }}>
            Nr. {data.nr}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}>
            <View
              style={{
                backgroundColor: '#3b3b3b',
                width: '90%',
                height: 1,
              }}
            />
          </View>
          <ScrollView
            style={{
              flex: 1
            }}
          >
          <View
            style={{
              width: '100%',
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                color: 'black',
                textAlign: 'justify',
              }}>
              {data.tekstas}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            <Carousel 
              loop
              width={w}
              height={w/2}
              autoPlay={false}
              data={images}
              mode={carouselMode}
              renderItem={({item}) =>(
                <ImageModal
                  resizeMode="cover"
                  modalImageResizeMode='contain'
                  modalImageStyle={{
                    width: '100%',
                  }}
                  style={{
                    width: '100%',
                    aspectRatio: 16/9,
                    borderRadius: 5
                  }}
                  onClose={() => setSelected(null)}
                  source={item}
                />)}
            />
          </View>
      </ScrollView>
    </Animated.View>
  );
};
