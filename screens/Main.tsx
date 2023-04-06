import {View, Text, Pressable, Image, BackHandler} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { TouchableOpacity } from 'react-native-gesture-handler';

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
                <TouchableOpacity activeOpacity={0.6}>
                    <Pressable
                        style={{
                            padding: 20,
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            borderRadius: 5,
                            marginBottom: 20
                        }}
                        onPress={() => navigation.navigate("StreetList" as never)}
                    >
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 20,
                                textAlign: 'center'
                            }}
                        >Mažeikių miesto gatvės</Text>
                    </Pressable>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6}>
                    <Pressable
                        style={{
                            padding: 20,
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            borderRadius: 5
                        }}
                        onPress={() => BackHandler.exitApp()}
                    >
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 20,
                                textAlign: 'center'
                            }}
                        >
                            Iseiti
                        </Text>
                    </Pressable>
                </TouchableOpacity>
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