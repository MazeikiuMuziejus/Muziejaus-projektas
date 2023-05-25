import {View, BackHandler, Text, SafeAreaView} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Button, PartnerLogo } from '../components';

// Main app screen

export default function Main() {
    const navigation = useNavigation(); // Navigation hook

    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: '#C3D3A4',
                justifyContent: 'center',
            }}
        >
            <Text
                allowFontScaling={false}
                style={{
                    fontSize: 40,
                    fontWeight: 'bold',
                    color: '#574031',
                    marginVertical: 20,
                    textAlign: 'center',
                }}
            >
                Mažeikių Istorija
            </Text>
            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    width: '100%',
                }}
            >
                <Button left text='Istorinės vietos' onPress={() => navigation.navigate("StreetList" as never)}/>
                <Button text='Apie' onPress={() => navigation.navigate("About" as never)}/>
                <Button left text='Išeiti' onPress={() => BackHandler.exitApp()}/>
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
                        }}
                    >
                        Partneriai:
                    </Text>
                </View>
                <View
                    style={{
                        justifyContent: 'space-evenly',
                        flexDirection: 'row',
                        width: '100%',
                    }}
                >
                    <PartnerLogo 
                        logo={require('../assets/MuziejausLogo.png')}
                        name={'Mažeikių muziejus'}
                        url={'https://mazeikiumuziejus.lt/'}
                    />
                    <PartnerLogo 
                        logo={require('../assets/BerzunaLogo.png')}
                        name={'UAB Beržūna'}
                        url={'https://berzuna.lt/'}
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