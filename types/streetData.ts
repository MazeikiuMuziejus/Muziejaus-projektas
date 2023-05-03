import type { coords } from "./coords"
import type { streetImages } from "./streetImages"
import type { houseData } from "./houseData"

export type streetData = {
    gatve: string,
    data: houseData[],
    initialCoords: coords,
    images: streetImages,
}