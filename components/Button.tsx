import { TouchableOpacity } from "react-native-gesture-handler";

import { Pressable, Text, } from "react-native";

export function Button ({text, onPress, textStyle, buttonStyle}: {text: string; onPress: () => void; textStyle?: any; buttonStyle?: any}) {
    return (
        <TouchableOpacity activeOpacity={0.6}>
            <Pressable
                style={{
                    padding: 20,
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: 5,
                    ...buttonStyle,
                }}
                onPress={() => onPress()}
            >
                <Text
                    style={{
                        color: 'black',
                        fontSize: 20,
                        textAlign: 'center',
                        ...textStyle,
                    }}
                >
                    {text}
                </Text>
            </Pressable>
        </TouchableOpacity>
    )
}