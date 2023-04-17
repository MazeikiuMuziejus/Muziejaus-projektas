import {View, Text, Pressable, ScrollView} from 'react-native';

import FastImage from 'react-native-fast-image'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { TouchableOpacity } from 'react-native-gesture-handler';

import LinearGradient from 'react-native-linear-gradient';

import type { streetData } from '../types/streetData';

export default function MainScreen({navigation, data}: {navigation?: any; data: streetData}) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C3D3A4',
      }}>
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item, index) => (
          <TouchableOpacity activeOpacity={0.6} key={index}>
            <Pressable
              onPress={() =>
                navigation.navigate('Gatve', {
                  data: item.data,
                  initialCoords: item.initialCoords,
                  gatve: item.gatve,
                  images: item.images.streets
              })}
              style={{
                marginHorizontal: 5,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: 'rgba(0,0,0, 0.1)',
                marginVertical: 10,
                borderRadius: 5,
              }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      width: '100%',
                      marginVertical: 10,
                      color: 'white',
                      position: 'absolute',
                      left: 20,
                      fontSize: 21,
                      zIndex: 101
                    }}
                  >
                    {item.gatve}
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
                      borderRadius: 5
                    }}
                  />
                    <FastImage
                      source={{uri: item.images.button}}
                      defaultSource={require('../static/placeholder.jpg')}
                      style={{
                        width: '100%',
                        height: '100%',
                        paddingVertical: 60,
                        borderRadius: 5
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  <Icon color={'black'} size={20} name={'chevron-right'} />
            </Pressable>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}