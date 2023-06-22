import {appData} from '../types';

export async function getData(): Promise<appData | null> {
  let data: appData | null = null; // Data from API

  await fetch('https://api.npoint.io/db3a05075970634abc06', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(json => {
      if (json) data = json.mazeikiai; // If data is not null, assign it to data variable
    });

  return data;
}
