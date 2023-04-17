import {View, Text} from 'react-native';

export function Separator({ style, text, w }: { style?: any, text?: string, w: number}){
    return (
      <View
        style={{
          width: '100%',
          height: 50,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            height: 50,
            borderBottomWidth: 2,
            borderBottomColor: '#574031',
            borderStyle: 'dashed',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            marginHorizontal: '5%',
          }}
        />
        <Text
          allowFontScaling={false}
          style={{
            color: 'black',
            backgroundColor: '#E8DCCA',
            textAlign: 'center',
            fontSize: 30,
            position: 'absolute',
            width: 120
          }}
        >
            Nr. {text}
        </Text>
      </View>
    )
}