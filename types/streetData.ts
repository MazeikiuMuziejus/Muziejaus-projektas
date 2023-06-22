import type {streetImages} from './streetImages';
import type {houseData} from './houseData';
export type streetData = {
  gatve: string;
  data: houseData[];
  button: streetImages;
  markerColor: string;
};
