import { Pressable, Text } from "react-native";

import LinearGradient from "react-native-linear-gradient";

import FastImage from "react-native-fast-image";

import Animated, { 
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

// Button component thats used in the main screen

export default function Button ({text, onPress, textStyle, left}: {text: string; onPress: () => void; textStyle?: any; left?: boolean}) {
    const flowerLocation = {    // Location of the flower
        top: left ? -60 : -5,
        left: left ? -40 : 240,
        transform: [{
            rotate: left ? '0deg' : '160deg',
        }]
    };

    const scaleVal = useSharedValue(1);        // Animated values

    const animatedStyle = useAnimatedStyle(() => {  // Style for onPress animation
        return {
            transform: [
                {
                    scale: scaleVal.value
                }
            ]
        }
    })
    
    return (
        <Animated.View style={[animatedStyle]}>
            <Pressable
                style={{
                    width: '100%',
                    height: 60,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 20,
                }}
                onPressIn={() => {
                    scaleVal.value = withSpring(0.95);
                }}
                onPressOut={() => {
                    scaleVal.value = withSpring(1);
                }}
                onPress={onPress}
            >
                <FastImage 
                    source={require('../assets/flower.png')}
                    style={{
                        position: 'absolute',
                        width: 120,
                        height: 120,
                        zIndex: 100,
                        ...flowerLocation,
                    }}
                    resizeMode="contain"
                />
                <LinearGradient
                    colors={['#FCFAF9', '#C5A87F']}
                    style={{
                        borderRadius: 5,
                        elevation: 5,
                        margin: 10,
                        width: 300,
                        height: 70,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                        <Text
                            allowFontScaling={false}
                            style={{
                                color: '#574031',
                                fontSize: 20,
                                textAlign: 'center',
                                fontWeight: '600',
                                ...textStyle,
                            }}
                        >
                            {text}
                        </Text>
                </LinearGradient>
            </Pressable>
        </Animated.View>
    )
}