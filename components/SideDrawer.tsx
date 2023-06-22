import {useEffect} from 'react';
import {View, Text, Dimensions} from 'react-native';

import {
  Gesture,
  GestureDetector,
  ScrollView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {useDataContext} from '../contexts/dataContext';

import StreetCard from './StreetCard';

// Side drawer component that is used to display the list of streets

export interface ISideDrawer {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function SideDrawer({open, setOpen}: ISideDrawer) {
  const {removeStreet, streets} = useDataContext();

  const w = Dimensions.get('window').width; // Width of the screen
  const h = Dimensions.get('window').height; // Height of the screen

  const MAX_WIDTH: number = w * 0.75; // Max width of the drawer

  const context = useSharedValue({x: 0}); // X context of the drawer
  const translateX = useSharedValue<number>(MAX_WIDTH); // X translation of the drawer

  const setTranslateValue = (value: number) => {
    // Sets the X translation of the drawer
    translateX.value = withSpring(value, {
      damping: 50,
    });
  };

  const gesture = Gesture.Pan()
    .onStart(() => {
      // Sets the context value to the current translation of the drawer
      context.value = {x: translateX.value};
    })
    .onUpdate(e => {
      translateX.value = Math.max(0, context.value.x + e.translationX); // Prevents the drawer from being dragged too far to the left
    })
    .onEnd(() => {
      if (translateX.value < MAX_WIDTH / 2) {
        // If the drawer is dragged less than half way, keep it open
        runOnJS(setTranslateValue)(0);
      } else {
        // Otherwise , close the drawer
        runOnJS(setTranslateValue)(MAX_WIDTH);
        runOnJS(setOpen)(false);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    // Animated style for the drawer
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  useEffect(() => {
    runOnJS(setTranslateValue)(open ? 0 : MAX_WIDTH); // Opens the drawer if open is true, closes it otherwise
  }, [open]);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#E8DCCA',
            width: MAX_WIDTH,
            height: h - 60,
            zIndex: 110,
            position: 'absolute',
            right: 0,
            bottom: 0,
            paddingVertical: 20,
            paddingHorizontal: 5,
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
            shadowColor: '#000',
            elevation: 5,
          },
          animatedStyle,
        ]}>
        <View>
          <Text
            allowFontScaling={false}
            style={{
              width: '50%',
              alignSelf: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              color: '#574031',
              borderBottomColor: '#574031',
              borderBottomWidth: 2,
              borderStyle: 'dashed',
              marginBottom: 10,
            }}>
            Gatvių sąrašas
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 15,
              color: '#574031',
              fontWeight: 'normal',
              textAlign: 'center',
              marginBottom: 10,
              fontStyle: 'italic',
            }}>
            Paspauskite ant atitinkamos gatvės, kad išjungtumėte/įjungtumėte jos
            rodymą.
          </Text>
          <ScrollView>
            {streets.map((street, index) => (
              <StreetCard
                key={index}
                index={index}
                street={street.gatve}
                img={street.button.img}
                color={street.color}
                blurhash={street.button.blurhash}
                shown={street.shown}
                onPress={() => removeStreet(street.gatve)}
              />
            ))}
          </ScrollView>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}
