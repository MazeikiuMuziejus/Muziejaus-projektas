import {useRef, useState} from 'react';

import {View, Text, TouchableHighlight} from 'react-native';

import MapView, {Marker} from 'react-native-maps-osmdroid';

import {Drawer} from '../components/Drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function GatvesVaizdas({route, navigation}: any) {
  const {data, initialCoords, gatve, images} = route.params;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerDataIndex, setDrawerDataIndex] = useState<number>(0);

  const mapView = useRef(null);

  const markers = data.map((marker: any, index: number) => {
    return {
      id: `${index}`,
      coordinate: {
        latitude: marker.coords.lat,
        longitude: marker.coords.long,
      },
    };
  });

  return (
    <>
      <Drawer open={drawerOpen} data={data[drawerDataIndex]} images={images[data[drawerDataIndex].nr]}/>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 15,
          backgroundColor: 'white',
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
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            marginLeft: 10,
          }}>
          {gatve} g.
        </Text>
        <Icon name={'chevron-left'} size={30} color={'transparent'} />
      </View>
      <MapView
        ref={mapView}
        onPress={() => setDrawerOpen(false)}
        moveOnMarkerPress={false}
        loadingEnabled
        maxZoomLevel={20}
        style={{
          height: '100%',
          aspectRatio: 1 / 1,
        }}
        initialRegion={{
          latitude: parseFloat(initialCoords.lat + 0.001),
          longitude: parseFloat(initialCoords.long + 0.011),
          latitudeDelta: 0.022,
          longitudeDelta: 0.022,
        }}>
        {markers.map((marker: any, index: number) => (
          <Marker
            accessibilityRole="button"
            accessibilityLabel={`${gatve} g. ${data[index].nr}`}
            id={marker.id}
            onPress={() => {
              if (drawerOpen) setDrawerDataIndex(index);
              else {
                setDrawerOpen(true);
                setDrawerDataIndex(index);
              }
            }}
            coordinate={{
              ...marker.coordinate,
            }}
            key={index}>
            <Icon size={40} name={'map-marker'} color={'crimson'} />
          </Marker>
        ))}
      </MapView>
    </>
  );
}
