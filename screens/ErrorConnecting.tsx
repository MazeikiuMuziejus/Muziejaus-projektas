import { View, Text, Pressable, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

export default function ErrorConnecting({forceUpdate}: {forceUpdate: () => void}){
        return (
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgb(255,255,255)',
                    flex: 1
                }}
            >
                <View
                    style={{
                        width: '100%',
                        height: '40%',
                        alignItems: 'center',
                    }}
                >
                    <FastImage
                        source={require('../static/Logo.png')}
                        style={{
                            width: 150,
                            height: 150,
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