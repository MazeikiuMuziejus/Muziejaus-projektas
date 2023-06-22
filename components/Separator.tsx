import {View, Text} from 'react-native';

// Dotted separator component

export interface ISeparatorProps {
  text: string;
}

export default function Separator({text}: ISeparatorProps) {
  return (
    <View
      style={{
        width: '100%',
        height: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
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
          fontSize: 25,
          position: 'absolute',
          width: 'auto',
          paddingHorizontal: 12,
        }}>
        {text}
      </Text>
    </View>
  );
}
