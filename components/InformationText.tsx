import {Text, View} from 'react-native';

import FastImage from 'react-native-fast-image';

// Displays the information text

export interface IInformationText {
  headerText: string;
  text: string[];
  img: number[];
}

export default function InformationText({
  headerText,
  text,
  img,
}: IInformationText) {
  return (
    <>
      <Text
        allowFontScaling={false}
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#574031',
          marginVertical: 10,
        }}>
        {headerText}
      </Text>
      <View>
        {text.length > 1 ? (
          text.map((item, index) => {
            // Renders the information text
            return (
              <View
                key={'text' + index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 15,
                    color: '#574031',
                    paddingHorizontal: 10,
                  }}>
                  {item}
                </Text>
                <FastImage
                  source={img[index]}
                  style={{
                    width: 25,
                    height: 25,
                  }}
                  resizeMode="contain"
                />
              </View>
            );
          })
        ) : (
          <View
            key={'text' + 0}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 15,
                color: '#574031',
                paddingHorizontal: 10,
              }}>
              {text}
            </Text>
            <FastImage
              source={img[0]}
              style={{
                width: 25,
                height: 25,
              }}
              resizeMode="contain"
            />
          </View>
        )}
      </View>
    </>
  );
}
