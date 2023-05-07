import { View, Text, Pressable, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

// Screen that is shown when the app fails to fetch data

export interface IErrorConnectingProps {
    forceUpdate: () => void;
}

export default function ErrorConnecting({forceUpdate}: IErrorConnectingProps){
        return (
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#C3D3A4',
                    flex: 1
                }}
            >
                <View
                    style={{
                        alignItems: 'center',
                        borderWidth: 2,
                        borderRadius: 100,
                        borderStyle: 'dashed',
                        marginBottom: 40,
                    }}
                >
                    <FastImage
                        source={require('../assets/MuziejausLogo.png')}
                        style={{
                            width: 150,
                            height: 150,
                            borderColor: '#574031',
                            backgroundColor: '#E8DCCA',
                            borderRadius: 100,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </View>
                <Text
                    allowFontScaling={false}
                    style={{
                    color: 'black',
                    fontSize: 15,
                    }}
                >
                    Kažkas nepavyko.
                </Text>
                <TouchableOpacity 
                    style={{
                        marginTop: 20,
                    }}
                    activeOpacity={0.6}
                >
                    <Pressable
                        onPress={() => forceUpdate()}
                        style={{
                            backgroundColor: 'rgba(0,0,0, 0.1)',
                            borderRadius: 10,
                            padding: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            allowFontScaling={false}
                            style={{
                                color: 'black',
                                fontSize: 15,
                            }}
                        >
                            Bandyti dar kartą
                        </Text>
                    </Pressable>
                </TouchableOpacity>
            </View>
        );
}