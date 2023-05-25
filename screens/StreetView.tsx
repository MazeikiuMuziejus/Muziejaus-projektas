import { SafeAreaView } from 'react-native';

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

  if (drawerOpen && mapView.current) {
      mapView.current.animateCamera({  // Animates the camera to the marker
      center: {
        latitude: data[drawerDataIndex].coords.lat - 0.0005,
        longitude: data[drawerDataIndex].coords.long,
      },
      zoom: 18,
    }, {duration: 1000});
  } else if (!drawerOpen && mapView.current && markers.length > 2) {  // Fits the map to the markers
    mapView.current.fitToCoordinates(markers.map((marker: IMarker) => marker.coordinate), {
      edgePadding: {
        top: 200,
        right: 200,
        bottom: 200,
        left: 200,
      },
      animated: true,
    })
  } else if (!drawerOpen && mapView.current && markers.length <= 2) {
    mapView.current.animateCamera({  // Animates the camera to the marker
      center: {
        latitude: initialCoords.lat + 0.0005,
        longitude: initialCoords.long,
      },
      zoom: 16,
    }, {duration: 1000})
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Header navigation={navigation} text={`${gatve} g.`} />
      <Drawer blurhash={images[data[drawerDataIndex].nr].blurhash} setOpen={setDrawerOpen} open={drawerOpen} data={data[drawerDataIndex]} images={images[data[drawerDataIndex].nr].src || []}/>
      <MapView
        ref={mapView}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onLayout={() => {
          if (mapView.current && markers.length > 2) {
            mapView.current.fitToCoordinates(markers.map((marker: IMarker) => marker.coordinate), {
              edgePadding: {
                top: 200,
                right: 200,
                bottom: 200,
                left: 200,
              },
              animated: true,
            })
          } else if (mapView.current && markers.length <= 2) {
            mapView.current.animateCamera({  // Animates the camera to the marker
              center: {
                latitude: initialCoords.lat + 0.0005,
                longitude: initialCoords.long,
              },
              zoom: 16,
            }, {duration: 1000})
          }
        }}
        onPress={() => setDrawerOpen(false)}
        moveOnMarkerPress={false}
        loadingEnabled
        maxZoomLevel={20}
        style={{
          flex: 1
        }}
        initialRegion={{
          latitude: initialCoords.lat,
          longitude: initialCoords.long,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}>
        {markers.map((marker: IMarker, index: number) => ( // Renders the markers on the map
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
    </SafeAreaView>
  );
}
