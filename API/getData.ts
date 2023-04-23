import type { streetData } from '../types/streetData';

export async function getData(): Promise<streetData | null>{
    let data: streetData | null = null ;

    await fetch('https://api.npoint.io/db3a05075970634abc06', {
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