import {View, Text, Image, BackHandler} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Button } from '../components/Button';

export default function Main() {
    const navigation = useNavigation();

    const year = new Date().getFullYear();

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center'
            }}
        >
            <View
                style={{ 
                    height: '40%', 
                    padding: 70,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Image 
                    source={require('../static/Logo.png')}
                    style={{
                        width: 150,
                        height: 150,
                    }}
                />
            </View>
            <View>
                <Button buttonStyle={{
                    marginBottom: 20
                }} text='Mažeikių miesto gatvės' onPress={() => navigation.navigate("StreetList" as never)}/>
                <Button text='Iseiti' onPress={() => BackHandler.exitApp()}/>
            </View>
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row'
                }}
            >
                <Icon 
                    name={'copyright'}
                    size={15}
                    color={'black'}
                />
                <Text 
                    style={{
                        color: 'black',
                        fontStyle: 'italic'
                    }}
                >
                    {' '}Mažeikių muziejus - {year}
                </Text>
            </View>
        </View>
    );
}