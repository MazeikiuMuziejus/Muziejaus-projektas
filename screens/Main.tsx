import {View, Text, SafeAreaView} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Button, PartnerLogo} from '../components';
import FastImage from 'react-native-fast-image';

// Main app screen

export default function Main() {
  const navigation = useNavigation(); // Navigation hook

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#9AABC4',
        justifyContent: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 30,
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
            borderLeftWidth: 3,
            borderLeftColor: '#574031',
            paddingLeft: 10,
          }}>
          Interaktyvus Mažeikių istorijos žemėlapis
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
          width: '100%',
        }}>
        <Button
          text="Žemėlapis"
          onPress={() => navigation.navigate('Map' as never)}
        />
        <Button
          text="Apie"
          onPress={() => navigation.navigate('About' as never)}
        />
        <View
          style={{
            justifyContent: 'center',
            width: '100%',
          }}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#574031',
              marginVertical: 20,
              textAlign: 'center',
            }}>
            Partneriai:
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            width: '100%',
          }}>
          <PartnerLogo
            logo={require('../assets/MuziejausLogo.png')}
            name={'Mažeikių muziejus'}
            url={'https://mazeikiumuziejus.lt/'}
          />
          <PartnerLogo
            logo={require('../assets/VizijaOptika.png')}
            name={'Vizija Optika'}
            url={'https://optikavizija.lt/'}
          />
          <PartnerLogo
            logo={require('../assets/MMRG.png')}
            name={'MMRG'}
            url={'https://rackauskas.lt/'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
