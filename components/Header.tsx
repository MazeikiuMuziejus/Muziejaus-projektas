import {Text, TouchableHighlight} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import LinearGradient from "react-native-linear-gradient";

// Header component that gets rendered at the top of the screen

export interface IHeaderProps {
    navigation: any;
    text: string;
}

export default function Header({navigation, text}: IHeaderProps){
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
          style={{ borderRadius: 100 }}
          onPress={() => navigation.goBack()}
        >
          <Icon name={'chevron-left'} size={30} color={'#574031'} />
        </TouchableHighlight>
        <Text
          allowFontScaling={false}
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#574031',
            marginLeft: 10,
        }}>
          {text} 
        </Text>
      </LinearGradient>
    );
}