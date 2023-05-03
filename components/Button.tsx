import { Pressable, Text } from "react-native";

import LinearGradient from "react-native-linear-gradient";
import FastImage from "react-native-fast-image";

// Button component thats used in the main screen

export function Button ({text, onPress, textStyle, left}: {text: string; onPress: () => void; textStyle?: any; left?: boolean}) {
    const flowerLocation = {    // Location of the flower
        top: left ? -60 : -10,
        left: left ? -50 : 220,
        transform: [{
            rotate: left ? '0deg' : '160deg',
        }]
    };
    
    return (
        <Pressable
            style={{
                width: 300,
                height: 60,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 20,
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
                    padding: 15,
                    margin: 10,
                    width: 300,
                    height: 70,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 20,
                            textAlign: 'center',
                            ...textStyle,
                        }}
                    >
                        {text}
                    </Text>
            </LinearGradient>
        </Pressable>
    )
}