import {Text, View, TouchableHighlight} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Header({navigation, text}: any){
    return (
    <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 15,
          backgroundColor: 'white',
          borderBottomWidth: 1,
            borderBottomColor: 'rgba(0,0,0,0.1)',
          zIndex: 100,
        }}>
        <TouchableHighlight
          underlayColor={'rgba(0,0,0,0.1)'}
          style={{
            borderRadius: 100,
          }}
          onPress={() => navigation.goBack()}>
          <Icon name={'chevron-left'} size={30} color={'black'} />
        </TouchableHighlight>
        <Text
          allowFontScaling={false}
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            marginLeft: 10,
          }}>
          {text} 
        </Text>
        <Icon name={'chevron-left'} size={30} color={'transparent'} />
      </View>
    );
}