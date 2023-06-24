import {BackHandler, SafeAreaView} from 'react-native';

import {useCallback, useRef, useState} from 'react';

import MapView from 'react-native-maps-osmdroid';

import {
  Drawer,
  SideDrawer,
  Header,
  MapMarkers,
  CornerButton,
} from '../components';

import {useDataContext} from '../contexts/dataContext';

import {useFocusEffect} from '@react-navigation/native';

// Street view screen

export default function StreetView() {
  const {data: markers} = useDataContext(); // Gets the data from the context
  const [markerIndex, setMarkerIndex] = useState<number>(0); // The index of the marker that is currently open
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false); // Whether the drawer is open
  const [sideDrawerOpen, setSideDrawerOpen] = useState<boolean>(false); // Whether the side drawer is open
  const mapView = useRef(null); // Reference to the map view

  const fitToCoordinates = useCallback(() => {
    // Fits the map to the markers
    if (mapView.current) {
      mapView.current.fitToCoordinates(markers.map(marker => marker.coords)),
        {
          animated: true,
        };
    }
  }, [markers]);

  const onMarkerOpen = (index: number) => {
    // Opens the drawer on marker press
    if (drawerOpen) {
      setMarkerIndex(index); // If the drawer is already open, just change the marker index
    } else {
      setDrawerOpen(true); // Otherwise, open the drawer and change the marker index
      setMarkerIndex(index);
    }
    if (mapView.current) {
      mapView.current.animateCamera(
        {
          center: {
            latitude: markers[index].coords.latitude - 0.0005,
            longitude: markers[index].coords.longitude,
          },
          zoom: 18,
          heading: 0,
        },
        {duration: 1000},
      );
    }
  };

  const onDrawerClose = () => {
    fitToCoordinates();
    setDrawerOpen(false);
  };

  useFocusEffect(
    // Overwrites the back button to close the drawer
    useCallback(() => {
      const backHandler = () => {
        if (drawerOpen || sideDrawerOpen) {
          setDrawerOpen(false);
          setSideDrawerOpen(false);
          fitToCoordinates();
          return true;
        }
        return false;
      };

      const sub = BackHandler.addEventListener(
        'hardwareBackPress',
        backHandler,
      );
      return () => sub.remove();
    }, [drawerOpen, sideDrawerOpen, fitToCoordinates]),
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <Header
        text={'Žemėlapis'}
        right
        onMenuOpen={() => setSideDrawerOpen(prev => !prev)}
      />
      {markers[markerIndex] && (
        <Drawer
          blurhash={markers[markerIndex].blurhash}
          onClose={onDrawerClose}
          open={drawerOpen}
          data={{
            nr: `${markers[markerIndex].gatve} g. ${markers[markerIndex].nr}`,
            tekstas: markers[markerIndex].tekstas,
            coords: {
              lat: markers[markerIndex].coords.latitude,
              long: markers[markerIndex].coords.longitude,
            },
            zmones: markers[markerIndex].zmones,
          }}
          images={markers[markerIndex].src}
        />
      )}
      <SideDrawer open={sideDrawerOpen} setOpen={setSideDrawerOpen} />
      <CornerButton onPress={() => fitToCoordinates()} />
      <MapView
        ref={mapView}
        onLayout={() => fitToCoordinates()}
        onPress={() => {
          onDrawerClose();
          setSideDrawerOpen(false);
        }}
        moveOnMarkerPress={false}
        loadingEnabled
        minZoomLevel={10}
        style={{
          flex: 1,
        }}
        initialRegion={{
          latitude: 56.315716,
          longitude: 22.341388,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        <MapMarkers markers={markers} onMarkerOpen={onMarkerOpen} />
      </MapView>
    </SafeAreaView>
  );
}
