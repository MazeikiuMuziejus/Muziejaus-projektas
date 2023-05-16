import { View, Text, Pressable, Linking } from 'react-native';

import FastImage from 'react-native-fast-image';

export interface IPartnerLogoProps {
    logo: any;
    name: string;
    url?: string;
}

// Partner logo component that shows the logo and name of the partner

export default function PartnerLogo({logo, name, url = ""}: IPartnerLogoProps){
    return(
        <View
            style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Pressable
                onPress={() => Linking.openURL(url)}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderRadius: 100,
                    borderStyle: 'dashed',
                    borderColor: '#574031',
                    padding: 5
                }}
            >
                <FastImage 
                    source={logo}
                    style={{
                        width: 100,
                        height: 100,
                        backgroundColor: '#E8DCCA',
                        borderRadius: 100,
                    }}
                    resizeMode='center'
                />
            </Pressable>
            <Text
                allowFontScaling={false}
                style={{
                    fontSize: 15,
                    color: '#574031',
                    marginVertical: 5,
                    fontWeight: 'bold',
                    fontStyle: 'italic'
                }}
            >
                {name}
            </Text>
        </View>
    )
}