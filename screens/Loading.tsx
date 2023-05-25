import { View, Text, ActivityIndicator, SafeAreaView } from 'react-native';

import FastImage from 'react-native-fast-image';

// Loading screen

export default function Loading(){
    return (
        <SafeAreaView
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#C3D3A4',
                flex: 1
            }}
        >
            <View
                style={{
                    alignItems: 'center',
                    borderWidth: 2,
                    borderRadius: 100,
                    borderStyle: 'dashed',
                    marginBottom: 40,
                }}
            >
                <FastImage
                    source={require('../assets/MuziejausLogo.png')}
                    style={{
                        width: 150,
                        height: 150,
                        borderColor: '#574031',
                        backgroundColor: '#E8DCCA',
                        borderRadius: 100,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </View>
            <ActivityIndicator size="large" color="black" />
            <Text
                allowFontScaling={false}
                style={{
                color: 'black',
                fontSize: 21,
                }}
            >
                Kraunama...
            </Text>
        </SafeAreaView>
    );
}