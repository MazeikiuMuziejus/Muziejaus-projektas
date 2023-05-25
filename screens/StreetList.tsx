import {ScrollView, SafeAreaView} from 'react-native';

import { appData } from '../types';

import { StreetCard } from '../components';
import {useDataContext} from '../contexts/dataContext';

// Street list screen that shows all the streets

export interface IStreetListProps {
  navigation?: any;
}

export default function StreetList({navigation}: IStreetListProps) {
  const context = useDataContext();
  
  if (!context) return null; // If the data is not loaded, return null (this will show the loading screen

  const data: appData =  context.data;

  return (
    <SafeAreaView
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
    </SafeAreaView>
  );
}