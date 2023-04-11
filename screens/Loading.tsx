import { View, Text, ActivityIndicator } from 'react-native';

import FastImage from 'react-native-fast-image';

export default function Loading(){
    
    return (
        <View
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgb(255,255,255)',
                flex: 1
            }}
        >
            <View
                style={{
                    width: '100%',
                    height: '40%',
                    alignItems: 'center',
                }}
            >
                <FastImage
                    source={require('../static/Logo.png')}
                    style={{
                        width: 150,
                        height: 150,
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
        </View>
    );
}