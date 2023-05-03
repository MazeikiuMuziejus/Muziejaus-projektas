import {View, ScrollView} from 'react-native';

import type { appData } from '../types/appData';

import StreetCard from '../components/StreetCard';

// Street list screen that shows all the streets

export interface IStreetListProps {
  navigation?: any;
  data: appData;
}

export default function StreetList({navigation, data}: IStreetListProps) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C3D3A4',
      }}>
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item, index) => (  // Map through the data and render the street cards
          <StreetCard key={index} item={item} index={index} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
}