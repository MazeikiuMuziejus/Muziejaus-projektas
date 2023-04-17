import {View, Image, BackHandler} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Button } from '../components/Button';

export default function Main() {
    const navigation = useNavigation();

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: '#C3D3A4',
                justifyContent: 'center',
            }}
        >
            <View style={{justifyContent: 'center'}}>
                <View
                    style={{ 
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 2,
                        borderRadius: 100,
                        borderStyle: 'dashed'
                    }}
                >
                    <Image 
                        source={require('../assets/Logo.png')}
                        style={{
                            width: 150,
                            height: 150,
                            borderColor: '#574031',
                            backgroundColor: '#E8DCCA',
                            borderRadius: 100,
                        }}
                    />
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 200,
                    width: '100%',
                    marginTop: 20,
                }}
            >
                <Button left text='Mažeikių miesto gatvės' onPress={() => navigation.navigate("StreetList" as never)}/>
                <Button text='Iseiti' onPress={() => BackHandler.exitApp()}/>
            </View>
        </View>
    );
}