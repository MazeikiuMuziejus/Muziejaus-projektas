import {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Text,
  View,
  Easing,
  Dimensions,
  Pressable,
} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';

import Carousel from 'react-native-reanimated-carousel';

import FastImage from 'react-native-fast-image';

import ImageView from 'react-native-image-viewing';

export const Drawer = ({
  open,
  style,
  data,
  images,
}: {
  open: boolean;
  style?: any;
  data: any;
  images: any[];
}) => {
  const openAnim = useRef(new Animated.Value(0)).current;
  const w = Dimensions.get('window').width;
  const carouselMode = images.length > 1 ? 'parallax' : undefined;
  const [visible, setVisible] = useState<boolean>(false);
  const [imageSource, setImageSource] = useState(images[0]);

  useEffect(() => {
    Animated.timing(openAnim, {
      toValue: open ? 400 : 0,
      duration: 450,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, [openAnim, open]);

  if (visible) {
    return (
      <ImageView
        images={[imageSource]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    );
  }

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
          flex: 1,
        }}>
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
          }}>
          <Carousel
            loop
            width={w}
            height={w / 2}
            autoPlay={false}
            data={images}
            mode={carouselMode}
            renderItem={({item}) => (
              <Pressable
                onPress={() => {
                  setVisible(true);
                  setImageSource(item);
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 5,
                }}>
                <FastImage
                  source={item}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 5,
                  }}
                  resizeMode={'cover'}
                />
              </Pressable>
            )}
          />
        </View>
      </ScrollView>
    </Animated.View>
  );
};
