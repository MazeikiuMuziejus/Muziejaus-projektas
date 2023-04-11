import {useRef, useState} from 'react';

import MapView, {Marker} from 'react-native-maps-osmdroid';

import {Drawer} from '../components/Drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';

export default function GatvesVaizdas({route, navigation}: any) {
  const {data, initialCoords, gatve, images} = route.params;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerDataIndex, setDrawerDataIndex] = useState<number>(0);

  const mapView = useRef(null);

  const onMarkerOpen = (index: number) => {
      if (drawerOpen) setDrawerDataIndex(index);
      else {
        setDrawerOpen(true);
        setDrawerDataIndex(index);
      }
  }

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
      <Header navigation={navigation} text={`${gatve} g.`} />
      <Drawer setOpen={setDrawerOpen} open={drawerOpen} data={data[drawerDataIndex]} images={images[data[drawerDataIndex].nr]}/>
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
            style={{
              elevation: 5
            }}
            id={marker.id}
            onPress={() => onMarkerOpen(index)}
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
