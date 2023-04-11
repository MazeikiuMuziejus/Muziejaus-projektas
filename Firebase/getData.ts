import { firebase } from '@react-native-firebase/database';

import type { streetData } from '../types/streetData';

export async function getData(): Promise<streetData | null>{
    const ref = firebase
                .app()
                .database('https://mazeikiu-muziejaus-aplikacija-default-rtdb.europe-west1.firebasedatabase.app/')
                .ref('/mazeikiai');

    const data: streetData | null = await (await ref.once('value')).val()
    
    return data;
}