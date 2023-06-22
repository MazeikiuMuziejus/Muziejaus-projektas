import type {coords} from './coords';
import type {person} from './person';

export type houseData = {
  nr: string;
  tekstas: string;
  coords: coords;
  src: string[];
  blurhash: string;
  zmones?: person[];
};
