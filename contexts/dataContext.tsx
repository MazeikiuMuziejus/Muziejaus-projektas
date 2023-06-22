import {createContext, useContext, useState, useEffect} from 'react';

import {getData} from '../API/getData';

import type {marker} from '../types';

interface DataContextProps {
  data: marker[];
  updateData: () => void;
  loading: boolean;
  error: boolean;
  removeStreet: (gatve: string) => void;
  streets: IStreets[];
}

export interface IStreets {
  gatve: string;
  button: {
    img: string;
    blurhash: string;
  };
  shown: boolean;
  color: string;
}

const DataContext = createContext<DataContextProps>({} as DataContextProps);

export function DataProvider({children}: any) {
  const [data, setData] = useState<marker[]>([]); // street data
  const [loading, setLoading] = useState<boolean>(true); // loading state
  const [error, setError] = useState<boolean>(false); // error state
  const [streets, setStreets] = useState<IStreets[]>([]); // streets data

  const removeStreet = (street: string) => {
    // removes street from map
    setStreets(
      streets.map(gatve => {
        // Updates street visibility
        if (gatve.gatve === street) {
          return {...gatve, shown: !gatve.shown};
        } else {
          return gatve;
        }
      }),
    );
    setData(
      data.map(marker => {
        // Updates marker visibility
        if (marker.gatve === street) {
          return {...marker, shown: !marker.shown};
        } else {
          return marker;
        }
      }),
    );
  };

  const updateData = () => {
    // function to get data
    setLoading(true);
    setStreets([]); // reset streets
    getData().then(data => {
      // get data from API
      if (data) {
        const formattedData: marker[] = data
          .map(gatve => {
            // format data
            setStreets(streets => [
              ...streets,
              {
                gatve: gatve.gatve,
                button: {
                  img: gatve.button.img,
                  blurhash: gatve.button.blurhash,
                },
                shown: true,
                color: gatve.markerColor,
              },
            ]);
            return gatve.data.map((house, index) => {
              return {
                id: `${gatve.gatve}${gatve.data[index].nr}`,
                gatve: gatve.gatve,
                tekstas: gatve.data[index].tekstas,
                nr: gatve.data[index].nr,
                zmones: gatve.data[index].zmones,
                src: gatve.data[index].src,
                blurhash: gatve.data[index].blurhash,
                markerColor: gatve.markerColor,
                shown: true,
                button: {
                  img: gatve.button.img,
                  blurhash: gatve.button.blurhash,
                },
                coords: {
                  latitude: house.coords.lat,
                  longitude: house.coords.long,
                },
              };
            });
          })
          .flat();

        setData(formattedData); // set data
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    // on mount get data
    updateData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        updateData,
        loading,
        error,
        removeStreet,
        streets,
      }}>
      {children}
    </DataContext.Provider>
  );
}

export const useDataContext = () => {
  return useContext(DataContext);
};
