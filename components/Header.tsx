import {Text, TouchableHighlight, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

// Header component that gets rendered at the top of the screen

export interface IHeaderProps {
  text: string;
  right?: any;
  onMenuOpen?: () => void;
}

export default function Header({text, right, onMenuOpen}: IHeaderProps) {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={['#FCFAF9', '#E8DCCA']}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#574031',
        backgroundColor: '#E8DCCA',
        borderStyle: 'dashed',
        zIndex: 120,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <TouchableHighlight
          underlayColor={'rgba(0,0,0,0.1)'}
          style={{borderRadius: 100}}
          onPress={() => navigation.goBack()}>
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
      </View>
      {right && (
        <TouchableHighlight
          underlayColor={'rgba(0,0,0,0.1)'}
          style={{borderRadius: 100}}
          onPress={onMenuOpen}>
          <Icon name={'menu'} size={30} color={'#574031'} />
        </TouchableHighlight>
      )}
    </LinearGradient>
  );
}
