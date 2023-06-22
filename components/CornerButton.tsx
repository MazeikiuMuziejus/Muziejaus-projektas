import {TouchableHighlight} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface ICornerButtonProps {
  onPress: () => void;
}

export default function CornerButton({onPress}: ICornerButtonProps) {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={{
        width: 60,
        height: 60,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#574031',
        borderStyle: 'dashed',
        backgroundColor: '#E8DCCA',
      }}
      containerStyle={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 15,
        borderRadius: 100,
        zIndex: 99,
        backgroundColor: '#E8DCCA',
        elevation: 5,
      }}
      underlayColor={'rgba(0,0,0,0.1)'}>
      <Icon size={30} name={'arrow-expand'} color={'#574031'} />
    </TouchableHighlight>
  );
}
