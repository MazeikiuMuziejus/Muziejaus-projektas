import { View, Text, Linking } from 'react-native'
import { Button } from '../components/Button'

export default function About() {
  const year = new Date().getFullYear()

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#C3D3A4',
      }}
    >
      <View
        style={{
          width: '100%',
          paddingHorizontal: 40,
          paddingVertical: 20,
          justifyContent: 'flex-start',
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#574031',
            marginVertical: 20,
          }}
        >
          Šaltiniai:
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 40,
          paddingVertical: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          left
          text='Įvertinti programėlę'
          onPress={() => {}/*Linking.openURL(programėlės URL)*/}
        />
      </View>
      <Text
      allowFontScaling={false}
        style={{
          fontSize: 20,
          color: '#574031',
          position: 'absolute',
          bottom: 10,
          alignSelf: 'center',
        }}
      >
        {year}
      </Text>
    </View>
  )
}
