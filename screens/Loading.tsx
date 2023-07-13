import {View, Text, ActivityIndicator, SafeAreaView} from 'react-native';

import FastImage from 'react-native-fast-image';

// Loading screen

export default function Loading() {
  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9AABC4',
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 100,
        }}>
        <FastImage
          source={require('../assets/Herbas.png')}
          style={{
            width: 100,
            height: 100,
          }}
          resizeMode={FastImage.resizeMode.center}
        />
        <Text
          allowFontScaling={false}
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: '#574031',
            textAlign: 'left',
            maxWidth: 250,
            borderLeftWidth: 2,
            borderLeftColor: '#574031',
            paddingLeft: 10,
          }}>
          Interaktyvus Mažeikių istorijos žemėlapis
        </Text>
      </View>
      <ActivityIndicator size="large" color="black" />
      <Text
        allowFontScaling={false}
        style={{
          color: 'black',
          fontSize: 21,
        }}>
        Kraunama...
      </Text>
    </SafeAreaView>
  );
}
