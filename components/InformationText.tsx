import { Text, View } from 'react-native';

export interface IInformationText {
    headerText: string;
    text: string[];
}

export default function InformationText({ headerText, text}: IInformationText){
    return (
        <>
            <Text
                allowFontScaling={false}
                style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#574031',
                    marginVertical: 20,
                }}
            >
                {headerText}
            </Text>
            <View>
                {text.length > 1 ? text.map((item, index) => {
                    return (
                        <Text 
                            key={index}
                            style={{
                                fontSize: 15,
                                color: '#574031',
                                paddingHorizontal: 10,
                                marginBottom: 5,
                            }}
                        >
                            {item}
                        </Text>
                    )
                }) : 
                <Text
                    style={{
                        fontSize: 15,
                        color: '#574031',
                        paddingHorizontal: 10
                    }}
                >
                    {text}
                </Text>
                }
            </View>
        </>
    )
}