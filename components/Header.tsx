import {Text, TouchableHighlight} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import LinearGradient from "react-native-linear-gradient";

export default function Header({navigation, text}: any){
    return (
    <LinearGradient
        colors={['#FCFAF9', '#E8DCCA']}
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 15,
          borderBottomWidth: 2,
          borderBottomColor: '#574031',
          backgroundColor: '#E8DCCA',
          borderStyle: 'dashed',
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
      </LinearGradient>
    );
}