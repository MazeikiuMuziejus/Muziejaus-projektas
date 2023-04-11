import {View} from 'react-native';

export function Separator({ style }: { style?: any}){
    return (
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <View
            style={{
              backgroundColor: '#3b3b3b',
              width: '90%',
              height: 1,
              ...style,
            }}
          />
        </View>
    )
}