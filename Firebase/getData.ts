import { firebase } from '@react-native-firebase/database';

import type { streetData } from '../types/streetData';

export async function getData(): Promise<streetData | null>{
    /*const ref = firebase
                .app()
                .database('https://mazeikiu-muziejaus-aplikacija-default-rtdb.europe-west1.firebasedatabase.app/')
                .ref('/mazeikiai');
*/
    let data: streetData | null = null ;//await (await ref.once("value")).val();

    //ref.off();

    await fetch('https://api.npoint.io/dd8c4661d65b8844688d', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response) => response.json())
    .then((json) => {
        if (json) data = json.mazeikiai;
    })

    return data;
}