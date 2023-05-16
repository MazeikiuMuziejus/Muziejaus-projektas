import {useRef, useState} from 'react';

import MapView, {Marker} from 'react-native-maps-osmdroid';

import { Drawer } from '../components';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';

import { coords, houseImages, houseData } from '../types';

export interface IMarker {
  id: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

export interface IRouteData {
  data: houseData[];
  initialCoords: coords;
  gatve: string;
  images: houseImages
}

export interface IStreetViewProps {
  route: any;
  navigation: any;
}

export default function StreetView({route, navigation}: IStreetViewProps) {
  const {data, initialCoords, gatve, images}: IRouteData = route.params;  // Data passed from the previous screen
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);  // Whether the drawer is open
  const [drawerDataIndex, setDrawerDataIndex] = useState<number>(0);  // Index of the data in the drawer
  const mapView = useRef(null); // Reference to the map view

  const onMarkerOpen = (index: number) => { // Opens the drawer on marker press
      if (drawerOpen) setDrawerDataIndex(index);
      else {
        setDrawerOpen(true);
        setDrawerDataIndex(index);
      }
  }

  const markers: IMarker[] = data.map((house: houseData, index: number) => {  // Creates the markers
    return {
      id: `${index}`,
      coordinate: {
        latitude: house.coords.lat,
        longitude: house.coords.long,
      },
    };
  });

  return (
    <>
      <Header navigation={navigation} text={`${gatve} g.`} />
      <Drawer blurhash={images[data[drawerDataIndex].nr].blurhash} setOpen={setDrawerOpen} open={drawerOpen} data={data[drawerDataIndex]} images={images[data[drawerDataIndex].nr].src || []}/>
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
          latitude: initialCoords.lat + 0.001,
          longitude: initialCoords.long + 0.011,
          latitudeDelta: 0.022,
          longitudeDelta: 0.022,
        }}>
        {markers?.map((marker: IMarker, index: number) => ( // Renders the markers on the map
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
