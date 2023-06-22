import {person} from './person';

export type marker = {
  id: string;
  gatve: string;
  nr: string;
  markerColor: string;
  tekstas: string;
  zmones: person[] | undefined;
  src: string[];
  blurhash: string;
  shown: boolean;
  button: {
    img: string;
    blurhash: string;
  };
  coords: {
    latitude: number;
    longitude: number;
  };
};
