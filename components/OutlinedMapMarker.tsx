import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Displays an outlined map marker

export interface IOutlinedMapMarkerProps {
  color: string;
}

export default function OutlinedMapMarker({color}: IOutlinedMapMarkerProps) {
  return (
    <>
      <Icon
        style={{position: 'absolute'}}
        size={40}
        name={'map-marker'}
        color={color}
      />
      <Icon size={40} name={'map-marker-outline'} color={'black'} />
    </>
  );
}
