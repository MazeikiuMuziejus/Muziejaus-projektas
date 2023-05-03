import type { coords } from "./coords"
import type { person } from "./person"

export type houseData = {
    nr: string,
    tekstas: string,
    coords: coords,
    zmones?: person[],
}