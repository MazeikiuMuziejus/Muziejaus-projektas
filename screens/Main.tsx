import {View, Image, BackHandler, Text} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Button } from '../components/Button';
import PartnerLogo from '../components/PartnerLogo';

// Main app screen

export default function Main() {
    const navigation = useNavigation(); // Navigation hook

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: '#C3D3A4',
                justifyContent: 'center',
            }}
        >
            <Text
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
                    width: '100%',
                    marginTop: 20,
                }}
            >
                <Button left text='Istorinės vietos' onPress={() => navigation.navigate("StreetList" as never)}/>
                <Button text='Apie' onPress={() => navigation.navigate("Sources" as never)}/>
                <Button left text='Išeiti' onPress={() => BackHandler.exitApp()}/>
            </View>
            <View 
                style={{
                    justifyContent: 'flex-start',
                    width: '100%',
                    paddingHorizontal: 40,
                }}>
                <Text
                    allowFontScaling={false}
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#574031',
                        marginVertical: 20
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
                    name={'Beržūna'}
                    url={'https://berzuna.lt/'}
                />
            </View>
        </View>
    );
}