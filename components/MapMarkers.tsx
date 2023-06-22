import React from 'react';

import {marker} from '../types';
import {Marker} from 'react-native-maps-osmdroid';
import {OutlinedMapMarker} from './';

// Displays the map markers

export interface IMapMarkersProps {
  markers: marker[];
  onMarkerOpen: (index: number) => void;
}

class MapMarkers extends React.Component<IMapMarkersProps> {
  shouldComponentUpdate(nextProps: IMapMarkersProps) {
    // Only rerenders if the markers change
    return this.props.markers !== nextProps.markers;
  }

  render() {
    return (
      <>
        {this.props.markers.map((m: marker, index: number) => {
          if (m.shown) {
            // Only renders the markers that are shown
            return (
              <Marker
                accessibilityRole="button"
                accessibilityLabel={`${m.gatve} g. ${m.nr}`}
                id={m.id}
                onPress={() => this.props.onMarkerOpen(index)}
                coordinate={m.coords}
                key={m.id}
                tracksViewChanges={false}>
                <OutlinedMapMarker color={m.markerColor} />
              </Marker>
            );
          }
        })}
      </>
    );
  }
}

export default MapMarkers;
