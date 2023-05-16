import {View, Text} from 'react-native';

// Dotted separator component

export interface ISeparatorProps {
  text: string;
}

// Regex for house numbers
const houseNumberRegex = new RegExp('^[1-9]\d*(?:[ -]?(?:[a-zA-Z]|[1-9]\d*(?:\s*[/-]\s*\d+[a-z]?)?))?[^\S\r\n]*$');

export default function Separator({text}: ISeparatorProps){
    const isHouseNumber = houseNumberRegex.test(text);  // Checks if the text is a valid house number
    return (
      <View
        style={{
          width: '100%',
          height: 50,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            height: 50,
            borderBottomWidth: 2,
            borderBottomColor: '#574031',
            borderStyle: 'dashed',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            marginHorizontal: '5%',
          }}
        />
        <Text
          allowFontScaling={false}
          style={{
            color: 'black',
            backgroundColor: '#E8DCCA',
            textAlign: 'center',
            fontSize: 30,
            position: 'absolute',
            width: 'auto',
            paddingHorizontal: 12,
          }}
        >
          {isHouseNumber ? 'Nr. ' + text : text}
        </Text>
      </View>
    )
}