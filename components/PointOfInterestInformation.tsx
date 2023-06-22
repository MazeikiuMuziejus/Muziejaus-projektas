import {Text, View} from 'react-native';

import type {person} from '../types';

// Displays the textual information about the point of interest

export interface IPointOfInterestInformationProps {
  data: {
    nr: string;
    tekstas: string;
    zmones?: person[];
    coords: {
      lat: number;
      long: number;
    };
  };
}

export default function PointOfInterestInformation({
  data,
}: IPointOfInterestInformationProps) {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'column',
        marginBottom: 10,
        paddingVertical: 10,
      }}>
      <Text
        style={{
          color: 'black',
          textAlign: 'left',
          fontSize: 20,
          paddingHorizontal: 10,
          marginVertical: 10,
          fontStyle: 'italic',
          fontWeight: 'bold',
        }}>
        Aprašymas:
      </Text>
      <Text
        style={{
          color: 'black',
          textAlign: 'justify',
          width: '100%',
          paddingHorizontal: 10,
          paddingBottom: 15,
          fontSize: 15,
        }}>
        {data.tekstas}
      </Text>
      {data.zmones && (
        <>
          <Text
            style={{
              color: 'black',
              textAlign: 'left',
              fontSize: 20,
              paddingHorizontal: 10,
              marginBottom: 10,
              fontStyle: 'italic',
              fontWeight: 'bold',
            }}>
            Žymūs žmonės:
          </Text>
          {data.zmones.map(
            (
              person: person,
              index: number, // Renders famous people
            ) => (
              <View
                key={index}
                style={{
                  width: '100%',
                  paddingBottom: 15,
                }}>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'justify',
                    width: '100%',
                    paddingHorizontal: 10,
                    paddingBottom: 8,
                    fontSize: 17,
                    fontWeight: '500',
                  }}>
                  {person.vardas}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'justify',
                    width: '100%',
                    paddingHorizontal: 10,
                    paddingBottom: 15,
                    fontSize: 15,
                  }}>
                  {person.tekstas}
                </Text>
              </View>
            ),
          )}
        </>
      )}
    </View>
  );
}
