import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import FastImage from 'react-native-fast-image';

// Screen that is shown when the app fails to fetch data

export interface IErrorConnectingProps {
  forceUpdate: () => void;
}

export default function ErrorConnecting({forceUpdate}: IErrorConnectingProps) {
  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9AABC4',
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 100,
        }}>
        <FastImage
          source={require('../assets/Herbas.png')}
          style={{
            width: 100,
            height: 100,
          }}
          resizeMode={FastImage.resizeMode.center}
        />
        <Text
          allowFontScaling={false}
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: '#574031',
            textAlign: 'left',
            maxWidth: 250,
            borderLeftWidth: 2,
            borderLeftColor: '#574031',
            paddingLeft: 10,
          }}>
          Interaktyvus Mažeikių istorijos žemėlapis
        </Text>
      </View>
      <Text
        allowFontScaling={false}
        style={{
          color: 'black',
          fontSize: 15,
        }}>
        Kažkas nepavyko.
      </Text>
      <TouchableOpacity
        style={{
          marginTop: 20,
        }}
        activeOpacity={0.6}>
        <Pressable
          onPress={() => forceUpdate()}
          style={{
            backgroundColor: 'rgba(0,0,0, 0.1)',
            borderRadius: 10,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            allowFontScaling={false}
            style={{
              color: 'black',
              fontSize: 15,
            }}>
            Bandyti dar kartą
          </Text>
        </Pressable>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
