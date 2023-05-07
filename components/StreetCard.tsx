import { Pressable, Text } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";

import LinearGradient from "react-native-linear-gradient";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { streetData } from "../types/streetData";

import ImageWithBlurhash from "./ImageWithBlurhash";
import Animated, { useAnimatedStyle, useSharedValue, withSpring }from "react-native-reanimated";

export interface IStreetCardProps {
    item: streetData;
    index: number;
    navigation: any;
}

export default function StreetCard({item, index, navigation}: IStreetCardProps){
    const scaleVal = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
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
            <TouchableOpacity
                onPressIn={() => {
                    scaleVal.value = withSpring(0.95, {
                        stiffness: 200
                    });
                }}
                onPressOut={() => {
                    scaleVal.value = withSpring(1, {
                        stiffness: 200
                    });
                }}
                activeOpacity={0.6} 
                key={index} 
                containerStyle={{
                    marginVertical: 10,
                    borderRadius: 5,
                }}
            >
                <Pressable
                    onPress={() =>
                        navigation.navigate('Gatve', {
                        data: item.data,
                        initialCoords: item.initialCoords,
                        gatve: item.gatve,
                        images: item.images.houses
                        })
                    }
                    style={{
                        marginHorizontal: 5,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        backgroundColor: 'rgba(0,0,0, 0.1)',
                        borderRadius: 5,
                    }}
                >
                    <Text
                        allowFontScaling={false}
                        style={{
                            width: '100%',
                            marginVertical: 10,
                            color: 'white',
                            position: 'absolute',
                            left: 20,
                            fontSize: 21,
                            zIndex: 101,
                        }}
                    >
                        {item.gatve} {'g.'}
                    </Text>
                    <LinearGradient
                        start={{x: 0, y:0}}
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
                        image={item.images.button.img}
                        style={{
                            paddingVertical: 60,
                            borderRadius: 5,
                        }}
                        blurhashStyle={{
                            zIndex: 99
                        }}
                        blurhash={item.images.button.blurhash}
                    />
                    <Icon 
                        color={'white'} 
                        size={30} 
                        name={'chevron-right'} 
                        style={{
                            position: 'absolute',
                            right: 20,
                            zIndex: 101,
                        }} 
                    />
                </Pressable>
            </TouchableOpacity>
          </Animated.View>
    )
}