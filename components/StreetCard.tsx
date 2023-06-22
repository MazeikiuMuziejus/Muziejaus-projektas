import {Pressable, View} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';

import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {ImageWithBlurhash} from './';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

// Street card component thats shows the street name and image

export interface IStreetCardProps {
  street: string;
  color: string;
  img: string;
  blurhash: string;
  index: number;
  shown: boolean;
  onPress: () => void;
}

export default function StreetCard({
  street,
  color,
  img,
  blurhash,
  shown,
  index,
  onPress,
}: IStreetCardProps) {
  const scaleVal = useSharedValue(1); // Animated scale value

  const animatedStyle = useAnimatedStyle(() => {
    // Style for onPress animation
    return {
      transform: [
        {
          scale: scaleVal.value,
        },
      ],
    };
  });

  return (
    <Animated.View style={[animatedStyle]}>
      <TouchableOpacity
        onPressIn={() => {
          scaleVal.value = withSpring(0.95, {
            // Animation on press
            stiffness: 200,
          });
        }}
        onPressOut={() => {
          scaleVal.value = withSpring(1, {
            // Animation on release
            stiffness: 200,
          });
        }}
        activeOpacity={0.6}
        key={index}
        containerStyle={{
          marginVertical: 10,
          borderRadius: 5,
        }}>
        <Pressable
          onPress={onPress}
          style={{
            marginHorizontal: 5,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: 'rgba(0,0,0, 0.1)',
            borderRadius: 5,
          }}>
          <View
            style={{
              position: 'absolute',
              zIndex: 102,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View>
              <Icon
                style={{position: 'absolute'}}
                size={40}
                name={'map-marker'}
                color={color}
              />
              <Icon size={40} name={'map-marker-outline'} color={'black'} />
            </View>
            <Animated.Text
              allowFontScaling={false}
              style={{
                width: '100%',
                marginVertical: 10,
                color: 'white',
                fontSize: 21,
                fontWeight: '500',
              }}>
              {street} {'g.'}
            </Animated.Text>
          </View>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['rgba(0, 0, 0, 0.5)', 'rgba(255, 255, 255, 0)']}
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              zIndex: 100,
              borderRadius: 5,
            }}
          />
          <ImageWithBlurhash
            image={img}
            style={{
              paddingVertical: 60,
              borderRadius: 5,
              opacity: shown ? 1 : 0.2,
            }}
            blurhashStyle={{
              zIndex: 99,
              opacity: shown ? 1 : 0.2,
            }}
            blurhash={blurhash}
          />
        </Pressable>
      </TouchableOpacity>
    </Animated.View>
  );
}
